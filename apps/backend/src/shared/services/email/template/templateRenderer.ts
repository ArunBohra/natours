import { render } from '@react-email/render';
import * as React from 'react';

import { UserVerificationEmail } from '@shared/services/email/template/emailTemplates/userVerificationEmail';
import { UserWelcomeEmail } from '@shared/services/email/template/emailTemplates/userWelcomeEmail';
import { TemplateRendererPort } from '@shared/services/email/template/templateRendererPort';
import { InternalServerError } from '@shared/utils/errors/internalServerError';

const templates = {
    userVerificationEmail: UserVerificationEmail,
    userWelcomeEmail: UserWelcomeEmail,
};

type TemplateProps = {
    userVerificationEmail: { verificationUrl: string };
    userWelcomeEmail: { userName: string };
};

type TemplateName = keyof typeof templates;

export class TemplateRenderer implements TemplateRendererPort {
    async renderTemplate<T extends TemplateName>(templateName: T, props?: TemplateProps[T]): Promise<string> {
        const Template = templates[templateName] as React.FC<TemplateProps[T]>;
        if (!Template) {
            throw new InternalServerError({
                meta: { message: `Template ${templateName} not found` },
            });
        }

        const emailContent = render(React.createElement(Template, props));
        return emailContent;
    }
}
