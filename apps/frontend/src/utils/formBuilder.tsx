import React from 'react';

export interface FieldConfig {
  type: 'text' | 'email' | 'password' | 'checkbox' | 'button';
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface FormConfig {
  fields: FieldConfig[];
  onSubmit: (data: Record<string, string | boolean | File>) => void;
}

const FormBuilder: React.FC<{ config: FormConfig }> = ({ config }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Record<string, string | boolean | File> = {};
    console.log(formData.values());
    for (const [key, value] of formData) {
      data[key] = value instanceof File ? value : value;
    }
    config.onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {config.fields.map((field, index) => {
        switch (field.type) {
          case 'text':
          case 'email':
          case 'password':
            return (
              <div key={index}>
                {field.label && (
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field.label}
                  </label>
                )}
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  id={field.name}
                  name={field.name}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring focus:ring-green-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            );
          case 'checkbox':
            return (
              <div key={index} className="flex items-center">
                <input
                  id={field.name}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                {field.label && (
                  <label htmlFor={field.name} className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    {field.label}
                  </label>
                )}
              </div>
            );
          case 'button':
            return (
              <button
                key={index}
                type="submit"
                className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:ring focus:ring-green-500 focus:outline-none"
              >
                {field.label}
              </button>
            );
          default:
            return null;
        }
      })}
    </form>
  );
};

export default FormBuilder;
