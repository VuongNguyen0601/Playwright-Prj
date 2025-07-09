import { Locator } from "@playwright/test";
import { Page } from "@playwright/test";
import { MESSAGES } from "../datatest/Messages";

export class OrderConfirmationPage {
    readonly billingAddress: Locator;

    constructor(private page: Page) {
         this.billingAddress = this.page.locator('.woocommerce-customer-details address');
    }

    async getItemName(ProductName: string) {
        return this.page.getByText(`${ProductName}`);
    }

    // async getItemQuantity(quantity: string) {
    //     return this.page.getByText(`× ${quantity}`);
    // }
    async getItemQuantity(productName: string) {
        return (await this.page.locator('.order_item .product-name')
        .filter({ hasText: productName })
        .locator('.product-quantity').innerText()).replace(/\s+/g, '');
    }

    async getOrderDetails(ProductName: string) {
        return this.page.getByRole('heading', { name: 'Order Details'}).getByRole('link', { name: ProductName});
    }

    async getSuccessMsg() {
        return this.page.getByText(MESSAGES.ORDERS_SUCCESS_MESSAGE);
    }

     async getItemPrice(productName: string) {
        return (await this.page.locator('.order_item')
        .filter({ hasText: productName })
        .locator('.woocommerce-Price-amount').innerText());
    }

    async getOrderNumber() {
        return await this.page.locator('.order strong').innerText();
    }
    
    async getBillingAddress() {
        return (await this.billingAddress.innerText()).replace(/\s+/g, '');
    }
}