import { expect, test } from "config/fixtures";
import { PAGE_NAVIGATE } from "data/PageNavigate";

test("TC08 - Verify users can clear the cart", async ({ page, homePage, loginPage, 
    accountPage, productPage, detailPage, cartPage }) => {
        // User added the items into cart
        await accountPage.goToPage(PAGE_NAVIGATE.SHOP);
        await productPage.chooseProduct('Photex FT3150 Black (95463)');
        await detailPage.addToCart();
        await page.goBack();
        await productPage.chooseProduct('RoboXplorer Multi Terrain Robotic');
        await detailPage.addToCart();

        // Step 1: Open browser and go to website
        // Step 2: Login with valid credentials
        // Step 3: Go to shopping cart page
        await detailPage.goToCart();

        // Step 4: Verify items show in table
        await cartPage.verifyOrdersInTable();

        // Step 5: click on Clear shopping cart
        await cartPage.clearCart();

        // Step 6: Verify empty cart page displays
        await expect(await cartPage.getEmptyCartMsg()).toBeVisible();
    })