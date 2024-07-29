import { test, expect } from "@playwright/test";

test("test sample argument", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("link", { name: "Propositional Logic Indirect" })
    .click();
  await expect(page.getByLabel("1.")).toHaveValue("(S ∨ R) -> (¬P -> Q)");
  await expect(page.getByLabel("2.")).toHaveValue("¬S -> ¬(T -> Q)");
  await expect(page.getByLabel("3.")).toHaveValue("R -> ¬T");
  await expect(page.getByLabel("4.")).toHaveValue("¬P");
  await expect(page.getByLabel("5.")).toHaveValue("¬R -> Q");
  await expect(page.getByLabel("6.")).toHaveValue("S -> ¬Q");
  await expect(page.getByLabel("7.")).toHaveValue("¬S -> T");
  await expect(page.getByLabel("∴")).toHaveValue("(T -> R) ∧ ¬S");
  await page.getByLabel("Submit argument").click();
  await page.getByLabel("Show entire solution").click();
  await expect(page.getByRole("table")).toContainText(
    "ObtainedFromRule8.(T∧¬R)∨Sfrom:concrule: Assuming the contradiction?9.T->¬Rfrom:3rule: Transposition?10.T->Qfrom:9,5rule: Hypothetical Syllogism?11.Sfrom:2,10rule: Modus Tollens?12.¬Qfrom:6,11rule: Modus Ponens?13.S∨Rfrom:11rule: Addition?14.¬P∧¬Qfrom:4,12rule: Conjunction?15.¬(P∨Q)from:14rule: DeMorgan Theorem?16.¬(¬P->Q)from:15rule: Material Implication?17.(S∨R)∧¬(¬P->Q)from:13,16rule: Conjunction?18.¬(¬(S∨R)∨(¬P->Q))from:17rule: DeMorgan Theorem?19.¬((S∨R)->(¬P->Q))from:18rule: Material Implication?20.((S∨R)->(¬P->Q))∧¬((S∨R)->(¬P->Q))from:1,19rule: Conjunction?21.((S∨R)->(¬P->Q))∧¬((S∨R)->(¬P->Q))from:20rule: -R Contradiction?"
  );
});
