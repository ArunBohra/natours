import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import streamifier from 'streamifier';

import { getEnv } from '@config/env';

import { MediaKind, MediaStoragePort, UploadedMedia } from '../mediaStoragePort';

export class CloudinaryMediaService implements MediaStoragePort {
    constructor() {
        cloudinary.config({
            cloud_name: getEnv('CLOUDINARY_CLOUD_NAME'),
            api_key: getEnv('CLOUDINARY_API_KEY'),
            api_secret: getEnv('CLOUDINARY_API_SECRET'),
        });
    }

    private buildOptions(type: MediaKind, folder?: string): UploadApiOptions {
        return {
            folder: folder ?? getEnv('CLOUDINARY_FOLDER', 'natours'),
            resource_type: type === 'video' ? 'video' : 'image',
            overwrite: false,
        } as UploadApiOptions;
    }

    async uploadBuffer(args: {
        buffer: Buffer;
        filename?: string;
        folder?: string;
        type: MediaKind;
    }): Promise<UploadedMedia> {
        const { buffer, folder, type } = args;
        return await new Promise<UploadedMedia>((resolve, reject) => {
            const options = this.buildOptions(type, folder);
            const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
                if (error || !result) return reject(error ?? new Error('Upload failed'));
                resolve({ url: result.secure_url, type, providerId: result.public_id });
            });
            streamifier.createReadStream(buffer).pipe(uploadStream);
        });
    }

    async uploadStream(args: {
        stream: Readable;
        filename?: string;
        folder?: string;
        type: MediaKind;
    }): Promise<UploadedMedia> {
        const { stream, folder, type } = args;
        return await new Promise<UploadedMedia>((resolve, reject) => {
            const options = this.buildOptions(type, folder);
            const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
                if (error || !result) return reject(error ?? new Error('Upload failed'));
                resolve({ url: result.secure_url, type, providerId: result.public_id });
            });
            stream.pipe(uploadStream);
        });
    }
}
