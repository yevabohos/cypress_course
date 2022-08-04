const { sign_in_page } = require("../selectors/sign_in_page");

describe("[Sign in page] UI test", () => {
  beforeEach("visiting sign in page", () => {
    cy.visit("/");
  });

  it('should show "Real World App logo"', () => {
    cy.get(sign_in_page.logo_image)
      .should("be.visible")
      .and("have.attr", "xmlns", "http://www.w3.org/2000/svg");
  });

  it('should show "Sign in" title', () => {
    cy.get(sign_in_page.title_text)
      .should("be.visible")
      .and("have.text", "Sign in");
  });

  it("should show typeable Username field", () => {
    cy.get("#username").should("be.visible").type("username").clear();
  });

  it("should show typeable Password field", () => {
    cy.get("#password").should("be.visible").type("password").clear();
  });

  it("should show Username and Password placeholders", () => {
    cy.get("#username-label").should("have.text", "Username");
    cy.get("#password-label").should("have.text", "Password");
  });

  it("should show 'Username is required' error if a user clicks on it and then click outside this field and didn't enter any value", () => {
    cy.get("#username-helper-text").should("not.exist");
    cy.get("#username").click().blur();
    cy.get("#username-helper-text").should("have.text", "Username is required");
  });

  it('check "Remember me" checkbox', () => {
    cy.get(".PrivateSwitchBase-input-14")
      .should("not.be.checked")
      .check()
      .should("be.checked");
  });

  it("should show disabled by default sign in btn", () => {
    cy.get("#username").type("username");
    cy.get("btn").click().should("not.be.disabled"); // can't find the right way
  });

  it("should have 'Don't have an account? Sign Up' clickable link under 'Sign in' btn", () => {
    cy.get(
      "#root > div > main > div.makeStyles-paper-2 > form > div.MuiGrid-root.MuiGrid-container > div:nth-child(2) > a"
    )
      .should("have.text", "Don't have an account? Sign Up")
      .and("have.attr", "href", "/signup");
  });

  it("should show Cypress copyright link that leads to 'https://www.cypress.io/'", () => {
    cy.get(
      "#root > div > main > div.MuiBox-root.MuiBox-root-15 > div > p > a"
    ).should("have.attr", "href", "https://cypress.io");
  });
});
