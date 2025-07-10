import { test, expect } from "config/fixtures";
import { PAGE_NAVIGATE } from "data/PageNavigate";

test("TC04 - Verify users can sort items by price", async ({ page, homePage, loginPage, accountPage, productPage }) => {
    // Step 1: Open browser and navigate to page
    await homePage.navigate();
    // Step 2: Login with valid credentials
    await homePage.goToLoginPage();
    await loginPage.login();
    // Step 3: Go to shop page
    await accountPage.goToPage(PAGE_NAVIGATE.SHOP);

    // Step 4: Switch view to list
    // Step 5: Sort items by price (low to high / high to low)
    await productPage.sortItems('Sort by price: low to high');

    // Step 6: Verify order of items
    const actualPriceSort = await productPage.getItemOrder();
    const expectedPriceSort = await productPage.sortPrices('Ascend');
    expect(actualPriceSort).toEqual(expectedPriceSort);
})