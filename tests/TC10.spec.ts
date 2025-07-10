import { expect, test } from "config/fixtures";
import { PAGE_NAVIGATE } from "data/PageNavigate";
import { REVIEWS } from "data/Review";

test("Verify users can post a review", async ({
    accountPage,
    productPage,
    detailPage
}) => {
    // Step 1: Open browser and go to website
    // Step 2: Login with valid credentials
    // Step 3: Go to shop page
    await accountPage.goToPage(PAGE_NAVIGATE.SHOP);

    // Step 4: Click on a product to view detail
    await productPage.chooseProduct('Beats Studio Wireless Over-Ear');

    // Step 5: Scroll down then click on Reviews tab
    await detailPage.clickReview();

    // Step 6: Submit a review
    await detailPage.rating("5");
    await detailPage.writeReview(REVIEWS.PRD_REVIEW);
    await detailPage.submitReview();

    // Step 7: Verify new review
    await detailPage.clickReview();
    await expect(await detailPage.getReview()).toBeVisible();
})