import { Page } from "@playwright/test";

// export class ShopPage {
//     static goToShop() {
//       throw new Error('Method not implemented.');
//     }
//     constructor(private page: Page) {} 

//     async goToShop() {
//         await this.page.click('text= Shop');
//     }

//     async addMultipleItems(count: number) {
//         const items = await this.page.$$('.product-item');
//         for (let i = 0; i < count && i < items.length; i++) {
//             await items[i].click();
//             await this.page.click('text=Add to Cart');
//             await this.page.goBack();
//         }
//     }
// }
export class ShopPage {
    constructor(private page: Page) {}

    async goToShop() {
        await this.page.click('text=Shop');
    }

    async addMultipleItems(count: number) {
        const addToCartButtons = await this.page.$$('text=Add to cart');

        if (addToCartButtons.length < count) {
            throw new Error('Not enough items to add. Found: ${addToCartButtons.length}');
        }

        for (let i = 0; i < count; i++) {
            await addToCartButtons[i].click();
            await this.page.waitForTimeout(1000);
        }
    }

    async switchToListView() {
        await this.page.click('text=List');
    }

    async sortByPrice(order: 'asc' | 'desc') {
        if (order === 'asc') {
            await this.page.selectOption('select#sort-by', 'price-asc');
        } else {
            await this.page.selectOption('select#sort-by', 'price-desc');
        }
    }

    async getItemPrices(): Promise<number[]> {
        const priceTexts = await this.page.$$eval('.product-price', elements =>
            elements.map(el => parseFloat(el.textContent!.replace(/[^0-9.]/g, '')))
        );
        return priceTexts;
    }

    async addItemToCart() {
        await this.page.click('text=Add to cart');
    }

    async verifySortedByPrice(order: 'asc' | 'desc') {
        const prices = await this.getItemPrices();
        const sorted = [...prices].sort((a, b) => order === 'asc' ? a - b : b - a);

        if (JSON.stringify(prices) !== JSON.stringify(sorted)) {
            throw new Error(`Prices are not sorted correctly. Found: ${prices.join(', ')}`);
        }
    }
}