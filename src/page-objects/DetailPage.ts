import { Locator, Page } from "@playwright/test";

export class DetailPage {
    readonly AddToCartBtn: Locator;
    readonly CartBtn: Locator;
    readonly CheckoutBtn: Locator;

    constructor(private page: Page) {
        this.AddToCartBtn = page.getByRole('button', { name: 'Add to cart' });
        this.CartBtn = page.getByRole('link').filter({ hasText: '$' });
        this.CheckoutBtn = page.getByRole('link', { name: 'checkout' });
    }

    async addToCart() {
        await this.AddToCartBtn.click();
    }

    async clickCart() {
        await this.AddToCartBtn.hover();
    }

    async clickCheckout() {
        await this.CheckoutBtn.click();
    }

    async goToCart() {
        await this.CartBtn.click();
        await this.page.reload();
    }

    async getQuantity() {
        const prdName = await this.getPrdName();
        return parseFloat(await this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).getAttribute('value') ?? '0');
    }

    async getPrice() {
        const price = await this.page.locator('.fixed-content .price .woocommerce-Price-amount').last().innerText();
        const numberOnly = price.replace(/[^0-9.]/g, '');
        return parseFloat(numberOnly);
    }

    async getPrdName() {
        return this.page.locator('.product_title').innerText();
    }
}