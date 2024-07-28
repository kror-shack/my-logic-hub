import { test, expect } from "@playwright/test";

test("test input feilds and proof fetching", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("link", { name: "Propositional Logic Calculator" })
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^2\.X$/ })
    .getByLabel("delete premise")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^2\.X$/ })
    .getByLabel("delete premise")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^2\.X$/ })
    .getByLabel("delete premise")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^2\.X$/ })
    .getByLabel("delete premise")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^2\.X$/ })
    .getByLabel("delete premise")
    .click();
  await page.getByLabel("1.").click();
  await page.getByText("1.").click();
  await page.getByLabel("1.").click();
  await page.getByLabel("1.").press("ArrowRight");
  await page.getByLabel("1.").press("ArrowRight");
  await page.getByLabel("1.").press("ArrowRight");
  await page.getByLabel("1.").press("ArrowRight");
  await page.getByLabel("1.").press("ArrowRight");
  await page.getByLabel("1.").press("ArrowRight");
  await page.getByLabel("1.").press("ArrowRight");
  await page.getByLabel("1.").press("ArrowRight");
  await page.getByLabel("1.").fill("P ");
  await page.getByLabel("Add material implication").click();
  await page.getByLabel("1.").fill("P -> Q");
  await page.getByRole("button", { name: "Add Premise" }).click();
  await page.getByLabel("2.").fill("Q->R");
  await page.getByRole("button", { name: "Add Premise" }).click();
  await page.getByLabel("3.").fill("P");
  await page.getByLabel("∴").click();
  await page.getByLabel("∴").dblclick();
  await page.getByLabel("∴").press("ArrowDown");
  await page.getByLabel("∴").press("ArrowRight");
  await page.getByLabel("∴").press("ArrowRight");
  await page.getByLabel("∴").press("ArrowRight");
  await page.getByLabel("∴").press("ArrowRight");
  await page.getByLabel("∴").press("ArrowRight");
  await page.getByLabel("∴").press("ArrowRight");
  await page.getByLabel("∴").press("ArrowRight");
  await page.getByLabel("∴").fill("R");
  await page.getByLabel("Submit argument").click();
  await page.getByLabel("Show entire solution").click();
  await expect(page.getByRole("table")).toContainText(
    "ObtainedFromRule4.Qfrom:1,3rule: Modus Ponens?5.Rfrom:2,4rule: Modus Ponens?"
  );
  await page
    .locator("div")
    .filter({ hasText: /^3\.X$/ })
    .getByLabel("delete premise")
    .click();
  await page.getByLabel("Submit argument").click();
  await expect(page.locator("h2")).toContainText(
    "This Argument is invalid. The premises do not entail the conclusion."
  );
});
