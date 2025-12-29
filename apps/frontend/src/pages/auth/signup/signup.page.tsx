import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import FormBuilder from '../../../utils/formBuilder';
import type { FormConfig } from '../../../utils/formBuilder';

const SignupPage = () => {
  const { t } = useTranslation();

  const formConfig: FormConfig = {
    fields: [
      {
        type: 'text',
        name: 'name',
        label: t('your_name'),
        placeholder: 'John Doe',
        required: true,
      },
      {
        type: 'email',
        name: 'email',
        label: t('your_email'),
        placeholder: 'name@example.com',
        required: true,
      },
      {
        type: 'password',
        name: 'password',
        label: t('password'),
        placeholder: '••••••••',
        required: true,
      },
      {
        type: 'password',
        name: 'repeatPassword',
        label: t('repeat_password'),
        placeholder: '••••••••',
        required: true,
      },
      {
        type: 'checkbox',
        name: 'newsletter',
        label: t('signup_for_newsletter'),
      },
      {
        type: 'button',
        name: 'submit',
        label: t('signup'),
      },
    ],
    onSubmit: (data: Record<string, string | boolean | File>) => {
      console.log('Form submitted:', data);
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="heading text-center text-2xl font-bold">{t('create_an_account')}</h2>
        <FormBuilder config={formConfig} />
        <p className="text-center text-sm">
          <Trans t={t} i18nKey="already_have_an_account" components={[<Link to="/login" />]} />
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
