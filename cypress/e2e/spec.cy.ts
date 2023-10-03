describe("Intital test", () => {
  it("Visits the local host", () => {
    cy.visit("http://localhost:3000");
    cy.contains("MY LOGIC HUB");
    cy.contains("OK").click();
    cy.contains("Quantificational Logic Calculator").click();
    cy.url().should("include", "/quantificational-logic-calculator");
    cy.contains("Write Deduction Steps");
  });
});
