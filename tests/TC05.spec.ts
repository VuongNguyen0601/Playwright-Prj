import { test, expect } from "config/fixtures";
import { BILLING_INFO } from "data/BillingInfo";
import { PAGE_NAVIGATE } from "data/PageNavigate";
import GetDate from "utils/GetDate";

const billingDetails: BILLING_INFO = {
        firstName: 'Vuong',
        lastName: 'King',
        country: 'Vietnam',
        StrAdd: 'Tran Quoc Toan',
        city: 'HaNoi',
        phoneNum:'985623952',
        email: process.env.EMAIL_ADDRESS!
};

test("TC05 - Verify orders appear in order history", async ( {
    homePage,
    loginPage,
    accountPage,
    detailPage, 
    checkoutPage, 
    orderConfirmationPage,
    historyPage,
    productPage
}) => {
    // Step 1: Go to My account page
    await homePage.navigate();
    await homePage.goToLoginPage();
    await loginPage.login();
    // Step 2: Click order details (The orders are displayed)
    await accountPage.goToPage(PAGE_NAVIGATE.SHOP);
    await productPage.chooseProduct(('AirPods'));
    let expectedQuantity = await detailPage.getQuantity();
    let expectedPrice = await detailPage.getPrice();

    await detailPage.addToCart();
    await detailPage.clickCart();
    await detailPage.clickCheckout();
    await checkoutPage.fillBillingDetails(billingDetails);
    await checkoutPage.placeOrder();
    let orderNumber = await orderConfirmationPage.getOrderNumber();

    await homePage.goToAccountPage();
    await accountPage.changePage(PAGE_NAVIGATE.ORDERS);
    
    const getDate = new GetDate();
    const date = await getDate.getToday();

    expect(await historyPage.getOrderNumberInTable()).toEqual(`#${orderNumber}`);
    expect(await historyPage.getOrderDateInTable()).toMatch(new RegExp(`^${date}$`, "i"));
    expect(await historyPage.getOrderStatusInTable()).toEqual('ON HOLD');
    expect(await historyPage.getOrderPriceAndQuantityInTable()).toEqual(`${expectedPrice} FOR ${expectedQuantity} ITEM`);

    // Second product
    // await accountPage.goToPage(PAGE_NAVIGATE.SHOP);
    // await productPage.chooseProduct('Bose SoundLink Mini');
    // expectedQuantity = await detailPage.getQuantity();
    // expectedPrice = await detailPage.getPrice();

    // await detailPage.addToCart();
    // await detailPage.clickCart();
    // await checkoutPage.fillBillingDetails(billingDetails);
    // await checkoutPage.placeOrder();
    // orderNumber = await orderConfirmationPage.getOrderNumber();

    // await homePage.goToAccountPage();
    // await accountPage.changePage(PAGE_NAVIGATE.ORDERS);

    // expect(await historyPage.getOrderDateInTable()).toEqual(`#${orderNumber}`);
    // expect(await historyPage.getOrderDateInTable()).toMatch(new RegExp(`^${date}$`, "i"));
    // expect(await historyPage.getOrderStatusInTable()).toEqual('ON HOLD');
    // expect(await historyPage.getOrderPriceAndQuantityInTable()).toEqual(`$${expectedPrice}.00 FOR ${expectedQuantity} ITEM`);
})