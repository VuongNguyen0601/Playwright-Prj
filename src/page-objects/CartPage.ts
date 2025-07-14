import { expect, Page, Locator } from '@playwright/test';
import { MESSAGES } from '../datatest/Messages';

export class CartPage {

  readonly plusButton: Locator;
  readonly minusButton: Locator;
  readonly updateCartButton: Locator;
  readonly title: Locator;
  readonly clearCartBtn: Locator;
  readonly proceedToCheckoutBtn: Locator;

  constructor(private page: Page) {
    this.clearCartBtn = page.locator('.clear-cart');
    this.plusButton = page.locator('.plus');
    this.minusButton = page.locator('.minus');
    this.title = page.locator('.product-title');
    this.updateCartButton = page.getByRole('button', { name: 'UPDATE CART' });
    this.proceedToCheckoutBtn = page.getByRole('link', { name: 'PROCEED TO CHECKOUT' });
  }

  async verifyOrdersInTable() {
    const CartItems = await this.page.locator('.table-responsive table tbody tr.cart_item').count();
    await expect(CartItems).toBeGreaterThan(0);
  }

  async clearCart() {
    await this.clearCartBtn.click();
  }

  async getEmptyCartMsg() {
    return this.page.getByRole('heading', { name: MESSAGES.EMPTY_CART_MESSAGE });
  }

  async getOrderedItemQuantity(prdName: string) {
    //return parseFloat(await this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).getAttribute('value') ?? '0');

    return await this.page.getByRole('spinbutton', { name: `${prdName} quantity`});
  }

  async addQuantity() {
    await this.plusButton.click();
    await this.page.waitForSelector('form .blockOverlay');
    await this.page.waitForSelector('form .blockOverlay', { state: 'detached' });
  }

  async reduceQuantity() {
    await this.minusButton.click();
    await this.page.waitForSelector('form .blockOverlay');
    await this.page.waitForSelector('form .blockOverlay', { state: 'detached' });
  }

  async getOrderItemPrice(prdName: string) {
    const price = await this.page.locator('tr').filter({
      has: this.page.getByRole('link', { name: `${prdName}` })
    }).locator('.product-subtotal span bdi').innerText();
    const NumberOnly = price.replace(/[^0-9.]/g, '');
    return parseFloat(NumberOnly);
  }

  async fillQuantity(prdName: string, quantity: string) {
    await this.page.getByRole('spinbutton', { name: `${prdName} quantity` }).fill(quantity);
  }

  async updateCart() {
    await this.updateCartButton.click();
    await this.page.waitForSelector('form .blockOverlay');
    await this.page.waitForSelector('form .blockOverlay', { state: 'detached' });
  }

  async clickToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }

  async verifyItemOrdered(expectedProducts: string[][]) {
    for (let i = 0; i < expectedProducts.length; i++) {
      // Chọn từng sản phẩm trong danh sách đơn hàng
      const item = this.page.locator('.cart_item').nth(i);

      // Lấy tên sản phẩm
      const name = await item.locator('.product-title').innerText();

      // Lấy giá sản phẩm
      const price = await item.locator('.product-price .woocommerce-Price-amount').innerText();

      // Lấy số lượng sản phẩm
      const quantity = await item.locator('.qty').getAttribute('value');

      // Tạo mảng thông tin thực tế của sản phẩm [name, price, quantity]
      const actualInfo = [name, price, quantity];

      // So sánh với dữ liệu mong đợi
      expect(actualInfo).toEqual(expectedProducts[i]);
    }
  }
}
