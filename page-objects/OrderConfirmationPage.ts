import { Locator } from "@playwright/test";
import { Page } from "@playwright/test";
import { MESSAGES } from "../datatest/Messages";

export class OrderConfirmationPage {
    constructor(private page: Page) {}

    async GetItemName(ProductName: string) {
        return this.page.getByText('${ProductName}');
    }

    async GetItemQuantity(quantity: string) {
        return this.page.getByText(`× ${quantity}`);
    }

    async GetOrderDetails(ProductName: string) {
        return this.page.getByRole('heading', { name: 'Order Details'}).getByRole('link', { name: '${prdName}'});
    }

    async GetSuccessMsg() {
        return this.page.getByText(MESSAGES.ORDERS_SUCCESS_MESSAGE);
    }
}