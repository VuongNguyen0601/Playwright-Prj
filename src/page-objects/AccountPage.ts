import { Locator, Page } from '@playwright/test';

export class AccountPage {
    readonly AllDepartmentsDropdown: Locator;

    constructor(private page: Page) {
        this.AllDepartmentsDropdown = page.getByText('All Departments');
    }

    async navigateToAllDepartmentsDropdown() {
        await this.AllDepartmentsDropdown.hover();
    }

    async selectPage(optionName: string) {
  
        await this.page.getByRole('link', {name:  ` ${optionName}` }).click();
    }

    async goToPage(pageName: string) {
        
        await this.page.locator('#menu-main-menu-1').getByRole('link', { name: `${pageName}` }).click();
    }

    async changePage(optionName: string) {
        
        await this.page.getByRole('link', {name:  `${optionName}` }).click();
    }
}