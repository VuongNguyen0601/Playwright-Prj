import { test, expect } from "config/fixtures";
import { PAGE_NAVIGATE } from "data/PageNavigate";

test("TC09 - Verify users can update quantity of product in cart", async ({
   accountPage,
   homePage,
   productPage,
   detailPage,
   loginPage,
   cartPage
}) => {
    // Step 1: Open browser and go to website
    await homePage.navigate();
    // Step 2: Login with valid credentials
    await homePage.goToLoginPage();
    await loginPage.login();
    // Step 3: Go to shop page
    await accountPage.goToPage(PAGE_NAVIGATE.SHOP);

    // Step 4: Add a product
    await productPage.chooseProduct('RoboXplorer Robotic');
    await detailPage.addToCart();
    const expectedQuantity = await detailPage.getQuantity();
    const expectedPrice = await detailPage.getPrice();
    const prdName = await detailPage.getPrdName();

    // Step 5: Go to the cart
    await detailPage.goToCart();

    // Step 6: Verify quantity of added product
    let actualQuantity = await cartPage.getOrderedItemQuantity(prdName);
    expect(actualQuantity).toEqual(expectedQuantity);

    // Step 7: Click on Plus button
    await cartPage.addQuantity();

    // Step 8: Verify quantity of product and SUB TOTAL price
    actualQuantity = await cartPage.getOrderedItemQuantity(prdName);
    let actualPrice = await cartPage.getOrderItemPrice(prdName);

    expect(actualQuantity).toEqual(2);
    expect(actualPrice).toEqual(expectedPrice * 2);

    // Step 9: Enter 4 into quantity textbox then click on Update Cart button
    await cartPage.fillQuantity(prdName, '4');
    await cartPage.updateCart();

    // Step 10: Verify quantity of product is 4 and Sub Total price
    actualQuantity = await cartPage.getOrderedItemQuantity(prdName);
    actualPrice = await cartPage.getOrderItemPrice(prdName);
    expect(actualQuantity).toEqual(4);
    expect(actualPrice).toEqual(expectedPrice * 4);

    // Step 11: Click on Minus button
    await cartPage.reduceQuantity();

    // Step 12: Verify quantity of product and Sub Total price
    actualQuantity = await cartPage.getOrderedItemQuantity(prdName);
    actualPrice = await cartPage.getOrderItemPrice(prdName);
    expect(actualQuantity).toEqual(3);
    expect(actualPrice).toEqual(expectedPrice * 3);
})