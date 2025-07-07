import { Page } from "@playwright/test";

export class GuestCheckoutPage {
    constructor(private page: Page) {} 

    async fillGuestBillingDetails() {
        await this.page.fill('#billing_first-name', 'Guest');
        await this.page.fill('#billing_last_name', 'User');
        await this.page.fill('#billing_address_1', '36 Tran Quoc Toan');
        await this.page.fill('#billing_city', 'DaNang');
        await this.page.fill('#billing_postcode', '100000');
        await this.page.fill('#billing_phone', '0123456789');
        await this.page.fill('#billing_email', 'vuong.nguyen@agest.vn');
    }

    async placeOrder() {
        await this.page.click('text=PLACE ORDER');
    }

    async verifyOrderConfirmation() {
        await this.page.waitForSelector('.order-confirmation');
    }
} 