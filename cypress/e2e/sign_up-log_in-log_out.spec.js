import { main_page } from "../selectors/main_page";
import { sign_in_page } from "../selectors/sign_in_page";
import { sign_up_page } from "../selectors/sign_up_new_user";

describe("Sign-up, sign-in, logout", () => {
  const password = "Great123!";

  before("Visit sign-up page", () => {
    cy.visit("/");
    cy.get(sign_up_page.signUp_link).click();
    cy.url().should("contain", "/signup");
  });

  it("should allow user to sign up", () => {
    cy.intercept("POST", "/users").as("signup");
    cy.get(sign_up_page.firstName).type("Mary").should("have.value", "Mary");
    cy.get(sign_up_page.lastName).type("Smith").should("have.value", "Smith");
    cy.get(sign_up_page.username)
      .type("missmaryday")
      .should("have.value", "missmaryday");
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
      .type("missmaryday")
      .should("have.value", "missmaryday");
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
});
