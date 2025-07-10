import { test, expect } from "config/fixtures";
import { BILLING_INFO } from "data/BillingInfo";
import { PAGE_NAVIGATE } from "data/PageNavigate";

const billingDetails: BILLING_INFO = {
        firstName: 'Vuong',
        lastName: 'King',
        country: 'Vietnam',
        StrAdd: 'Tran Quoc Toan',
        city: 'HaNoi',
        phoneNum:'985623952',
        email: process.env.EMAIL_ADDRESS!
};

test("TC02 - Verify users can buy multiple item successfully", async ({
    page,
    accountPage,
    productPage,
    detailPage,
    cartPage,
    checkoutPage,
    orderConfirmationPage
}) => {
    // Step 1: Open browser and navigate to page
    // Step 2: Login with valid credentials
    // Step 3: Go to Shop page
    await accountPage.goToPage(PAGE_NAVIGATE.SHOP);

    // Step 4: Select multiple items and add to cart
    await productPage.chooseProduct('ExoLens With Optics By ZEISS');
    await detailPage.addToCart();
    const prd1 = await detailPage.getPrdInfoList();

    await page.goBack();
    await productPage.chooseProduct('Robotic Arm Edge');
    await detailPage.addToCart();
    const prd2 = await detailPage.getPrdInfoList();

    // Step 5: Go to the cart and verify all selected items
    await detailPage.goToCart();
    const allPrd = [prd1, prd2];

    // Step 6: Proceed to checkout and confirm order
    await cartPage.clickProceedToCheckout();
    await checkoutPage.fillBillingDetails(billingDetails);
    await checkoutPage.placeOrder();

    // Step 7: Verify order confirmation message
    await expect(await orderConfirmationPage.getSuccessMsg()).toBeVisible();
})