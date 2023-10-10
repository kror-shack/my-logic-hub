describe("truth table page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/truth-table-generator");
  });
  it("shows alert on invalid input", () => {
    cy.get("#argument").clear();
    cy.get("#argument").type("Hello");
    cy.contains("Get Truth Table").click();
    cy.on("window:alert", (t) => {
      expect(t).contains(
        "The predicates H and e must contain an operator between them. Note: case variations of the same alphabet will be treated as distinct predicates."
      );
    });
  });
  it("shows result for a valid argument", () => {
    cy.get("#argument").clear();
    cy.get("#argument").type("P -> Q");
    cy.contains("Get Truth Table").click();
    cy.get('[data-cy="truth-table"]');
  });
  it("renders a new table for new data", () => {
    cy.contains("Get Truth Table").click();
    const firstTable = cy.get('[data-cy="truth-table"]');
    cy.get("#argument").clear();
    cy.get("#argument").type("P -> Q");
    cy.contains("Get Truth Table").click();
    cy.get('[data-cy="truth-table"]').should("not.equal", firstTable);
  });
  it("shows the operator list only when input is focused", () => {
    cy.get("#argument").type("P -> Q");
    cy.get("#argument").click();

    cy.get(".operator-list");
    cy.contains("Truth Table").click(); // click on the header for input to lose focus
    cy.get(".operator-list").should("not.exist");
  });
});
