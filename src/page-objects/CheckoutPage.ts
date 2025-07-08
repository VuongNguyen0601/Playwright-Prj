import { Locator, Page, expect } from "@playwright/test";
import { BILLING_INFO } from "../datatest/BillingInfo";
import { COLORS } from "../datatest/Color";


export class CheckoutPage {
   readonly FirstName: Locator;
   readonly LastName: Locator;
   readonly Country: Locator;
   readonly StreetAddress: Locator;
   readonly City: Locator;
   readonly PhoneNum: Locator;
   readonly ZipCode: Locator;
   readonly Email: Locator;
   readonly PlaceOrderBtn: Locator;

   constructor(private page: Page) {
    this.FirstName = page.getByRole('textbox', { name: 'First name*' });
    this.LastName = page.getByRole('textbox', { name: 'Last name*' });
    this.Country = page.getByLabel('Country / Region');
    this.StreetAddress = page.getByRole('textbox', { name: 'Street address *' });
    this.City = page.getByRole('textbox', { name: 'Town / City *' });
    this.PhoneNum = page.getByRole('textbox', { name: 'Phone *' });
    this.ZipCode = page.getByRole('textbox', { name: 'ZIP Code *' });
    this.Email = page.getByRole('textbox', { name: 'Email address *' });
    this.PlaceOrderBtn = page.getByRole('button' , { name: 'Place order'});
   }

   async getItemOrdered(prdName: string, quantity: number) {
    return this.page.getByRole('cell', {name: `${prdName} × ${quantity}` });
   }

   async fillBillingDetails(info: BILLING_INFO): Promise<void> {
    await this.FirstName.fill(info.firstName);
    await this.LastName.fill(info.lastName);
    await this.Country.fill(info.country);
    await this.StreetAddress.fill(info.StrAdd);
    await this.City.fill(info.city);
    await this.ZipCode.fill(info.zipCode);
    await this.PhoneNum.fill(info.phoneNum);
    await this.Email.fill(info.email);
   }

   async placeOrder() {
    await this.PlaceOrderBtn.click();
   }

   async choosePaymentMethod(method: string) {
    await this.page.getByText(`${method}`).click();
   }

   async getErrMsg() {
    return this.page.getByRole('alert');
   }

   async verifyFieldHigh(fields: string[]) {
    for(let i = 0; i <= fields.length; i++) {
        await expect(this.page.getByRole('textbox', { name: `${fields[i]} *` })).toHaveCSS('--et_inputs-border-color', COLORS.RED);
    }
   }
}