import { test, expect } from "@playwright/test";

test("test sample argument", async ({ page }) => {
  await page.goto("http://localhost:3000/semantic-tableaux-generator");
  await expect(page.getByLabel("1.")).toHaveValue("P ∨ ( Q ∧ R )");
  await expect(page.getByLabel("∴")).toHaveValue("( P ∨ Q ) ∧ ( P ∨ R )");
  await page.getByLabel("Submit argument").click();
  await expect(page.locator("body")).toContainText(
    "1)P ∨ ( Q ∧ R )2)¬ ( ( P ∨ Q ) ∧ ( P ∨ R ) )3)P14)¬ ( P ∨ Q )25)¬P46)¬Q4X4)¬ ( P ∨ R )27)¬P48)¬R4X3)Q ∧ R14)¬ ( P ∨ Q )29)Q310)R311)¬P412)¬Q4X4)¬ ( P ∨ R )29)Q310)R313)¬P414)¬R4X"
  );
});
