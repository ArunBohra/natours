import { Readable } from 'stream';

export type MediaKind = 'image' | 'video';

export interface UploadedMedia {
    url: string;
    type: MediaKind;
    providerId?: string;
}

export interface MediaStoragePort {
    uploadBuffer: (args: {
        buffer: Buffer;
        filename?: string;
        folder?: string;
        type: MediaKind;
    }) => Promise<UploadedMedia>;
    uploadStream: (args: {
        stream: Readable;
        filename?: string;
        folder?: string;
        type: MediaKind;
    }) => Promise<UploadedMedia>;
}
