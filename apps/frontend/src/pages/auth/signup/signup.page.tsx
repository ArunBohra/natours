import { Link } from 'react-router';

import FormBuilder from '../../../utils/formBuilder';
import type { FormConfig } from '../../../utils/formBuilder';

const SignupPage = () => {
  const formConfig: FormConfig = {
    fields: [
      {
        type: 'text',
        name: 'name',
        label: 'Your Name',
        placeholder: 'John Doe',
        required: true,
      },
      {
        type: 'email',
        name: 'email',
        label: 'Your Email',
        placeholder: 'name@example.com',
        required: true,
      },
      {
        type: 'password',
        name: 'password',
        label: 'Password',
        placeholder: '••••••••',
        required: true,
      },
      {
        type: 'password',
        name: 'repeatPassword',
        label: 'Repeat Password',
        placeholder: '••••••••',
        required: true,
      },
      {
        type: 'checkbox',
        name: 'newsletter',
        label: 'Sign up for newsletter',
      },
      {
        type: 'button',
        name: 'submit',
        label: 'Sign Up',
      },
    ],
    onSubmit: (data: Record<string, string | boolean | File>) => {
      console.log('Form submitted:', data);
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">Create an account</h2>
        <FormBuilder config={formConfig} />
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline dark:text-green-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
