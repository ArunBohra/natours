import multer from 'multer';

import { AppError } from '@shared/utils/errors/appError';

const memoryStorage = multer.memoryStorage();

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
    const isImage = file.mimetype.startsWith('image/');
    const isVideo = file.mimetype.startsWith('video/');
    if (isImage || isVideo) cb(null, true);
    else
        cb(
            new AppError({
                message: 'Only image and video files are allowed',
                statusCode: 400,
                type: 'user-error',
            }),
        );
};

export const upload = multer({
    storage: memoryStorage,
    limits: {
        fileSize: 25 * 1024 * 1024, // 25MB per file
        files: 20,
        fields: 50,
    },
    fileFilter,
});
