import { MediaStoragePort } from '@shared/services/media/mediaStoragePort';
import { catchAsync } from '@shared/utils/catchAsync/catchAsync';
import { AppError } from '@shared/utils/errors/appError';

import { container } from '@api/di/container';
import { TYPES } from '@api/di/types';

export const processTourMedia = catchAsync(async (req, res, next) => {
    try {
        const mediaService = container.get<MediaStoragePort>(TYPES.MediaStorage);
        const files = req.files as
            | Record<string, { buffer: Buffer; originalname: string; mimetype: string }[]>
            | undefined;

        if (!files || (!files.coverImage && !files.media)) return next();

        if (files?.coverImage?.[0]) {
            const file = files.coverImage[0];
            const type = file.mimetype.startsWith('video/') ? 'video' : 'image';
            const uploaded = await mediaService.uploadBuffer({
                buffer: file.buffer,
                filename: file.originalname,
                type,
            });
            (req.body as Record<string, unknown>).coverImage = uploaded.url;
        }

        if (files?.media?.length) {
            const uploadedMedia = await Promise.all(
                files.media.map(async (file) => {
                    const type = file.mimetype.startsWith('video/') ? 'video' : 'image';
                    const uploaded = await mediaService.uploadBuffer({
                        buffer: file.buffer,
                        filename: file.originalname,
                        type,
                    });
                    return { url: uploaded.url, type: uploaded.type };
                }),
            );
            (req.body as Record<string, unknown>).media = uploadedMedia;
        }

        next();
    } catch (error) {
        next(error instanceof AppError ? error : new AppError({ message: 'Failed to upload media', statusCode: 500 }));
    }
});
