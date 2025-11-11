import { Orders } from 'razorpay/dist/types/orders';

import { RazorpayPaymentWebhookPayload } from '@shared/services/payments/razorpay/razorpayTypes';
import { Currency } from '@shared/types/types';

export interface CreateOderInputDto {
    amount: number;
    currency: Currency;
    notes: {
        user: string;
        tour: string;
    };
}

export interface CreateOrderOutputDTO {
    key: string;
    amount: string | number;
    currency: string;
    orderId: string;
    receipt: string;
    status: Orders.RazorpayOrder['status'];
}

export interface PaymentWebhookPayload extends RazorpayPaymentWebhookPayload {}

export interface PaymentsProviderPort {
    createOrder: (orderDetails: CreateOderInputDto) => Promise<CreateOrderOutputDTO>;
    verifyWebhookSignature: (rawBody: string, razorpaySignature: string, webhookSecret: string) => boolean;
}
