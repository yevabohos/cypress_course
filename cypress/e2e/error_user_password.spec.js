const { sign_in_page } = require("../selectors/sign_in_page");

describe("Invalid user or password", () => {
  before("visiting sign in page", () => {
    cy.visit("/");
  });

  it("should error for an invalid user", () => {
    cy.intercept("POST", "/login").as("signin");
    cy.visit("/");
    cy.get(sign_in_page.username)
      .type("hansolo")
      .should("have.value", "hansolo");
    cy.get(sign_in_page.password)
      .type("Great123!")
      .should("have.value", "Great123!");
    cy.get(sign_in_page.signIn_button)
      .should("be.enabled")
      .click()
      .wait("@signin")
      .its("response.statusCode")
      .should("eq", 401);
  });

    it("should error for an incorrect password", () => {
    cy.intercept("POST", "/login").as("signin");
    cy.visit("/");
    cy.get(sign_in_page.username)
      .type("missmaryday")
      .should("have.value", "missmaryday");
    cy.get(sign_in_page.password)
      .type("Great143!")
      .should("have.value", "Great143!");
    cy.get(sign_in_page.signIn_button)
      .should("be.enabled")
      .click()
      .wait("@signin")
      .its("response.statusCode")
      .should("eq", 401);
  });

})