import { test, expect } from "@playwright/test";

test("test sample argument", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Logic Venn" }).click();
  await page.goto("http://localhost:3000/venn-diagram-generator");
  await expect(page.getByPlaceholder("All S is P")).toHaveValue(
    "All men are mortal."
  );
  await expect(page.getByPlaceholder("Some Q is S")).toHaveValue(
    "Socrates is a man."
  );
  await expect(page.getByPlaceholder("Therefore, some Q is P")).toHaveValue(
    "Therefore, Socrates is mortal."
  );
  await page.getByLabel("Submit argument").click();
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.getByRole("list")).toContainText(
    "Figure: AAA-1Major Premise: All men are mortal.Minor Premise:Socrates is a man.Major Term:mortalMinor Term:socratesMiddle Term: men"
  );
  await expect(page.getByRole("main")).toContainText(
    "This argument is a valid syllogistic argument."
  );
  await expect(page.getByRole("main")).toContainText(
    "The argument has the form of: Barbara"
  );
});
