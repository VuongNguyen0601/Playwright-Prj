import { Page } from '@playwright/test';
import { Locator } from '@playwright/test';

export class ProductPage {
   readonly SortDropdown: Locator;
   readonly ClosePopUpBtn: Locator;

   constructor(private page: Page) {
      this.SortDropdown = page.getByRole('combobox', { name: 'Shop Order'});
      this.ClosePopUpBtn = page.getByRole('combobox', { name: 'Close' });
   }

   async chooseProduct(ProductName: string) {
      await this.page.getByRole('link', {name: ProductName, exact: true}).click();
   }

   async chooseRandomPrd(): Promise<void> {
      const productCount = await this.page.locator('.content-product').count();
      const randomIndex = Math.floor(Math.random() * productCount);
      await this.page.locator('.content-product .product-title').nth(randomIndex).click();
   }

   async sortItems(sort: string) {
      await this.SortDropdown.selectOption(sort);
   }

   async getAllPrice(): Promise<number[]> {
      const prices: number[] = [];
      const ProductCount = await this.page.locator('.content-product').count();

      for (let i = 1; i <= ProductCount; i++) {
         const PriceLocator = this.page.locator(
            `(//div[@class ='content-product '])[${i}]//span[@class ='woocommerce-Price-amount amount' and not(ancestor::del)]`
         );

         const PriceText = await PriceLocator.innerText();
         const numericPrice = parseFloat(PriceText.replace(/[0-9.]/g, ''));
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
      const OriginPrices = await this.getItemPricesAfterRefresh();

      if (order === 'Ascend') {
         return [...OriginPrices].sort((a, b) => a - b);
      }

      else if (order === 'Descend') {
         return [...OriginPrices].sort((a, b) => b - a);
      }
      else
      {
         console.warn('Invalid sort order provided!');
         return [];
      }
   }
}