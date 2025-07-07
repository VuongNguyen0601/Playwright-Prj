import { Page, expect } from '@playwright/test';
import { parse } from 'path';

export class ReviewPage {
    constructor(private page: Page) {}

    async openReviewsTab() {
        await this.page.locator('a[href="#reviews"]').click();
    }

    async submitReview(stars: number, comment: string) {
        await this.page.locator(`.stars span a:nth-child(${stars})`).click();
        await this.page.fill('#comment', comment);
        await this.page.click('input[name="submit"]');
    }

    async verifyReviewcontent(expectedText: string) {
        const reviewText = this.page.locator('.comment-content p');
        await expect(reviewText).toContainText(expectedText);
    }

    async verifyReviewCountIncreased(oldCount: number) {
        const newCountText = await this.page.locator('.reviews-title').textContent();
        const newCount = parseInt(newCountText?.match(/\d+/)?.[0] || '0');
        expect(newCount).toBeGreaterThan(oldCount);
    }

    async getCurrentReviewCount(): Promise<number> {
        const reviewTitle = await this.page.locator('.reviews-title').textContent();
        return parseInt(reviewTitle?.match(/\d+/)?.[0] || '0');
    }
}