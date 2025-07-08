import { Locator } from "@playwright/test";
import { Page } from "@playwright/test";
import { MESSAGES } from "../datatest/Messages";

export class OrderConfirmationPage {
    constructor(private page: Page) {}

    async getItemName(ProductName: string) {
        return this.page.getByText('${ProductName}');
    }

    async getItemQuantity(quantity: string) {
        return this.page.getByText(`× ${quantity}`);
    }

    async getOrderDetails(ProductName: string) {
        return this.page.getByRole('heading', { name: 'Order Details'}).getByRole('link', { name: '${prdName}'});
    }

    async getSuccessMsg() {
        return this.page.getByText(MESSAGES.ORDERS_SUCCESS_MESSAGE);
    }
}