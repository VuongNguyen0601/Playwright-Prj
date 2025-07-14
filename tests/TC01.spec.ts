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
    await homePage.navigate();

    // Step 2: Login with valid credentials
    await homePage.goToLoginPage();
    await loginPage.login();

    // Step 3: Navigate to All departments section
    await accountPage.navigateToAllDepartmentsDropdown();

    // Step 4: Select Electronic Components & Supplies
    await accountPage.changePage(DEPARTMENTS.ELECTRONIC_COMPONENT_AND_SUPPLIES);

    // Step 8: Select andy item randomly to purchase (DJI Mavic Pro Camera Drone)
    // await productPage.chooseProduct('DJI Mavic Pro Camera Drone');
    await productPage.chooseRandomPrd();
    const prdName = await detailPage.getPrdName();
    const prdQuantity = await detailPage.getQuantity();
    const prdPrice = await detailPage.getPrice();

    // Step 9: Click 'Add to Cart'
    await detailPage.addToCart();

    // Step 10: Go to the cart
    await detailPage.clickCart();
    
    // Step 11: Verify item details in mini content (confirm w/)
    // Step 12: Click on Checkout
    await detailPage.clickCheckout();

    // Step 13: Verify Checkout page displays
    await expect(page).toHaveTitle('Checkout – TestArchitect Sample Website');

    // Step 14: Verify item details in order
    //const itemOrdered = await checkoutPage.getItemOrdered(prdName, prdQuantity);
    //await expect(itemOrdered).toBeVisible();
    await expect(await checkoutPage.getItemOrdered()).toHaveText(new RegExp(`\\s*${prdName}\\s*×\\s*${prdQuantity}\\s*`, 'i'));
    

    // Step 15: Fill the billing details with default payment method
    await checkoutPage.fillBillingDetails(billingDetails);
    //await checkoutPage.placeOrder();

    // Step 16: Click on PLACE ORDER
    await checkoutPage.placeOrder();

    // Step 17: Verify Order status page displays
    // await expect(page).toHaveURL(/.*order-received.*/);

    // Step 18: Verify the Order details with billing and item information
    await expect(await orderConfirmationPage.getItemName(prdName)).toHaveText(new RegExp(`${prdName}`, 'i'));
    await expect(await orderConfirmationPage.getItemQuantity(prdName)).toHaveText(`× ${prdQuantity}`);
    await expect(await orderConfirmationPage.getItemPrice(prdName)).toHaveText(`${prdPrice}`);
    await expect(orderConfirmationPage.billingAddress).toHaveText(new RegExp (
        `\\s*${billingDetails
            .firstName}\\s*${billingDetails
            .lastName}\\s*${billingDetails
            .StrAdd}\\s*${billingDetails
            .city}\\s*${billingDetails
            .country}\\s*${billingDetails
            .phoneNum}\\s*${billingDetails
            .email}\\s*`)
    );
})