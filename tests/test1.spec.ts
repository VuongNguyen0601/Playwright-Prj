import { expect, test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { ShopPage } from '../page-objects/ShopPage';
import { HomePage} from '../page-objects/HomePage';
import { ProductPage} from '../page-objects/ProductPage';
import { CartPage } from '../page-objects/CartPage';
import { CheckoutPage} from '../page-objects/CheckoutPage';
import { OrderConfirmationPage} from '../page-objects/OrderConfirmationPage';
import { AccountPage } from '../page-objects/AccountPage';
import { GuestCheckoutPage } from '../page-objects/GuestCheckoutPage';
import 'dotenv/config';
import { METHODS } from 'http';


test('TC-01-Verify users can buy an item succesfully', async ({ page }) => {
  require('dotenv').config();
  // 1. Open browser and go to https://demo.testarchitect.com/
  await page.goto(process.env.URL as string);
  await expect(page).toHaveURL('https://demo.testarchitect.com/');
  await page.getByRole('link', { name: 'Log in / Sign up'}).click();
  

  // 2. Login with valid credentials
  await page.fill('input[name="username"]', process.env.USERNAME as string);
  await page.fill('input[name="password"]', process.env.PASSWORD as string);

  //await page.fill('input[name="username"]', 'vuong.nguyen');
  //await page.fill('input[name="password"]', 'GS5BBxiVSv34WQ2');
  //await page.getByRole('button', { name: 'Log in'}).click();

  // 3. Navigate to All departments section
  await page.getByText('All departments').hover();

  // 4. Select electronic components & Supplies
  await page.click('a:has-text("Electronic Components & Supplies")');

  // // 5. Verify the items should be displayed as a grid
  // await expect(page.locator('.product-grid')).toBeVisible();
  // //console.log('Step 5: Verified items are displayed as a grid.');

  // // 6. Switch view to list //bo di
  // await page.click('button[aria-label="List View"]'); //bo di
  // //console.log('Step 6: Switched view to list.');

  // // 7. Verify the items should be displayed as a list  //bo di
  // await expect(page.locator('.product-list')).toBeVisible();
  // console.log('Step 7: Verified items are displayed as a list.');

  // 8. Select any item randomly to purchase 
  const firstAddToCartButton = page.locator('.product-item .add-to-cart-button').first();
  //await expect(firstAddToCartButton).toBeVisible();
  await firstAddToCartButton.click();
  //console.log('Step 8: Selected an item and clicked Add to cart (assuming direct add).');

  //9. Click 'Add to Cart' 
  //console.log('Step 9: Item added to cart (or handled in step 8).');

  // 10. Go to the cart
  await page.click('a:has-text("Cart")');
  await expect(page).toHaveURL(/cart/);
  //console.log('Step 10: Navigated to the cart.');

  // 11. Step 11: Verify item is present in mini-cart
});

const paymentMethods: ('bank' | 'cod') [] = ['bank', 'cod'];


  test ("TC-02-Verify users can buy multiple item successfully", async ({ page }) => {
    const login = new LoginPage(page);
    const shop = new ShopPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const confirmation = new OrderConfirmationPage(page);

  // Step 1 & 2: Open browser and Login
  await page.goto('https://demo.testarchitect.com/');
  await expect(page).toHaveURL('https://demo.testarchitect.com/');
  await page.getByRole('link', { name: 'Log in / Sign up'}).click();

  console.log(process.env.USERNAME as string, process.env.PASSWORD as string)
  await page.fill('input[name="username"]', process.env.USERNAME as string);
  await page.fill('input[name="password"]', process.env.PASSWORD as string);

  //await page.fill('input[name="username"]', 'vuong.nguyen');
  //await page.fill('input[name="password"]', 'GS5BBxiVSv34WQ2');
  await page.getByRole('button', { name: 'Log in'}).click();

  // Step 3 & 4
  await shop.goToShop();
  await shop.addMultipleItems(3);

  // Step 5: Go to cart and verify items
  await cart.goToCart();
  await cart.verifyItemInCart(3);

  // Step 6: Proceed to checkout
  await cart.proceedToCheckout();
  await checkout.fillBillingAndConfirmOrder();
  });
//}
// test("Verify users can buy multiple item successfully", async ({ page }) => {
//     const login = new LoginPage(page);
//     const shop = new ShopPage(page);
//     const cart = new CartPage(page);
//     const checkout = new CheckoutPage(page);
//     const confirmation = new OrderConfirmationPage(page);

//   // Step 1 & 2: Open browser and Login
//   await page.goto('https://demo.testarchitect.com/');
//   await expect(page).toHaveURL('https://demo.testarchitect.com/');
//   await page.getByRole('link', { name: 'Log in / Sign up'}).click();

//   console.log(process.env.USERNAME as string, process.env.PASSWORD as string)
//   await page.fill('input[name="username"]', process.env.USERNAME as string);
//   await page.fill('input[name="password"]', process.env.PASSWORD as string);

//   //await page.fill('input[name="username"]', 'vuong.nguyen');
//   //await page.fill('input[name="password"]', 'GS5BBxiVSv34WQ2');
//   await page.getByRole('button', { name: 'Log in'}).click();

//   // Step 3 & 4
//   await shop.goToShop();
//   await shop.addMultipleItems(3);

//   // Step 5: Go to cart and verify items
//   await cart.goToCart();
//   await cart.verifyItemInCart(3);

//   // Step 6: Proceed to checkout
//   await cart.proceedToCheckout();
//   await checkout.fillBillingAndConfirmOrder();
// });

test("TC-03 - Verify users can buy an item using different payment methods (all payment methods)", async ({ page }) => {
  const login = new LoginPage(page);
  const shop = new ShopPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const confirmation = new OrderConfirmationPage(page);

  // Step 1 & 2: Open site and login
  await login.goto();
  await page.getByRole('link', { name: 'Log in / Sign up'}).click();
  await login.login(process.env.USERNAME || '', process.env.PASSWORD || '');
  await page.getByRole('button', { name: 'Log in'}).click();

  // Step 3 & 4: Go to shop and add 1 item
  await shop.goToShop();
  await shop.addMultipleItems(1);
  
  // Step 5: Go to cart & proceed
  await cart.goToCart();
  await cart.verifyItemInCart(1);
  await cart.proceedToCheckout();

  // Step 6: Checkout page & select payment
  await checkout.verifyCheckoutPage();
  await checkout.choosePaymentMethod(method);
  await checkout.fillBillingDetails();
  await checkout.placeOrder();

  // Step 7 & 8: Verify confirmation
  await confirmation.verifyOrderConfirmationMessage();

})

test ('TC-04 - verify users can sort items by price', async ({ page }) => {
  const login = new LoginPage(page);
  const shop = new ShopPage(page);

  // Step 1 & 2: Navigate to site and Login
  await login.goto();
  await login.login(process.env.USERNAME || '', process.env.PASSWORD || '');

  // Step 3 & 4: go to shop and switch to list view
  await shop.goToShop();
  await shop.switchToListView();

  // Step 5a: Sort by Low to High
  await shop.sortByPrice('asc');

  // Step 6a: Verify ascendong order
  await shop.verifySortedByPrice('asc');

  // Step 5b: Sort by High to Low
  await shop.sortByPrice('asc');

  // Step 6b: Verify descending order
  await shop.verifySortedByPrice('desc');
});

test('TC_05 - Verify orders appear in order history', async ({ page }) => {
  const login = new LoginPage(page);
  const account = new AccountPage(page);

  // Step 1: Login
  await login.goto();
  await login.login(process.env.USERNAME || '', process.env.PASSWORD || '');

  // Step 2: Go to My Account > Orders
  await account.goToMyAccount();
  await account.openOrdersSection();

  // Step 3: Verify orders exist and show details
  await account.verifyOrdersExist(2);
  await account.verifyOrderDetailsVisible();
});

test('TC-06 - Verify guest user can replace an order without logging in', async ({ page }) => {
  const shop = new ShopPage(page);
  const cart = new CartPage(page);
  const guestCheckout = new GuestCheckoutPage(page);

  // Step 1 & 2: Go to shop page
  await page.goto('https://demo.testarchitect.com/');
  await shop.goToShop();

  // Step 3: Add item to cart
  await shop.addMultipleItems(1);

  // Step 4 & 5: go to cart and proceed to checkout
  await cart.goToCart();
  await cart.verifyItemInCart(1);
  await cart.proceedToCheckout();

  //  Step 6: fill guest billing info and place order
  await guestCheckout.fillGuestBillingDetails();
  await guestCheckout.placeOrder();

  // Step 7: Verify order confirmation page
  await guestCheckout.verifyOrderConfirmation();
})

test('TC-07 - Ensure proper error handling when mandatory fields are blank', async ({ page }) => {
  const login = new LoginPage(page);
  const shop = new ShopPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  // Test: Leave required fields blank and place order
  await checkout.verifyCheckoutPage();
  await checkout.leaveFieldsBlankAndPlaceOrder();
  await checkout.verifyValidationErrors();
});

test('TC-08 - Verify users can clear the cart', async ({ page }) => {
  const login = new LoginPage(page);
  const shop = new ShopPage(page);
  const cart = new CartPage(page);

  // Step 1: Login and add items
  await login.goto();
  await login.login(process.env.USERNAME || '', process.env.PASSWORD || '');
  await shop.goToShop();
  await shop.addMultipleItems(1);

  // Step 2-4: Go to cart and verify items
  await cart.goToCart();
  await cart.verifyItemInCart(1);

  // Step 5-6: Clear cart and verify
  await cart.clearCart();
  await cart.verifyCartIsEmpty();
})

test('TC-09 - Verify users can update quantity of product in cart', async ({ page }) => {
  const login = new LoginPage(page);
  const shop = new ShopPage(page);
  const cart = new CartPage(page);

  // Step 1-4: Login, go to shop and add item
  await login.goto();
  await login.login(process.env.USERNAME || '', process.env.PASSWORD || '');
  await shop.goToShop();
  await shop.addItemToCart();
  await cart.goToCart();

  // Step 6: Verify quantity = 1
  await cart.verifyQuantity(1);
  const initialSubtotal = await cart.getSubtotal();

  // Step 7-8: Click Plus and Verify increased quantity and subtotal
  await cart.clickPlus();
  await cart.verifyQuantity(2);
  await cart.verifySubtotalIncreased(initialSubtotal);

  // Step 9-10: Enter 4 manually, click update
  await cart.setQuantity(4);
  await cart.verifyQuantity(4);

  // Step 11-12: click Minus, verify quantity = 3 and subtotal decreases
  await cart.clickMinus();
  await cart.verifyQuantity(3);
  await cart.verifySubtotalDecreased(await cart.getSubtotal());
});