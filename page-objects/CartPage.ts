import { expect, Page, Locator } from '@playwright/test';
import { MESSAGES } from '../datatest/Messages';

export class CartPage {

  readonly plusButton: Locator;
  readonly minusButton: Locator;
  readonly updateCartButton: Locator;
  readonly title: Locator;
  readonly clearCartBtn: Locator;

  constructor(private page: Page) {
    this.clearCartBtn = page.locator('.clear-cart');
    this.plusButton = page.locator('.plus');
    this.minusButton = page.locator('.minus');
    this.title = page.locator('.product-title');
    this.updateCartButton = page.getByRole('button', { name: 'UPDATE CART' });
  }

  async VerifyOrdersInTable() {
    const CartItems = await this.page.locator('.table-responsive table tbody tr.cart_item').count();
    await expect(CartItems).toBeGreaterThan(0);
  }

  async CLearCart() {
    await this.clearCartBtn.click();
  }

  async GetEmptyCartMsg() {
    return this.page.getByRole('heading', { name: MESSAGES.EMPTY_CART_MESSAGE });
  }

  async GetOrderedItemQuantity(prdName: string) {
    return parseFloat(await this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).getAttribute('value') ?? '0');
  }

  async AddQuantity() {
    await this.plusButton.click();
    await this.page.waitForSelector('form .blockOverlay');
    await this.page.waitForSelector('form .blockOverlay', { state: 'detached' });
  }

  async ReduceQuantity() {
    await this.minusButton.click();
    await this.page.waitForSelector('form .blockOverlay');
    await this.page.waitForSelector('form .blockOverlay', { state: 'detached' });
  }

  async GetOrderItemPrice(prdName: string) {
    const price = await this.page.locator('tr').filter({
      has: this.page.getByRole('link', { name: `${prdName}` })
    }).locator('.product-subtotal span bdi').innerText();
    const NumberOnly = price.replace(/[^0-9.]/g, '');
    return parseFloat(NumberOnly);
  }

  async FillQuantity(prdName: string, quantity: string) {
    await this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).fill(quantity);
  }

  async UpdateCart() {
    await this.updateCartButton.click();
  }
}
