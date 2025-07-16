import { Locator, Page, expect } from "@playwright/test";
import { BILLING_INFO } from "../datatest/BillingInfo";
import { COLORS } from "../datatest/Color";


export class CheckoutPage {
   readonly firstName: Locator;
   readonly lastName: Locator;
   readonly country: Locator;
   readonly streetAddress: Locator;
   readonly city: Locator;
   readonly phoneNumber: Locator;
   readonly email: Locator;
   readonly placeOrderButton: Locator;

   constructor(private page: Page) {
    this.firstName = page.getByRole('textbox', { name: 'First name *' });
    this.lastName = page.getByRole('textbox', { name: 'Last name *' });
    this.country = page.getByLabel('Country / Region *');
    this.streetAddress = page.getByRole('textbox', { name: 'Street address *' });
    this.city = page.getByRole('textbox', { name: 'Town / City *' });
    this.phoneNumber = page.getByRole('textbox', { name: 'Phone *' });
    this.email = page.getByRole('textbox', { name: 'Email address *' });
    this.placeOrderButton = page.getByRole('button' , { name: 'Place order'});
   }

   async getItemOrdered() {
        return this.page.locator('table.shop_table td.product-name');
   }

   async getItemOrderedPrice(prdName: string) {
    return this.page.locator('table.shop_table tr')
    .filter({ has: this.page.getByRole('cell', { name: prdName })})
    .locator('span.woocommerce-Price-amount');
   }

   async fillBillingDetails(info: BILLING_INFO): Promise<void> {
    await this.firstName.fill(info.firstName);
    await this.lastName.fill(info.lastName);
    await this.country.selectOption(info.country);
    await this.streetAddress.fill(info.streetAddress);
    await this.city.fill(info.city);
    await this.phoneNumber.fill(info.phoneNumber);
    await this.email.fill(info.email);
   }

   async placeOrder() {
    await this.placeOrderButton.click();
    await this.page.waitForSelector('form .blockOverlay');
    await this.page.waitForSelector('form .blockOverlay', { state: 'detached' });
   }

   async choosePaymentMethod(method: string) {
    await this.page.getByText(`${method}`).click();
   }

   async getErrMsg() {
    return this.page.getByRole('alert');
   }

   async verifyFieldHigh(fields: string[]) {
    for(const field of fields) {
            await expect(this.page.getByRole('textbox', { name: `${field} *` })).toHaveCSS('--et_inputs-border-color', COLORS.RED);
        }
   }
}