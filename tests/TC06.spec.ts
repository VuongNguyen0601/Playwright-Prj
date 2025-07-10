import { expect, test } from "config/fixtures";
import { BILLING_INFO } from "data/BillingInfo";
import { PAGE_NAVIGATE } from "data/PageNavigate";
import { DetailPage } from "pageElements/DetailPage";
import { OrderConfirmationPage } from "pageElements/OrderConfirmationPage";

const billingDetails: BILLING_INFO = {
        firstName: 'Vuong',
        lastName: 'King',
        country: 'Vietnam',
        StrAdd: 'Tran Quoc Toan',
        city: 'HaNoi',
        phoneNum:'985623952',
        //zipCode: '222222222',
        //state: 'California',
        email: process.env.USERNAME!
};

test("TC06 - Verify users try to buy an item without logging in (As a guest)", async ({
    accountPage,
    productPage,
    checkoutPage,
    detailPage,
    orderConfirmationPage
}) => {
    // Step 1: Open https://demo.testarchitect.com/
    // Step 2: Navigate to 'Shop' or 'Products' section
    await accountPage.goToPage(PAGE_NAVIGATE.SHOP);

    // Step 3: Add a product to cart
    await productPage.chooseProduct('iPad Air 2');
    await detailPage.addToCart();

    // Step 4: Click on Cart button
    await detailPage.clickCart();

    // Step 5: Proceed to complete order
    await detailPage.clickCheckout();
    await checkoutPage.fillBillingDetails(billingDetails);
    await checkoutPage.placeOrder();
    await expect(await orderConfirmationPage.getSuccessMsg()).toBeVisible();
})