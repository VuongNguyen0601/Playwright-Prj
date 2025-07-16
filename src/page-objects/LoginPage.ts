import { Page, Locator } from '@playwright/test';

export default class LoginPage {
   readonly userName: Locator;
   readonly password: Locator;
   readonly submitBtn: Locator;
   readonly allDepartmentsDropdown: Locator;

   constructor(private page: Page) {
    this.userName = page.getByRole('textbox', { name: 'Username or email address *' });
    this.password = page.getByRole('textbox', { name: 'Password *'});
    this.submitBtn = page.getByRole('button', { name: 'Log in'});
    this.allDepartmentsDropdown = page.getByText('All departments');
   }

   async login() {
    await this.userName.fill(process.env.EMAIL_ADDRESS!);
    await this.password.fill(process.env.PASSWORD!);
    await this.submitBtn.click();
   }
}