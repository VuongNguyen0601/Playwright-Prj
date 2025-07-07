import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class ShopPage {
    readonly ClosePopUpBtn: Locator;
    
    constructor(private page: Page) {
        this.ClosePopUpBtn = page.getByRole('button', {name: 'Close'});
    }

    async GetAllProducts() {
        await this.page.waitForSelector('.content-product');
        return this.page.locator('.content-product');
    }

    async GetRandomProductInfo(items: Locator): Promise<{ category: string; title: string; price: string }> {
        const total = await items.count();
        const randomIndex = Math.floor(Math.random()*total);
        const selectedItem = items.nth(randomIndex);

        const category = await selectedItem.locator('.products-page-cats a').first().innerText();
        const title = await selectedItem.locator('.product-title a').first().innerText();
        const hasSalePrice = await selectedItem.locator('.price span bdi').count() > 1;
        // Determine the price: If there are many prices (sale), then get the price dropped
        const PriceLocator = hasSalePrice
    }
}