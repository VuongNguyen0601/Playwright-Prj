import { Page } from '@playwright/test';

export class AccountPage {
    constructor(private page: Page) {}

    async goToMyAccount() {
        await this.page.click('text=My Account');
    }

    async openOrdersSection() {
        await this.page.click('text=Orders');
    }

    async verifyOrdersExist(expectedOrderCount: number) {
        const orders = await this.page.$$('.order-row');
        if (orders.length < expectedOrderCount) {
            throw new Error('Expected at least ${expectedOrderCount} orders, but found $${order.length}');
        }
    }

    async verifyOrderDetailsVisible() {
        const firstOrder = await this.page.$('.order-row');
        if (!firstOrder) throw new Error('No order details are visible!');
    }
}