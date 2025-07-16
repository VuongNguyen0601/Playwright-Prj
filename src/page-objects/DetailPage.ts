import { Locator, Page } from "@playwright/test";
import { REVIEWS } from "data/Review";


export class DetailPage {
    readonly addToCartButton: Locator;
    readonly cartButton: Locator;
    readonly checkoutButton: Locator;
    readonly reviewButton: Locator;
    readonly reviewTextbox: Locator;
    readonly submitReviewButton: Locator;

    constructor(private page: Page) {
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.cartButton = page.getByRole('link').filter({ hasText: '$' });
        this.checkoutButton = page.getByRole('link', { name: 'checkout' });
        this.reviewButton = page.locator('#tab_reviews');
        this.reviewTextbox = page.getByRole('textbox', { name: 'Your review *'});
        this.submitReviewButton = page.getByRole('button', { name: 'Submit' })
    }

    async addToCart() {
        await this.addToCartButton.click();

        await this.page.waitForSelector("[data-type='success']");
    }

    async clickCart() {
        await this.cartButton.hover();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
        //await this.page.waitForSelector('.blockOverlay');
        //await this.page.waitForSelector('.blockOverlay', { state: 'detached' });
    }

    async goToCart() {
        await this.cartButton.click();
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
        await this.reviewButton.click();
    }

    async rating(numberStars: string) {
        await this.page.locator(`.stars .star-${numberStars}`).click();
    }

    async writeReview(review: string) {
        await this.reviewTextbox.fill(review);
    }

    async submitReview() {
        await this.submitReviewButton.click();
    }

    async getReview() {
        // return this.page.locator('.comment-text .description p').filter({ hasText: REVIEWS.PRD_REVIEW });
        return this.page.locator('.comment-text .description p').getByText(REVIEWS.PRD_REVIEW, { exact: true });
    }

    async getPrdInfoList() {
        return[await this.getPrdName(), await this.getPrice(), await this.getQuantity()];
    }
}