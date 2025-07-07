import { expect, Page } from "@playwright/test";

export class OrderConfirmationPage {
    constructor(private page: Page) {}

    async verifyOrderConfirmationMessage() {
        const message = this.page.locator('text=Order received');
        await expect(message).toBeVisible();
    }

    async verifyOrderConfirmation() {
        await this.page.waitForSelector('text=Order Confirmation');
        await this.page.waitForSelector('.order-details');
        await this.page.waitForSelector('.order-summary');
    }
}