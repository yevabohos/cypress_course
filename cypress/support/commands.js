import { main_page } from "../selectors/main_page";
import { sign_in_page } from "../selectors/sign_in_page";
import { sign_up_page } from "../selectors/sign_up_new_user";

Cypress.Commands.add("signup", (userName, password) => {

  cy.clearCookies();
  cy.intercept("POST", "/users").as("signup");
  cy.visit("/");
  cy.get(sign_in_page.signUp_link).click();
  cy.url().should("contain", "/signup");
  cy.get(sign_up_page.firstName).type("Day").should("have.value", "Day");
    cy.get(sign_up_page.lastName).type("Moon").should("have.value", "Moon");
    cy.get(sign_up_page.username).type(userName).should("have.value", userName);
    cy.get(sign_up_page.password).type(password).should("have.value", password);
    cy.get(sign_up_page.confirmPassword)
      .type(password)
      .should("have.value", password);
    cy.get(sign_up_page.signUp_button)
      .should("be.enabled")
      .click()
      .wait("@signup")
      .its("response.statusCode")
      .should("eq", 201);
});

Cypress.Commands.add("signin", (userName, password) => {

  cy.clearCookies();
  cy.intercept("POST", "/login").as("signin");
  cy.visit("/");
  cy.get(sign_in_page.username)
    .type(userName)
    .should("have.value", userName);
  cy.get(sign_in_page.password)
    .type(password)
    .should("have.value", password);
  cy.get(sign_in_page.signIn_button)
    .should("be.enabled")
    .click()
    .wait("@signin")
    .its("response.statusCode")
    .should("eq", 200);
  cy.url().should("not.contain", "/signin");
});

Cypress.Commands.add("onboarding", () => {

  cy.get(main_page.getStarted_window)
    .should("be.visible")
    .and("contain.text", "Get Started with Real World App");
  cy.get(main_page.getStartedNext_button).click();
  cy.get(main_page.onboarding_bankName)
    .type("My Bank")
    .should("have.value", "My Bank");
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

Cypress.Commands.add("logout", () => {

  cy.get(main_page.sidebar_logout).click();
  cy.url().should("contain", "signin");
});

        

 
