import { Link } from 'react-router';

import FormBuilder, { type FormConfig } from '../../../utils/formBuilder';

const LoginPage = () => {
  const formConfig: FormConfig = {
    fields: [
      {
        type: 'email',
        label: 'Your email',
        placeholder: 'name@example.com',
        name: 'email',
        required: true,
      },
      {
        type: 'password',
        label: 'Password',
        placeholder: '••••••••',
        name: 'password',
        required: true,
      },
      {
        type: 'button',
        label: 'Login',
        name: 'submit',
      },
    ],
    onSubmit: (data: Record<string, string | boolean | File>) => {
      console.log('Form submitted:', data);
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="heading text-2xl font-bold">Sign in to our platform</h2>
        <FormBuilder config={formConfig} />
        <p className="text-center text-sm">
          Not registered?{' '}
          <Link to="/signup" className="text-green-600 hover:underline dark:text-green-400">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
