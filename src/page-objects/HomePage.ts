import { Locator} from "@playwright/test";
import { Page } from "@playwright/test";
import dotenv from 'dotenv';

dotenv.config();

export default class HomePage {
    readonly LoginBtn: Locator;
    readonly accountBtn: Locator;

    constructor(private page: Page) {
        this.LoginBtn = page.getByRole('link' , { name: 'Log in / Sign up'});
        this.accountBtn = page.locator('.header-top .login-link');
    }

    async navigate() {
        await this.page.goto(process.env.URL!);
    }

    async goToLoginPage() {
        await this.LoginBtn.click();
    }

    async goToAccountPage() {
        await this.accountBtn.click();
    }
}
