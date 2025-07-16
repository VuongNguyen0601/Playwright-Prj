import { Locator, Page } from '@playwright/test';

export class AccountPage {
    readonly allDepartmentsDropdown: Locator;

    constructor(private page: Page) {
        this.allDepartmentsDropdown = page.getByText('All Departments');
    }

    async navigateToAllDepartmentsDropdown() {
        await this.allDepartmentsDropdown.hover();
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