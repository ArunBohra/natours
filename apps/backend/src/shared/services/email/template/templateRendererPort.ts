export interface TemplateRendererPort {
    renderTemplate(templateName: string, data?: Record<string, unknown>): Promise<string>;
}
