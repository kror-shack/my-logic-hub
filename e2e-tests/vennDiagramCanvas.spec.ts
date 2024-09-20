import { test, expect } from "@playwright/test";

test("test-1", async ({ page }) => {
  await page.goto("localhost:3000/venn-diagram-generator");
  await page.getByLabel("Submit argument").click();

  const canvas = page.locator("canvas");

  await expect(canvas).toHaveScreenshot();
});

test("test-2", async ({ page }) => {
  await page.goto(
    "localhost:3000/venn-diagram-generator/?argument=%5B%22All%20salamanders%20are%20amphibians%22,%22all%20salamanders%20are%20newts%22,%22All%20newts%20are%20amphibians%22%5D"
  );
  await page.getByLabel("Submit argument").click();

  const canvas = page.locator("canvas");

  await expect(canvas).toHaveScreenshot();
});

test("test-3", async ({ page }) => {
  await page.goto(
    "localhost:3000/venn-diagram-generator/?argument=%5B%22no%20humanitarians%20are%20tyrants%20%22,%22some%20dictators%20are%20tyrants%22,%22no%20dictators%20are%20humanitarians%20%22%5D"
  );
  await page.getByLabel("Submit argument").click();

  const canvas = page.locator("canvas");

  await expect(canvas).toHaveScreenshot();
});

test("test-4", async ({ page }) => {
  await page.goto(
    "localhost:3000/venn-diagram-generator/?argument=%5B%22no%20humanitarians%20are%20tyrants%20%22,%22some%20dictators%20are%20tyrants%22,%22no%20dictators%20are%20humanitarians%20%22%5D"
  );
  await page.getByLabel("Submit argument").click();

  const canvas = page.locator("canvas");

  await expect(canvas).toHaveScreenshot();
});

test("test-5 OEO-2", async ({ page }) => {
  await page.goto(
    "http://localhost:3000/venn-diagram-generator?argument=%5B%22Some%20p%20are%20not%20m%22,%22No%20l%20are%20m%22,%22Therefore,%20some%20l%20are%20not%20p%22%5D"
  );
  await page.getByLabel("Submit argument").click();

  const canvas = page.locator("canvas");

  await expect(canvas).toHaveScreenshot();
});

test("test-6 OOI-4", async ({ page }) => {
  await page.goto(
    "http://localhost:3000/venn-diagram-generator?argument=%5B%22Some%20P%20are%20not%20M.%22,%22Some%20M%20are%20not%20%20S.%22,%22Therefore,%20some%20S%20are%20P.%22%5D"
  );
  await page.getByLabel("Submit argument").click();

  const canvas = page.locator("canvas");

  await expect(canvas).toHaveScreenshot();
});
