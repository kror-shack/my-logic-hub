import { test, expect } from "@playwright/test";

test("test sample argument", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("link", { name: "Quantificational Logic Calculator" })
    .click();
  await expect(page.getByLabel("1.")).toHaveValue(
    "∀x ∀y ( ( Axg ∧ Agy ) -> Axy )"
  );
  await expect(page.getByLabel("2.")).toHaveValue("∀x ( Px -> Agx )");
  await expect(page.getByLabel("3.")).toHaveValue("∃x ( Px ∧ Axg )");
  await expect(page.getByLabel("∴")).toHaveValue(
    "∃x ( Px ∧ ∀y ( Py -> Axy ) )"
  );
  await page.getByLabel("Submit argument").click();
  await page.getByLabel("Show entire solution").click();
  await expect(page.getByRole("main")).toContainText(
    "Deduction Steps:-ObtainedFromRule4.Pa ∧ Aagfrom:3rule: Existential Instantiation?5.∀y ( ( Aag ∧ Agy ) -> Aay )from:1rule: Universal Instantiation?6.Pa -> Agafrom:2rule: Universal Instantiation?7.Pafrom:4rule: Simplification?8.Aagfrom:4rule: Simplification?9.( Aag ∧ Aga ) -> Aaafrom:5rule: Universal Instantiation?10.Agafrom:6,7rule: Modus Ponens?11.Aag ∧ Agafrom:8,10rule: Conjunction?12.Aaafrom:9,11rule: Modus Ponens?13.¬Pa ∨ Aaafrom:12rule: Addition?14.Pa -> Aaafrom:13rule: Material Implication?15.∀y ( Py -> Aay )from:14rule: Universal Generalization?16.Pa ∧ ∀y ( Py -> Aay )from:7,15rule: Conjunction?17.∃x ( Px ∧ ∀y ( Py -> Axy ) )from:16rule: Existential Generalization?"
  );
});
