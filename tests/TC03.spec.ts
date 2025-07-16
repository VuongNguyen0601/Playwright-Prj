import { test, expect } from "config/fixtures";
import { PAGE_NAVIGATE } from "data/PageNavigate";
import { BILLING_INFO } from "data/BillingInfo";

const billingDetails: BILLING_INFO = {
        firstName: 'Vuong',
        lastName: 'King',
        country: 'Vietnam',
        streetAddress: 'Tran Quoc Toan',
        city: 'HaNoi',
        phoneNumber:'985623952',
        email: process.env.EMAIL_ADDRESS!
}

test("TC03 - Verify users can buy item using different payment methods (all payment methods)", async ({
    accountPage,
    homePage,
    loginPage,
    detailPage,
    productPage,
    checkoutPage,
    orderConfirmationPage
}) => {
    // Step 1: Open browser and navigate to page
    await homePage.navigate();
    // Step 2: Login with valid credentials
    await homePage.goToLoginPage();
    await loginPage.login();
    // Step 3: Go to Shop page
    await accountPage.goToPage(PAGE_NAVIGATE.SHOP);

    // Step 4: Select an item and add to cart
    await productPage.chooseRandomPrd();
    await detailPage.addToCart();

    // Step 5: Go to checkout page
    await detailPage.clickCart();
    await detailPage.clickCheckout();

    // Step 6: Choose....
    await checkoutPage.choosePaymentMethod('Direct bank transfer');

    // Step 7: Complete the payment process
    await checkoutPage.fillBillingDetails(billingDetails);
    await checkoutPage.placeOrder();

    // Step 8: Verify order confirmation message
    await expect(await orderConfirmationPage.getSuccessMsg()).toBeVisible();
})