import { expect, Page } from "@playwright/test";

export class CheckoutPage {
    constructor(private page: Page) {}
    
    async fillBillingAndConfirmOrder() {
        await this.page.waitForSelector('#payment-method');
        await this.page.click('text=PLACE ORDER');
    }
    async verifyCheckoutPage() {
        await this.page.waitForSelector('.checkout-form');
    }

    async choosePaymentMethod(method: 'bank' | 'cod') {
        if (method === 'bank') {
            await this.page.click('text=Direct Bank Transfer');
        } else if (method === 'cod') {
            await this.page.click('text=Cash on Delivery');
        }
    }

    async leaveFieldsBlankAndPlaceOrder() {
        await this.page.click('text=PLACE ORDER');
    }

    async verifyValidationErrors() {
        const errorMessage = this.page.locator('.woocommerce-error');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('required'); 
    }

    async fillBillingDetails() {
        await this.page.waitForSelector('#payment-method');
    }

    async placeOrder() {
        await this.page.click('text=PLACE ORDER');
    }
}