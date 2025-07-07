import { Page } from '@playwright/test';

export class ProductPage {
   constructor(private page: Page) {}

   async addToCart() {
    await this.page.click('text=Add to Cart');
   }

   async goToCart() {
    await this.page.click('#cart-icon');
   }
}