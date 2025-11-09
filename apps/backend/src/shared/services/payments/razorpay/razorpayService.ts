import { randomBytes } from 'crypto';
import { injectable } from 'inversify';
import crypto from 'node:crypto';
import Razorpay from 'razorpay';

import { getEnv } from '@config/env';

import {
    CreateOderInputDto,
    PaymentsProviderPort,
} from '@shared/services/payments/paymentsProviderPort';

@injectable()
export class RazorpayService implements PaymentsProviderPort {
    private instance: Razorpay;
    private apiKey: string;

    constructor() {
        this.apiKey = getEnv('RAZORPAY_API_KEY');

        this.instance = new Razorpay({
            key_id: this.apiKey,
            key_secret: getEnv('RAZORPAY_KEY_SECRET'),
        });
    }

    /**
     * Verifies a Razorpay webhook signature using the webhook secret.
     *
     * @param rawBody - The raw string body of the request (not parsed JSON).
     * @param razorpaySignature - The signature from `x-razorpay-signature` header.
     * @param webhookSecret - Your Razorpay webhook secret.
     * @returns `true` if the signature is valid, otherwise `false`.
     */
    verifyWebhookSignature = (
        rawBody: string,
        razorpaySignature: string,
        webhookSecret: string,
    ): boolean => {
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(rawBody)
            .digest('hex');

        return expectedSignature === razorpaySignature;
    };

    private async findPaymentsForAnOrder(orderId: string) {
        this.instance.orders.fetchPayments(orderId);
    }

    async createOrder(orderDetails: CreateOderInputDto) {
        const receiptPart = randomBytes(8).toString('hex');
        const receiptId = `natours-${Date.now()}-${receiptPart}`;

        const orderOptions = {
            ...orderDetails,
            receipt: receiptId,
        };

        const order = await this.instance.orders.create(orderOptions);

        return {
            key: this.apiKey,
            amount: order.amount,
            currency: order.currency,
            orderId: order.id,
            receipt: receiptId,
            status: order.status,
        };
    }
}
