import { Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) {}

    async goToAllDepartments() {
        await this.page.click('text=All Departments');
    }

    async selectCategory(category: string) {
        await this.page.click('text=${category}');
    }

    async verifyGridView() {
        await this.page.waitForSelector('.product-grid');
    }

    async switchToListView() {
        await this.page.click('button[aria-label="List view"]');
    }

    async verifyListView() {
        await this.page.waitForSelector('.product-list');
    }

    async selectRandomItem() {
        const items = await this.page.$$('.product-lít-item');
        const randomIndex = Math.floor(Math.random() * items.length);
        await items[randomIndex].click();
    }
}