import { Locator, Page } from "@playwright/test";
import { MESSAGES } from "data-test/Messages";

export class OrderConfirmationPage {
    readonly billingAddress: Locator;

    constructor(private page: Page) {
         this.billingAddress = this.page.locator('.woocommerce-customer-details address');
    }

     getItemName(productName: string) {
         return this.page.locator('tr.order_item td.product-name')
        .filter({ hasText: productName })
        .locator('a');
    }

     getItemQuantity(productName: string) {
        return this.page.locator('tr.order_item td.product-name')
       .filter({ hasText: productName })
       .locator('.product-quantity');
    }

     getOrderDetails(ProductName: string) {
        return this.page.getByRole('heading', { name: 'Order Details'}).getByRole('link', { name: ProductName});
    }

     getSuccessMsg() {
        return this.page.getByText(MESSAGES.ORDERS_SUCCESS_MESSAGE);
    }

     getItemPrice(productName: string) {
         return this.page.locator('tr.order_item')
        .filter({ hasText: productName })
        .locator('span.woocommerce-Price-amount');
    }


     getOrderNumber() {
        return this.page.locator('.order strong').innerText();
    }
    
    // async getBillingAddress() {
    //     return (await this.billingAddress.innerText()).replace(/\s+/g, '');
    // }
}