import { Locator, Page } from "@playwright/test";
import { REVIEWS } from "data/Review";


export class DetailPage {
    readonly addToCartButton: Locator;
    readonly cartButton: Locator;
    readonly checkoutButton: Locator;
    readonly reviewButton: Locator;
    readonly reviewTbx: Locator;
    readonly submitReviewButton: Locator;

    constructor(private page: Page) {
        this.addToCartBtn = page.getByRole('button', { name: 'Add to cart' });
        this.cartBtn = page.getByRole('link').filter({ hasText: '$' });
        this.checkoutBtn = page.getByRole('link', { name: 'checkout' });
        this.reviewBtn = page.locator('#tab_reviews');
        this.reviewTbx = page.getByRole('textbox', { name: 'Your review *'});
        this.submitReviewBtn = page.getByRole('button', { name: 'Submit' })
    }

    async addToCart() {
        await this.addToCartBtn.click();

        await this.page.waitForSelector("[data-type='success']");
    }

    async clickCart() {
        await this.cartBtn.hover();
    }

    async clickCheckout() {
        await this.checkoutBtn.click();
        //await this.page.waitForSelector('.blockOverlay');
        //await this.page.waitForSelector('.blockOverlay', { state: 'detached' });
    }

    async goToCart() {
        await this.cartBtn.click();
        await this.page.reload();
    }

    async getQuantity() {
        const prdName = await this.getPrdName();
         return await this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).getAttribute('value') ?? "";
    }

    async getPrice() {
        //const prdName = await this.getPrdName();
        return await this.page.locator('.fixed-content .price .woocommerce-Price-amount').last().innerText();
        //return await this.page.getByRole('spinbutton', { name: `${prdName} price` }).getAttribute('value') ?? "";
    }

     async priceInNumber() {
        const price = await this.getPrice();
        const numberOnly = price.replace(/[^0-9.]/g, '');
        return parseFloat(numberOnly);
    }

    async getPrdName() {
        return this.page.locator('.product_title').innerText();
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
        // return this.page.locator('.comment-text .description p').filter({ hasText: REVIEWS.PRD_REVIEW });
        return this.page.locator('.comment-text .description p').getByText(REVIEWS.PRD_REVIEW, { exact: true });
    }

    async getPrdInfoList() {
        return[await this.getPrdName(), await this.getPrice(), await this.getQuantity()];
    }
}