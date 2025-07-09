import { Page } from "@playwright/test";

export class OrderHistory {
    constructor(private page: Page) {}

    async getOrderNumberInTable() {
        return await this.page.locator('.account-orders-table tr .woocommerce-orders-table__cell-order-number a').nth(0).innerText();
    }

    async getOrderDateInTable() {
        return await this.page.locator('.account-orders-table tr .woocommerce-orders-table__cell-order-date time').nth(0).innerText();
    }

    async getOrderStatusInTable() {
        return await this.page.locator('.account-orders-table tr .woocommerce-orders-table__cell-order-status').nth(0).innerText();
    }

    async getOrderPriceAndQuantityInTable() {
        return await this.page.locator('.account-orders-table tr .woocommerce-orders-table__cell-order-total').nth(0).innerText();
    }
}