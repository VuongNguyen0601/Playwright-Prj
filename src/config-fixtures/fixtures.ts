import { test as base, expect } from '@playwright/test';
import HomePage from "pageElements/HomePage";
import LoginPage  from "pageElements/LoginPage";
import { ProductPage } from 'pageElements/ProductPage';
import { DetailPage } from 'pageElements/DetailPage';
import { AccountPage } from 'pageElements/AccountPage';
import { CheckoutPage } from 'pageElements/CheckoutPage';
import { OrderConfirmationPage } from 'pageElements/OrderConfirmationPage';
import { CartPage } from 'pageElements/CartPage';
import { OrderHistory } from 'pageElements/HistoryPage';
//import OrderHistory from '@pages/OrderHistoryPage';

export const test = base.extend<{ homePage: HomePage,
                        loginPage: LoginPage,
                        accountPage: AccountPage,
                        productPage: ProductPage, 
                        detailPage: DetailPage,
                        checkoutPage: CheckoutPage,
                        orderConfirmationPage: OrderConfirmationPage,
                        historyPage: OrderHistory,
                        cartPage: CartPage }>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    loginPage: async ({ page }, use) => { 
        await use(new LoginPage(page));
    },

    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },

    detailPage: async ({ page }, use) => {
        await use(new DetailPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    orderConfirmationPage: async ({ page }, use) => {
        await use(new OrderConfirmationPage(page));
    },

    historyPage: async ({ page }, use) => {
        await use(new OrderHistory(page));
    },

    cartPage: async({ page }, use) => {
        await use(new CartPage(page));
    }
});

export { expect };