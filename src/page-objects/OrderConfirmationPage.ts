import { Locator } from "@playwright/test";
import { Page } from "@playwright/test";
import { MESSAGES } from "../datatest/Messages";

export class OrderConfirmationPage {
    readonly billingAddress: Locator;

    constructor(private page: Page) {
         this.billingAddress = this.page.locator('.woocommerce-customer-details address');
    }

    async getItemName(productName: string): Promise<Locator> {
        return this.page.locator('tr.order_item td.product-name')
        .filter({ hasText: productName })
        .locator('a');
    }

    async getItemQuantity(productName: string): Promise<Locator> {
       return this.page.locator('tr.order_item td.product-name')
       .filter({ hasText: productName })
       .locator('.product-quantity');
    }

    async getOrderDetails(ProductName: string) {
        return this.page.getByRole('heading', { name: 'Order Details'}).getByRole('link', { name: ProductName});
    }

    async getSuccessMsg() {
        return this.page.getByText(MESSAGES.ORDERS_SUCCESS_MESSAGE);
    }

    async getItemPrice(productName: string): Promise<Locator> {
        return this.page.locator('tr.order_item')
        .filter({ hasText: productName })
        .locator('span.woocommerce-Price-amount');
    }


    async getOrderNumber() {
        return await this.page.locator('.order strong').innerText();
    }
    
    // async getBillingAddress() {
    //     return (await this.billingAddress.innerText()).replace(/\s+/g, '');
    // }
}