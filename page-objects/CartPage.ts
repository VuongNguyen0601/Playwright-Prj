import { expect, Page, Locator } from '@playwright/test';

export class CartPage {
  private page: Page;

  readonly cartItems: Locator;
  readonly quantityInput: Locator;
  readonly plusButton: Locator;
  readonly minusButton: Locator;
  readonly updateCartButton: Locator;
  readonly subtotalText: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.cartItems = page.locator('.cart-item'); 
    this.quantityInput = page.locator('input.qty'); 
    this.plusButton = page.locator('button.plus');
    this.minusButton = page.locator('button.minus');
    this.updateCartButton = page.locator('button[name="update_cart"]');
    this.subtotalText = page.locator('.cart-subtotal .amount');
    this.emptyCartMessage = page.locator('text=YOUR SHOPPING CART IS EMPTY');
  }

  // Go to cart icon or cart page
  async goToCart() {
    await this.page.click('#cart-icon'); 
  }

  // Verify number of items in cart
  async verifyItemInCart(expectedCount: number) {
    const actualCount = await this.cartItems.count();
    expect(actualCount).toBe(expectedCount);
  }

  // Proceed to checkout
  async proceedToCheckout() {
    await this.page.click('text=Checkout');
  }

  // Clear all items from cart
  async clearCart() {
    await this.page.click('text=Clear'); 
  }

  // Confirm cart is empty
  async verifyCartIsEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
  }

  // TC09: Quantity Methods
  async getQuantity(): Promise<number> {
    return parseInt(await this.quantityInput.inputValue(), 10);
  }

  async getSubtotal(): Promise<number> {
    const text = await this.subtotalText.textContent();
    return parseFloat(text?.replace(/[^0-9.]/g, '') || '0');
  }

  async clickPlus() {
    await this.plusButton.click();
  }

  async clickMinus() {
    await this.minusButton.click();
  }

  async setQuantity(value: number) {
    await this.quantityInput.fill(String(value));
    await this.updateCartButton.click();
  }

  async verifyQuantity(expected: number) {
    const actual = await this.getQuantity();
    expect(actual).toBe(expected);
  }

  async verifySubtotalIncreased(previous: number) {
    const current = await this.getSubtotal();
    expect(current).toBeGreaterThan(previous);
  }

  async verifySubtotalDecreased(previous: number) {
    const current = await this.getSubtotal();
    expect(current).toBeLessThan(previous);
  }
}
