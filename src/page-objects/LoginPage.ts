import { Page } from '@playwright/test';
import { Locator } from '@playwright/test';

export default class LoginPage {
   readonly UserName: Locator;
   readonly Password: Locator;
   readonly SubmitBtn: Locator;
   readonly AllDepartmentsDropdown: Locator;

   constructor(private page: Page) {
    this.UserName = page.getByRole('textbox', { name: 'Username or email address *' });
    this.Password = page.getByRole('textbox', { name: 'Password *'});
    this.SubmitBtn = page.getByRole('button', { name: 'Log in *'});
    this.AllDepartmentsDropdown = page.getByText('All departments');
   }

   async login() {
    await this.UserName.fill(process.env.USER_NAME!);
    await this.Password.fill(process.env.PASSWORD!);
    await this.SubmitBtn.click();
   }
}