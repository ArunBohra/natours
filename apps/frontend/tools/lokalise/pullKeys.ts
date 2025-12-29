import { readFile, readdir, rm, writeFile } from 'fs/promises';
import { LokaliseDownload } from 'lokalise-file-exchange';
import path from 'path';
import { loadEnv } from 'vite';

const outputDirPath = path.join(process.cwd(), './tools/lokalise/locales');
const targetDirPath = path.join(process.cwd(), './assets/lang');

const mode = process.env.NODE_ENV ?? 'development';
const env = loadEnv(mode, process.cwd());
const downloader = new LokaliseDownload(
  {
    apiKey: env.VITE_LOKALISE_API_TOKEN,
  },
  {
    projectId: env.VITE_LOKALISE_PROJECT_ID,
  },
);

try {
  console.log('Starting download from lokalise...');
  await downloader.downloadTranslations({
    downloadFileParams: {
      format: 'json',
      bundle_structure: '%LANG_ISO%.json',
    },
    extractParams: { outputDir: outputDirPath },
  });
} catch (error) {
  console.log('Error downloading translation files');
  console.log(error);
}

const lokaliseLanguages = (await readdir(outputDirPath, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

for (const lang of lokaliseLanguages) {
  try {
    const filePath = path.join(outputDirPath, lang, 'translation.json');
    const content = await readFile(filePath, 'utf-8');

    const data = JSON.stringify(JSON.parse(content), null, 2);
    const targetPath = path.join(targetDirPath, `${lang}.json`);
    await writeFile(targetPath, data, 'utf-8');

    console.log(`Saved ${targetPath}`);
  } catch (err) {
    console.error(`Error processing ${lang}:`, err);
  }
}

// Cleanup lokalise download
try {
  console.log('Cleaning up the files...');
  await rm(outputDirPath, { recursive: true, force: true });
} catch (error) {
  console.log('Error deleting lang files...');
  console.log(error);
}
