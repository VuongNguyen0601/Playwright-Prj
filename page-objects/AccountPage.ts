import { Locator, Page } from '@playwright/test';

export class AccountPage {
    readonly AllDepartmentsDropdown: Locator;
    private OptionName: Locator;
    private PageName: Locator;

    constructor(private page: Page) {
        this.AllDepartmentsDropdown = page.getByText('All Departments');
    }

    async NavigateToAllDepartmentsDropdown() {
        await this.AllDepartmentsDropdown.hover();
    }

    async SelectPage(OptionName: string) {
        this.OptionName = this.page.getByRole('link', {name:  ` ${OptionName}` });
        await this.OptionName.click();
    }

    async goToPage(PageName: string) {
        this.PageName = this.page.locator('#menu-main-menu-1').getByRole('link', { name: `${PageName}` });
        await this.PageName.click();
    }
}