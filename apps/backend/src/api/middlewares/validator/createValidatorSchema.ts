export type ValidationRule = (
    value: unknown,
    data?: Record<string, unknown>,
) => {
    status: boolean;
    type: 'required' | 'custom';
    message?: string;
};

export type FieldSchema = {
    required?: boolean;
    rules?: ValidationRule[];
};

export type SchemaDefinition = Record<string, FieldSchema>;

export type ValidationIssue = {
    field: string;
    type: ReturnType<ValidationRule>['type'];
    message: string;
};

export type ValidationResult = {
    success: boolean;
    data?: Record<string, unknown>;
    error?: { issues: ValidationIssue[] };
};

export const createSchema = (definition: SchemaDefinition) => ({
    safeParse: (data: Record<string, unknown> = {}): ValidationResult => {
        const issues: ValidationIssue[] = [];
        const validatedData: Record<string, unknown> = {};

        for (const [field, config] of Object.entries(definition)) {
            const value = data[field];

            // Required check
            if (config.required && (value === undefined || value === null || value === '')) {
                issues.push({ field, type: 'required', message: `${field} is required` });
                continue;
            }

            if (value === undefined || value === null || value === '') continue;

            // Apply rules
            for (const rule of config.rules || []) {
                const result = rule(value, data);
                if (result.status === true) continue;

                let message = `Incorrect value for ${field}`;
                if (result.message) message = result.message;

                issues.push({ field, type: result.type, message });
                break;
            }

            validatedData[field] = value;
        }

        if (issues.length > 0) {
            return { success: false, error: { issues } };
        }

        return { success: true, data: validatedData };
    },
});
