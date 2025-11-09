export interface RazorpayPaymentWebhookPayload {
    event: string;
    payload: {
        order: {
            entity: {
                id: string;
            };
        };
    };
}
