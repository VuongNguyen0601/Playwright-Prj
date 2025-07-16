import { Page } from '@playwright/test';
import { Locator } from '@playwright/test';

export class ProductPage {
   readonly sortDropdown: Locator;
   readonly closePopUpButton: Locator;

   constructor(private page: Page) {
      this.sortDropdown = page.getByRole('combobox', { name: 'Shop Order'});
      this.closePopUpButton = page.getByRole('combobox', { name: 'Close' });
   }

   async chooseProduct(productName: string) {
      // this.page.getByText('Photex FT3150 Black (95463)')
      // this.page.getByRole('link', {name: `Photex FT3150 Black (95463)`, exact:true})
      await this.page.getByRole('link', { name: new RegExp(`^${productName}$`, 'i') }).first().click();
   }

   async chooseRandomPrd() {
      const count = await this.page.locator('.content-product').count();
      const randomIndex = Math.floor(Math.random() * count);
      await this.page.locator('.content-product .product-title').nth(randomIndex).first().click();
   }

   async sortItems(sort: string) {
      await this.sortDropdown.selectOption(sort);
   }

   async getAllPrice(): Promise<number[]> {
      const prices: number[] = [];
      const productCount = await this.page.locator('.content-product').count();

      for (let i = 1; i <= productCount; i++) {
         const priceLocator = this.page.locator(
            `(//div[@class ='content-product '])[${i}]//span[@class ='woocommerce-Price-amount amount' and not(ancestor::del)]`
         );

         const priceText = await priceLocator.innerText();
         const numericPrice = parseFloat(priceText.replace(/[0-9.]/g, ''));
         prices.push(numericPrice);
      }
      return prices;
   }

   async getItemOrder() {
      await this.page.waitForSelector('.loading', { state: 'detached' });
      return await this.getAllPrice();
   }

   async getItemPricesAfterRefresh(): Promise<number[]> {
      await this.page.waitForSelector('.loading', {state: 'detached' });
      return await this.getAllPrice();
   }

   async sortPrices(order: 'Ascend' | 'Descend'): Promise<number[]> {
      const originPrices = await this.getItemPricesAfterRefresh();

      if (order === 'Ascend') {
         return [...originPrices].sort((a, b) => a - b);
      }

      else if (order === 'Descend') {
         return [...originPrices].sort((a, b) => b - a);
      }
      else
      {
         console.warn('Invalid sort order provided!');
         return [];
      }
   }
}