import { expect, test } from "config/fixtures";
import { PAGE_NAVIGATE } from "data/PageNavigate";

test("TC07 - Ensure proper error handling when mandatory fields are blank", async ({
    homePage,
    accountPage,
    productPage,
    detailPage,
    checkoutPage
}) => {
    // User is at checkout
      await accountPage.goToPage(PAGE_NAVIGATE.SHOP);
      await productPage.chooseProduct('iPad Air 2');
      await detailPage.addToCart();
      await detailPage.clickCart();
      await detailPage.clickCheckout();

      // Step 1: Leave mandatory fields(address, payment info) blank
      // Step 2: Click 'Confirm Order'
      await checkoutPage.placeOrder();

      // Step 3: Verify error messages (System should highlight missing fields and show an error message)
      const errorMsg = await checkoutPage.getErrMsg();
      await expect(errorMsg).toBeVisible();
      const fields = ['First name', 'Last name', 'Country / Region', 'Street address', 'Town / City', 'ZIP Code', 'Phone', 'Email address'];
      await checkoutPage.verifyFieldHigh(fields);
})