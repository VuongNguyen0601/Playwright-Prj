import { Locator, Page } from '@playwright/test';

export class AccountPage {
    readonly AllDepartmentsDropdown: Locator;
    //private OptionName: Locator;
    //private PageName: Locator;

    constructor(private page: Page) {
        this.AllDepartmentsDropdown = page.getByText('All Departments');
    }

    async NavigateToAllDepartmentsDropdown() {
        await this.AllDepartmentsDropdown.hover();
    }

    async SelectPage(OptionName: string) {
  
        await this.page.getByRole('link', {name:  ` ${OptionName}` }).click();
    }

    async goToPage(PageName: string) {
        
        await this.page.locator('#menu-main-menu-1').getByRole('link', { name: `${PageName}` }).click();
    }
}