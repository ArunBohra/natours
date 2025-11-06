import { Model, Schema, model, Types } from 'mongoose';

import { IBaseDocument } from '../../../interfaces/baseDocument';

const mediaAssetSchema = new Schema(
    {
        url: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['image', 'video'],
            required: true,
        },
    },
    { _id: false },
);

const locationSchema = new Schema(
    {
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: (value: number[]) => value.length === 2 && value[0] >= -180 && value[0] <= 180 && value[1] >= -90 && value[1] <= 90,
                message: 'Coordinates must be [longitude, latitude] with valid ranges',
            },
        },
        address: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
    },
    { _id: false },
);

const tourSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: locationSchema,
        required: true,
    },
    mapLink: {
        type: String,
        required: false,
    },
    startLocation: {
        type: locationSchema,
        required: true,
    },
    endLocation: {
        type: locationSchema,
        required: false,
    },
    minGroupSize: {
        type: Number,
        required: true,
        min: [1, 'Minimum group size must be at least 1'],
    },
    maxGroupSize: {
        type: Number,
        required: true,
        min: [1, 'Maximum group size must be at least 1'],
        validate: {
            validator: function (this: ITourDocument, value: number) {
                return value >= this.minGroupSize;
            },
            message: 'Maximum group size must be greater than or equal to minimum group size',
        },
    },
    media: {
        type: [mediaAssetSchema],
        default: [],
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number'],
    },
    duration: {
        type: Number,
        required: true,
        min: [1, 'Duration must be at least 1'],
    },
    durationUnit: {
        type: String,
        enum: ['hours', 'days'],
        default: 'days',
    },
    notes: {
        type: String,
        required: false,
    },
    guide: {
        type: Types.ObjectId,
        ref: 'Guide',
        required: false,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

// Generate slug from name before saving
tourSchema.pre<ITourDocument>('save', function (next) {
    if (this.isModified('name') || this.isNew) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

export interface IMediaAsset {
    url: string;
    type: 'image' | 'video';
}

export interface ILocation {
    coordinates: [number, number]; // [longitude, latitude]
    address?: string;
    description?: string;
}

export interface ITour {
    name: string;
    slug?: string;
    description: string;
    location: ILocation;
    mapLink?: string;
    startLocation: ILocation;
    endLocation?: ILocation;
    minGroupSize: number;
    maxGroupSize: number;
    media: IMediaAsset[];
    price: number;
    duration: number;
    durationUnit?: 'hours' | 'days';
    notes?: string;
    guide?: Types.ObjectId;
    active?: boolean;
}

export interface ITourDocument extends ITour, IBaseDocument {}

interface ITourModel extends Model<ITourDocument> {}

export const tourModel = model<ITourDocument, ITourModel>('Tour', tourSchema);

