import { Trans, useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';

import FormBuilder, { type FormConfig } from '../../../utils/form/formBuilder';

const LoginPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams();

  const formConfig: FormConfig = {
    fields: [
      {
        type: 'email',
        label: t('your_email'),
        placeholder: 'name@example.com',
        name: 'email',
        required: true,
      },
      {
        type: 'password',
        label: t('password'),
        placeholder: '••••••••',
        name: 'password',
        required: true,
      },
      {
        type: 'button',
        label: t('login'),
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
        <h2 className="heading text-2xl font-bold">{t('sign_in_tou_our_platform')}</h2>
        <FormBuilder config={formConfig} />
        <p className="text-center text-sm">
          <Trans t={t} i18nKey="not_registered_create_account" components={[<Link to={`/${lang!}/signup`} />]} />
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
