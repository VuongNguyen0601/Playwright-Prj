import { Locator, Page } from "@playwright/test";
import { REVIEWS } from "data/Review";


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

        await this.page.waitForSelector("[data-type='success']");
    }

    async clickCart() {
        await this.CartBtn.hover();
    }

    async clickCheckout() {
        await this.CheckoutBtn.click();
        //await this.page.waitForSelector('.blockOverlay');
        //await this.page.waitForSelector('.blockOverlay', { state: 'detached' });
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

    async priceInNumber() {
        const price = await this.getPrice();
        const numberOnly = price.replace(/[^0-9.]/g, '');
        return parseFloat(numberOnly);
    }

    async clickReview() {
        await this.reviewBtn.click();
    }

    async rating(numberStars: string) {
        await this.page.locator(`.stars .star-${numberStars}`).click();
    }

    async writeReview(review: string) {
        await this.reviewTbx.fill(review);
    }

    async submitReview() {
        await this.submitReviewBtn.click();
    }

    async getReview() {
        return this.page.locator('.comment-text .description p').filter({ hasText: REVIEWS.PRD_REVIEW });
    }

    async getPrdInfoList() {
        return[await this.getPrdName(), await this.getPrice(), await this.getQuantity()];
    }
}