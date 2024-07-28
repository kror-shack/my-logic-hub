import { test, expect } from "@playwright/test";

test("test sample argument", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Truth Table Generator" }).click();
  await expect(page.getByPlaceholder("Enter logical equation")).toHaveValue(
    "(P -> Q) -> P"
  );
  await page.getByLabel("Submit argument").click();
  await expect(page.getByRole("main")).toContainText(
    "PQP -> Q( P -> Q ) -> PTTTTTFFTFTTFFFTF"
  );
});
