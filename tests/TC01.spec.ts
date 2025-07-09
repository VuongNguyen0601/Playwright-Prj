import { test, expect } from "config/fixtures";
import { BILLING_INFO } from "data/BillingInfo";
import { DEPARTMENTS } from "data/Department";

const billingDetails: BILLING_INFO = {
        firstName: 'Vuong',
        lastName: 'King',
        country: 'Vietnam',
        StrAdd: 'Tran Quoc Toan',
        city: 'HaNoi',
        phoneNum:'985623952',
        //zipCode: '222222222',
        //state: 'California',
        email: process.env.EMAIL_ADDRESS!
};

test("TC01 - Verify users can buy an item successfully", async ({ 
    page,
    homePage,
    loginPage,
    accountPage,
    productPage,
    detailPage,
    checkoutPage,
    orderConfirmationPage
}) => {
    // Step 1: Open browser and navigate to page
    // Step 2: Login with valid credentials
    // Step 3: Navigate to All departments section
    await accountPage.navigateToAllDepartmentsDropdown();

    // Step 4: Select Electronic Components & Supplies
    await accountPage.selectPage(DEPARTMENTS.ELECTRONIC_COMPONENT_AND_SUPPLIES);

    // Step 8: Select andy item randomly to purchase (DJI Mavic Pro Camera Drone)
    // await productPage.chooseProduct('DJI Mavic Pro Camera Drone');
    await productPage.chooseRandomPrd();
    const prdName = await detailPage.getPrdName();
    const prdQuantity = await detailPage.getQuantity();
    const prdPrice = await detailPage.getPrice();

    // Step 9: Click 'Add to Cart'
    await detailPage.addToCart();

    // Step 10: Go to the cart
    // Step 11: Verify item details in mini content (confirm w/)
    await detailPage.clickCart();

    // Step 12: Click on Checkout
    await detailPage.clickCheckout();

    // Step 13: Verify Checkout page displays
    await expect(page).toHaveTitle('Checkout – TestArchitect Sample Website');

    // Step 14: Verify item details in order
    const itemOrdered = await checkoutPage.getItemOrdered(prdName, prdQuantity);
    await expect(itemOrdered).toBeVisible();

    // Step 15: Fill the billing details with default payment method
    await checkoutPage.fillBillingDetails(billingDetails);

    // Step 16: Click on PLACE ORDER
    await checkoutPage.placeOrder();

    // Step 17: Verify Order status page displays
    // await expect(page).toHaveURL(/.*order-received.*/);

    // Step 18: Verify the Order details with billing and item information
    await expect(await orderConfirmationPage.getItemName(prdName)).toBeVisible();
    expect(await orderConfirmationPage.getItemQuantity(prdName)).toEqual(`×${prdQuantity}`);
    expect(await orderConfirmationPage.getItemPrice(prdName)).toEqual(`$${prdPrice}.00`);

    expect(await orderConfirmationPage.getBillingAddress()).toEqual((`${billingDetails.firstName}${billingDetails.lastName}${billingDetails.StrAdd}${billingDetails.city}${billingDetails.country}${billingDetails.phoneNum}${billingDetails.email}`).replace(/\s+/g, ''));
})