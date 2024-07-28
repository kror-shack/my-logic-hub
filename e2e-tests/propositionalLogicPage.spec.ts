import { test, expect } from "@playwright/test";

test("test sample argument", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("link", { name: "Propositional Logic Calculator" })
    .click();
  await page.getByLabel("Submit argument").click();
  await page.getByLabel("Show entire solution").click();
  await expect(page.getByLabel("1.")).toHaveValue("( ¬ Q -> P ) ∧ (R -> T )");

  await expect(page.getByLabel("2.")).toHaveValue(" ¬ ( ¬P -> S )");
  await expect(page.getByLabel("3.")).toHaveValue(" (¬ U ∨ R ) ∧ U ");
  await expect(page.getByLabel("4.")).toHaveValue(" ¬B -> ¬T ");
  await expect(page.getByLabel("5.")).toHaveValue("T -> Y");
  await expect(page.getByLabel("6.")).toHaveValue("¬K -> ¬Y");
  await expect(page.getByLabel("∴")).toHaveValue(
    "( ¬ ( B -> ¬Q ) ∧ ( ¬ S ∧ T ) )∧ ( X ∨ K )"
  );
  await expect(page.getByRole("main")).toContainText(
    "Deduction Steps:-ObtainedFromRule7.¬Q->Pfrom:1rule: Simplification?8.R->Tfrom:1rule: Simplification?9.¬(P∨S)from:2rule: Material Implication?10.¬P∧¬Sfrom:9rule: DeMorgan Theorem?11.¬U∨Rfrom:3rule: Simplification?12.Ufrom:3rule: Simplification?13.¬Pfrom:10rule: Simplification?14.¬Sfrom:10rule: Simplification?15.Rfrom:11,12rule: Disjunctive Syllogism?16.Qfrom:7,13rule: Modus Tollens?17.Tfrom:8,15rule: Modus Ponens?18.Bfrom:4,17rule: Modus Tollens?19.Yfrom:5,17rule: Modus Ponens?20.Kfrom:6,19rule: Modus Tollens?21.B∧Qfrom:18,16rule: Conjunction?22.¬(¬B∨¬Q)from:21rule: DeMorgan Theorem?23.¬(B->¬Q)from:22rule: Material Implication?24.¬S∧Tfrom:14,17rule: Conjunction?25.¬(B->¬Q)∧(¬S∧T)from:23,24rule: Conjunction?26.X∨Kfrom:20rule: Addition?27.(¬(B->¬Q)∧(¬S∧T))∧(X∨K)from:25,26rule: Conjunction?"
  );
});
