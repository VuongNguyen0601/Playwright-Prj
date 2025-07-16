import { Page } from "@playwright/test";

export class OrderHistory {
    constructor(private page: Page) {}

     getOrderNumberInTable() {
        return this.page.locator('.account-orders-table tr .woocommerce-orders-table__cell-order-number a').nth(0).innerText();
    }

     getOrderDateInTable() {
        return this.page.locator('.account-orders-table tr .woocommerce-orders-table__cell-order-date time').nth(0).innerText();
    }

     getOrderStatusInTable() {
        return this.page.locator('.account-orders-table tr .woocommerce-orders-table__cell-order-status').nth(0).innerText();
    }

     getOrderPriceAndQuantityInTable() {
        return this.page.locator('.account-orders-table tr .woocommerce-orders-table__cell-order-total').nth(0).innerText();
    }
}