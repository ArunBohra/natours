import validator from 'validator';

import { SchemaDefinition, createSchema } from '@api/middlewares/validator/createValidatorSchema';

const locationSchemaDefinition: SchemaDefinition = {
    coordinates: {
        required: true,
        rules: [
            (value) => ({
                status: Array.isArray(value) && value.length === 2,
                type: 'custom',
                message: 'Coordinates must be an array with [longitude, latitude]',
            }),
            (value) => {
                const [lng, lat] = value as number[];
                return {
                    status: lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90,
                    type: 'custom',
                    message: 'Coordinates must be valid: longitude [-180, 180], latitude [-90, 90]',
                };
            },
        ],
    },
    address: {
        required: false,
        rules: [],
    },
    description: {
        required: false,
        rules: [],
    },
};

const mediaAssetSchemaDefinition: SchemaDefinition = {
    url: {
        required: true,
        rules: [
            (value) => ({
                status: validator.isURL(value as string),
                type: 'custom',
                message: 'Media URL must be a valid URL',
            }),
        ],
    },
    type: {
        required: true,
        rules: [
            (value) => ({
                status: value === 'image' || value === 'video',
                type: 'custom',
                message: 'Media type must be either "image" or "video"',
            }),
        ],
    },
};

const createTourSchemaDefinition: SchemaDefinition = {
    name: {
        required: true,
        rules: [
            (value) => ({
                status: validator.isLength(value as string, { min: 2, max: 200 }),
                type: 'custom',
                message: 'Name must be between 2 and 200 characters',
            }),
        ],
    },
    description: {
        required: true,
        rules: [
            (value) => ({
                status: validator.isLength(value as string, { min: 10 }),
                type: 'custom',
                message: 'Description must be at least 10 characters long',
            }),
        ],
    },
    location: {
        required: true,
        rules: [
            (value) => ({
                status: typeof value === 'object' && value !== null && !Array.isArray(value),
                type: 'custom',
                message: 'Location must be an object',
            }),
            (value) => {
                const location = value as Record<string, unknown>;
                if (!location.coordinates) {
                    return {
                        status: false,
                        type: 'custom',
                        message: 'Location coordinates are required',
                    };
                }
                const coords = location.coordinates as unknown;
                if (!Array.isArray(coords) || coords.length !== 2) {
                    return {
                        status: false,
                        type: 'custom',
                        message: 'Location coordinates must be an array with [longitude, latitude]',
                    };
                }
                const [lng, lat] = coords as number[];
                const isValid = lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
                return {
                    status: isValid,
                    type: 'custom',
                    message:
                        'Location coordinates must be valid: longitude [-180, 180], latitude [-90, 90]',
                };
            },
        ],
    },
    mapLink: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                return {
                    status: validator.isURL(value as string),
                    type: 'custom',
                    message: 'Map link must be a valid URL',
                };
            },
        ],
    },
    startLocation: {
        required: true,
        rules: [
            (value) => ({
                status: typeof value === 'object' && value !== null && !Array.isArray(value),
                type: 'custom',
                message: 'Start location must be an object',
            }),
            (value) => {
                const startLocation = value as Record<string, unknown>;
                if (!startLocation.coordinates) {
                    return {
                        status: false,
                        type: 'custom',
                        message: 'Start location coordinates are required',
                    };
                }
                const coords = startLocation.coordinates as unknown;
                if (!Array.isArray(coords) || coords.length !== 2) {
                    return {
                        status: false,
                        type: 'custom',
                        message:
                            'Start location coordinates must be an array with [longitude, latitude]',
                    };
                }
                const [lng, lat] = coords as number[];
                const isValid = lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
                return {
                    status: isValid,
                    type: 'custom',
                    message:
                        'Start location coordinates must be valid: longitude [-180, 180], latitude [-90, 90]',
                };
            },
        ],
    },
    endLocation: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                const isValid =
                    typeof value === 'object' && value !== null && !Array.isArray(value);
                if (!isValid) {
                    return {
                        status: false,
                        type: 'custom',
                        message: 'End location must be an object',
                    };
                }
                const endLocation = value as Record<string, unknown>;
                if (!endLocation.coordinates) {
                    return { status: true, type: 'custom' };
                }
                const coords = endLocation.coordinates as unknown;
                if (!Array.isArray(coords) || coords.length !== 2) {
                    return {
                        status: false,
                        type: 'custom',
                        message:
                            'End location coordinates must be an array with [longitude, latitude]',
                    };
                }
                const [lng, lat] = coords as number[];
                const isValidCoords = lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
                return {
                    status: isValidCoords,
                    type: 'custom',
                    message:
                        'End location coordinates must be valid: longitude [-180, 180], latitude [-90, 90]',
                };
            },
        ],
    },
    coverImage: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                return {
                    status: validator.isURL(value as string),
                    type: 'custom',
                    message: 'Cover image must be a valid URL',
                };
            },
        ],
    },
    minGroupSize: {
        required: true,
        rules: [
            (value) => ({
                status: Number(value) >= 1,
                type: 'custom',
                message: 'Minimum group size must be at least 1',
            }),
        ],
    },
    maxGroupSize: {
        required: true,
        rules: [
            (value) => ({
                status: Number(value) >= 1,
                type: 'custom',
                message: 'Maximum group size must be at least 1',
            }),
            (value, data) => {
                const minGroupSize = Number(data?.minGroupSize);
                return {
                    status: Number(value) >= minGroupSize,
                    type: 'custom',
                    message:
                        'Maximum group size must be greater than or equal to minimum group size',
                };
            },
        ],
    },
    media: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                if (!Array.isArray(value)) {
                    return {
                        status: false,
                        type: 'custom',
                        message: 'Media must be an array',
                    };
                }
                const mediaArray = value as unknown[];
                for (let i = 0; i < mediaArray.length; i++) {
                    const item = mediaArray[i];
                    if (!item || typeof item !== 'object' || Array.isArray(item)) {
                        return {
                            status: false,
                            type: 'custom',
                            message: `Media item at index ${i} must be an object`,
                        };
                    }
                    const mediaItem = item as Record<string, unknown>;
                    if (!mediaItem.url || typeof mediaItem.url !== 'string') {
                        return {
                            status: false,
                            type: 'custom',
                            message: `Media item at index ${i} must have a valid URL`,
                        };
                    }
                    if (!validator.isURL(mediaItem.url)) {
                        return {
                            status: false,
                            type: 'custom',
                            message: `Media item at index ${i} must have a valid URL`,
                        };
                    }
                    if (
                        !mediaItem.type ||
                        (mediaItem.type !== 'image' && mediaItem.type !== 'video')
                    ) {
                        return {
                            status: false,
                            type: 'custom',
                            message: `Media item at index ${i} must have type "image" or "video"`,
                        };
                    }
                }
                return { status: true, type: 'custom' };
            },
        ],
    },
    price: {
        required: true,
        rules: [
            (value) => ({
                status: Number(value) >= 0,
                type: 'custom',
                message: 'Price must be a positive number',
            }),
        ],
    },
    duration: {
        required: true,
        rules: [
            (value) => ({
                status: Number(value) >= 1,
                type: 'custom',
                message: 'Duration must be at least 1',
            }),
        ],
    },
    durationUnit: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                return {
                    status: value === 'hours' || value === 'days',
                    type: 'custom',
                    message: 'Duration unit must be either "hours" or "days"',
                };
            },
        ],
    },
    notes: {
        required: false,
        rules: [],
    },
    guide: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                return {
                    status: typeof value === 'string' || typeof value === 'object',
                    type: 'custom',
                    message: 'Guide must be a valid ID or object',
                };
            },
        ],
    },
};

export const createTourSchema = createSchema(createTourSchemaDefinition);

// Update schema - all fields optional except at least one must be provided
const updateTourSchemaDefinition: SchemaDefinition = {
    name: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                return {
                    status: validator.isLength(value as string, { min: 2, max: 200 }),
                    type: 'custom',
                    message: 'Name must be between 2 and 200 characters',
                };
            },
        ],
    },
    description: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                return {
                    status: validator.isLength(value as string, { min: 10 }),
                    type: 'custom',
                    message: 'Description must be at least 10 characters long',
                };
            },
        ],
    },
    location: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                const isValid =
                    typeof value === 'object' && value !== null && !Array.isArray(value);
                if (!isValid) {
                    return {
                        status: false,
                        type: 'custom',
                        message: 'Location must be an object',
                    };
                }
                const location = value as Record<string, unknown>;
                if (location.coordinates) {
                    const coords = location.coordinates as unknown;
                    if (!Array.isArray(coords) || coords.length !== 2) {
                        return {
                            status: false,
                            type: 'custom',
                            message:
                                'Location coordinates must be an array with [longitude, latitude]',
                        };
                    }
                    const [lng, lat] = coords as number[];
                    const isValidCoords = lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
                    if (!isValidCoords) {
                        return {
                            status: false,
                            type: 'custom',
                            message:
                                'Location coordinates must be valid: longitude [-180, 180], latitude [-90, 90]',
                        };
                    }
                }
                return { status: true, type: 'custom' };
            },
        ],
    },
    mapLink: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                return {
                    status: validator.isURL(value as string),
                    type: 'custom',
                    message: 'Map link must be a valid URL',
                };
            },
        ],
    },
    startLocation: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                const isValid =
                    typeof value === 'object' && value !== null && !Array.isArray(value);
                if (!isValid) {
                    return {
                        status: false,
                        type: 'custom',
                        message: 'Start location must be an object',
                    };
                }
                const startLocation = value as Record<string, unknown>;
                if (startLocation.coordinates) {
                    const coords = startLocation.coordinates as unknown;
                    if (!Array.isArray(coords) || coords.length !== 2) {
                        return {
                            status: false,
                            type: 'custom',
                            message:
                                'Start location coordinates must be an array with [longitude, latitude]',
                        };
                    }
                    const [lng, lat] = coords as number[];
                    const isValidCoords = lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
                    if (!isValidCoords) {
                        return {
                            status: false,
                            type: 'custom',
                            message:
                                'Start location coordinates must be valid: longitude [-180, 180], latitude [-90, 90]',
                        };
                    }
                }
                return { status: true, type: 'custom' };
            },
        ],
    },
    endLocation: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                const isValid =
                    typeof value === 'object' && value !== null && !Array.isArray(value);
                if (!isValid) {
                    return {
                        status: false,
                        type: 'custom',
                        message: 'End location must be an object',
                    };
                }
                const endLocation = value as Record<string, unknown>;
                if (endLocation.coordinates) {
                    const coords = endLocation.coordinates as unknown;
                    if (!Array.isArray(coords) || coords.length !== 2) {
                        return {
                            status: false,
                            type: 'custom',
                            message:
                                'End location coordinates must be an array with [longitude, latitude]',
                        };
                    }
                    const [lng, lat] = coords as number[];
                    const isValidCoords = lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
                    if (!isValidCoords) {
                        return {
                            status: false,
                            type: 'custom',
                            message:
                                'End location coordinates must be valid: longitude [-180, 180], latitude [-90, 90]',
                        };
                    }
                }
                return { status: true, type: 'custom' };
            },
        ],
    },
    coverImage: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                return {
                    status: validator.isURL(value as string),
                    type: 'custom',
                    message: 'Cover image must be a valid URL',
                };
            },
        ],
    },
    minGroupSize: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                return {
                    status: Number(value) >= 1,
                    type: 'custom',
                    message: 'Minimum group size must be at least 1',
                };
            },
        ],
    },
    maxGroupSize: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                return {
                    status: Number(value) >= 1,
                    type: 'custom',
                    message: 'Maximum group size must be at least 1',
                };
            },
            (value, data) => {
                if (!value) return { status: true, type: 'custom' };
                const minGroupSize = Number(data?.minGroupSize);
                if (minGroupSize !== undefined) {
                    return {
                        status: typeof value === 'number' && value >= minGroupSize,
                        type: 'custom',
                        message:
                            'Maximum group size must be greater than or equal to minimum group size',
                    };
                }
                return { status: true, type: 'custom' };
            },
        ],
    },
    media: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                if (!Array.isArray(value)) {
                    return {
                        status: false,
                        type: 'custom',
                        message: 'Media must be an array',
                    };
                }
                const mediaArray = value as unknown[];
                for (let i = 0; i < mediaArray.length; i++) {
                    const item = mediaArray[i];
                    if (!item || typeof item !== 'object' || Array.isArray(item)) {
                        return {
                            status: false,
                            type: 'custom',
                            message: `Media item at index ${i} must be an object`,
                        };
                    }
                    const mediaItem = item as Record<string, unknown>;
                    if (!mediaItem.url || typeof mediaItem.url !== 'string') {
                        return {
                            status: false,
                            type: 'custom',
                            message: `Media item at index ${i} must have a valid URL`,
                        };
                    }
                    if (!validator.isURL(mediaItem.url)) {
                        return {
                            status: false,
                            type: 'custom',
                            message: `Media item at index ${i} must have a valid URL`,
                        };
                    }
                    if (
                        !mediaItem.type ||
                        (mediaItem.type !== 'image' && mediaItem.type !== 'video')
                    ) {
                        return {
                            status: false,
                            type: 'custom',
                            message: `Media item at index ${i} must have type "image" or "video"`,
                        };
                    }
                }
                return { status: true, type: 'custom' };
            },
        ],
    },
    price: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                return {
                    status: Number(value) >= 0,
                    type: 'custom',
                    message: 'Price must be a positive number',
                };
            },
        ],
    },
    duration: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                return {
                    status: Number(value) >= 1,
                    type: 'custom',
                    message: 'Duration must be at least 1',
                };
            },
        ],
    },
    durationUnit: {
        required: false,
        rules: [
            (value) => {
                if (!value) return { status: true, type: 'custom' };
                return {
                    status: value === 'hours' || value === 'days',
                    type: 'custom',
                    message: 'Duration unit must be either "hours" or "days"',
                };
            },
        ],
    },
    notes: {
        required: false,
        rules: [],
    },
    guide: {
        required: false,
        rules: [],
    },
    active: {
        required: false,
        rules: [
            (value) => {
                if (!value && value !== false) return { status: true, type: 'custom' };
                return {
                    status: typeof value === 'boolean',
                    type: 'custom',
                    message: 'Active must be a boolean',
                };
            },
        ],
    },
};

export const updateTourSchema = createSchema(updateTourSchemaDefinition);
