describe("Navigation Test", () => {
  it("should navigate through all the main page links", () => {
    cy.visit("http://localhost:3000");
    cy.contains("OK").click(); // to hide the popup
    cy.contains("Quantificational Logic Calculator").click();
    cy.url().should("include", "/quantificational-logic-calculator");
    cy.contains("Home").click();
    cy.contains("Propositional Logic Calculator").click();
    cy.url().should("include", "/propositional-logic-calculator");

    cy.contains("Home").click();
    cy.contains("Logic Venn").click();
    cy.url().should("include", "/venn-diagram-generator");

    cy.contains("Home").click();
    cy.contains("Truth Table Generator").click();
    cy.url().should("include", "/truth-table-generator");

    cy.contains("Home").click();
    cy.contains("Semantic Tableaux Generator").click();
    cy.url().should("include", "/semantic-tableaux-generator");

    cy.contains("Home").click();
    cy.contains("Propositional Logic Indirect Proof").click();
    cy.url().should("include", "/propositional-logic-indirect-proof-generator");

    cy.contains("Home").click();
    cy.get('[data-cy="quiz-link"]').click();
    cy.url().should("include", "/philosopher-quiz");

    cy.contains("Home").click();
    cy.contains("About").click();
    cy.url().should("include", "/about-us");

    cy.contains("Home").click();
    cy.contains("Report issue").click();
    cy.url().should("include", "/report-issue");

    cy.contains("Home").click();
    cy.contains("Info").click();
    cy.url().should("include", "/info");

    cy.contains("Home").click();
    cy.contains("MY LOGIC HUB");
  });

  it("should navigate through all the info page links", () => {
    cy.visit("http://localhost:3000/info");
    cy.contains("Quantificational Logic Calculator info").click();
    cy.url().should("include", "/info/quantificational-logic");
    cy.go("back");

    cy.contains("Propositional Logic Calculator info").click();
    cy.url().should("include", "/info/propositional-logic");
    cy.go("back");

    cy.contains("Venn Diagram Generator info").click();
    cy.url().should("include", "/info/venn-diagram");
    cy.go("back");

    cy.contains("Truth Table Generator info").click();
    cy.url().should("include", "/info/truth-table");
    cy.go("back");

    cy.contains("Semantic Tableaux Generator info").click();
    cy.url().should("include", "/info/semantic-tableaux");
    cy.go("back");

    cy.contains("Propositional Logic Indirect Proof Generator info").click();
    cy.url().should("include", "/info/propositional-logic-indirect-proof");
    cy.go("back");
  });

  it("should navigate to the respected info page for all pages", () => {
    cy.visit("http://localhost:3000");
    cy.contains("OK").click(); // to hide the popup
    cy.contains("Quantificational Logic Calculator").click();
    cy.contains("info").click();
    cy.url().should("include", "/info/quantificational-logic");

    cy.contains("Home").click();
    cy.contains("Propositional Logic Calculator").click();
    cy.contains("info").click();
    cy.url().should("include", "/info/propositional-logic");

    cy.contains("Home").click();
    cy.contains("Logic Venn").click();
    cy.contains("info").click();
    cy.url().should("include", "/info/venn-diagram");

    cy.contains("Home").click();
    cy.contains("Truth Table Generator").click();
    cy.contains("info").click();
    cy.url().should("include", "/info/truth-table");

    cy.contains("Home").click();
    cy.contains("Semantic Tableaux Generator").click();
    cy.contains("info").click();
    cy.url().should("include", "/info/semantic-tableaux");

    cy.contains("Home").click();
    cy.contains("Propositional Logic Indirect Proof").click();
    cy.contains("info").click();
    cy.url().should("include", "/info/propositional-logic-indirect-proof");

    cy.contains("Home").click();
    cy.contains("MY LOGIC HUB");
  });
});
