import { test, expect } from "config/fixtures";
import { BILLING_INFO } from "data-test/BillingInfo";
import { PAGE_NAVIGATE } from "data-test/PageNavigate";

const billingDetails: BILLING_INFO = {
        firstName: 'Vuong',
        lastName: 'King',
        country: 'Vietnam',
        streetAddress: 'Tran Quoc Toan',
        city: 'HaNoi',
        phoneNumber:'985623952',
        email: process.env.EMAIL_ADDRESS!
};

test("TC02 - Verify users can buy multiple item successfully", async ({
    page,
    homePage,
    loginPage,
    accountPage,
    productPage,
    detailPage,
    cartPage,
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

    // Step 4: Select multiple items and add to cart
    await productPage.chooseProduct('HP LaserJet M127fw With Wi-Fi');
    await detailPage.addToCart();
    const prd1 = await detailPage.getPrdInfoList();

    await page.goBack();
    await productPage.chooseProduct('Robotic Arm Edge');
    await detailPage.addToCart();
    const prd2 = await detailPage.getPrdInfoList();

    // Step 5: Go to the cart and verify all selected items
    await detailPage.goToCart();
    const allPrd = [prd1, prd2];
    await cartPage.verifyItemOrdered(allPrd);

    // Step 6: Proceed to checkout and confirm order
    await cartPage.clickToCheckout();
    await checkoutPage.fillBillingDetails(billingDetails);
    await checkoutPage.placeOrder();

    // Step 7: Verify order confirmation message
    await expect(orderConfirmationPage.getSuccessMsg()).toBeVisible();
})