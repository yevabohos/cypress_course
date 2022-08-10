import { main_page } from "../selectors/main_page";
import { functions } from "../helpers/generate_username";
import { sign_in_page } from "../selectors/sign_in_page";
import { sign_up_page } from "../selectors/sign_up_new_user";

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
})

    describe("Sign-up, sign-in, logout", () => {
    const userName = functions.generateUsername();
    const password = "Great123!";
      
    before("Visit sign-up page", () => {
    cy.visit("/");
    cy.get(sign_in_page.signUp_link).click();
    cy.url().should("contain", "/signup");
  });

  it("should allow user to sign up", () => {
    cy.intercept("POST", "/users").as("signup");
    cy.get(sign_up_page.firstName).type("Mary").should("have.value", "Mary");
    cy.get(sign_up_page.lastName).type("Smith").should("have.value", "Smith");
    cy.get(sign_up_page.username)
      .type(userName)
      .should("have.value", userName);
    cy.get(sign_up_page.password).type(password).should("have.value", password);
    cy.get(sign_up_page.confirmPassword)
      .type(password)
      .should("have.value", password);
    cy.get(sign_up_page.confirmPassword_validation_message).should("not.exist");
    cy.get(sign_up_page.signUp_button)
      .should("be.enabled")
      .click()
      .wait("@signup")
      .its("response.statusCode")
      .should("eq", 201);
  });

  it("should allow a visitor to login", () => {
    cy.intercept("POST", "/login").as("signin");
    cy.visit("/");
    cy.get(sign_in_page.username)
      .type(userName)
      .should("have.value", userName);
    cy.get(sign_in_page.password).type(password).should("have.value", password);
    cy.get(sign_in_page.signIn_button)
      .should("be.enabled")
      .click()
      .wait("@signin")
      .its("response.statusCode")
      .should("eq", 200);
  });

  it("should allow user to complete onboarding flow", () => {
    cy.get(main_page.getStartedNext_button).click();
    cy.get(main_page.onboarding_bankName)
      .type("Test-Bank")
      .should("have.value", "Test-Bank");
    cy.get(main_page.onboarding_routingNumber)
      .type("123456789")
      .should("have.value", "123456789");
    cy.get(main_page.onboarding_accountNumber)
      .type("123456789")
      .should("have.value", "123456789");
    cy.get(main_page.onboarding_submit_button).click();
    cy.get(main_page.onboarding_success_window)
      .should("be.visible")
      .and("contain.text", "Finished");
    cy.get(main_page.getStartedNext_button).click();
    cy.get(main_page.getStarted_window).should("not.exist");
  });

  it("should allow a visitor to logout", () => {
    cy.intercept("POST", "/logout").as("logout");
    cy.get(main_page.logout).click();
    cy.url().should("contain", "signin");
  });

  it("should display login errors", () => {
    cy.get(sign_in_page.username).type("missmaryday");
    cy.get(sign_in_page.password).type("01").blur();
    cy.get(sign_in_page.password_validation_message)
      .should("be.visible")
      .and("have.text", "Password must contain at least 4 characters");
  });

  it("should display signup errors", () => {
    cy.visit("/");
    cy.get(sign_in_page.signUp_link).click();
    cy.url().should("contain", "/signup");
    cy.intercept("POST", "/users").as("signup");
    cy.get(sign_up_page.firstName).type("Mary").should("have.value", "Mary");
    cy.get(sign_up_page.lastName).type("Smith").should("have.value", "Smith");
    cy.get("#username").click().blur();
    cy.get("#username-helper-text").should(
      "have.text",
      "Username is required"
    );
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
  })
})