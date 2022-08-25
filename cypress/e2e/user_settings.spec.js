import { functions } from "../helpers/generate_username";
import { main_page } from "../selectors/main_page";
import { sign_in_page } from "../selectors/sign_in_page";
import { user_settings } from "../selectors/user_settings";

const userName = functions.generateUsername();
const password = "Great123!";

describe("Update user settings", () => {
  before("Set-up your User", () => {
    cy.signup(userName, password);
    cy.signin(userName, password);
    cy.onboarding();
    cy.logout();
  }); 

  beforeEach("Login", () => {
    cy.signin(userName, password);
    cy.get(main_page.sidebar_myAccount).click();
    cy.url().should("contain", "/user/settings");
    cy.intercept("PATCH", "/users/*").as("updateUser");
  });

  it("Should render the user settings form", () => {
    cy.get(user_settings.firstName_input).should("be.visible");
    cy.get(user_settings.lastName_input).should("be.visible");
    cy.get(user_settings.email_input).should("be.visible");
    cy.get(user_settings.phoneNumber_input).should("be.visible");
  });

  it("Should display user setting form errors", () => {
    cy.get(user_settings.firstName_input).clear().blur();
    cy.get(user_settings.firstName_validation_message)
      .should("be.visible")
      .and("have.text", "Enter a first name");
    cy.get(user_settings.lastName_input).clear().blur();
    cy.get(user_settings.lastName_validation_message)
      .should("be.visible")
      .and("have.text", "Enter a last name");
    cy.get(user_settings.email_input).clear().blur();
    cy.get(user_settings.email_validation_message)
      .should("be.visible")
      .and("have.text", "Enter an email address");
    cy.get(user_settings.phoneNumber_input).clear().blur();
    cy.get(user_settings.phoneNumber_validation_message)
      .should("be.visible")
      .and("have.text", "Enter a phone number");
    cy.get(user_settings.submit_button).should("be.disabled");
    cy.get(user_settings.email_input).clear().type("Test-type");
    cy.get(user_settings.email_validation_message)
      .should("be.visible")
      .and("have.text", "Must contain a valid email address");
    cy.get(user_settings.phoneNumber_input).clear().type("+3214");
    cy.get(user_settings.phoneNumber_validation_message)
      .should("be.visible")
      .and("have.text", "Phone number is not valid");
    cy.get(user_settings.submit_button).should("be.disabled");
  });

  it("User should be able to update all settings in once", () => {
    cy.get(user_settings.firstName_input).clear().type("Sunny");
    cy.get(user_settings.lastName_input).clear().type("August");
    cy.get(user_settings.email_input).type("testqa.e071j@gmail.com");
    cy.get(user_settings.phoneNumber_input).type("123987456");
    cy.get(user_settings.submit_button)
      .click();
    cy.get(user_settings.firstName_input).should("have.value", "Sunny");
    cy.get(user_settings.lastName_input).should("have.value", "August");
    cy.get(user_settings.email_input).should(
      "have.value",
      "testqa.e071j@gmail.com"
    );
    cy.get(user_settings.phoneNumber_input).should("have.value", "123987456");
      
  });

  it("User should be able to update first name", () => {
    cy.get(user_settings.firstName_input).clear().type("James");
    cy.get(user_settings.lastName_input).should("have.value", "August");
    cy.get(user_settings.email_input).should(
      "have.value",
      "testqa.e071j@gmail.com"
    );
    cy.get(user_settings.phoneNumber_input).should("have.value", "123987456");
    cy.get(user_settings.submit_button).should("not.be.disabled");
    cy.get(user_settings.submit_button)
      .click()
      
  });

  it("User should be able to update last name", () => {
    cy.get(user_settings.lastName_input)
      .clear()
      .type("Zoo")
      .should("have.value", "Zoo");
    cy.get(user_settings.submit_button).click();
  });

  it("User should be able to update email", () => {
    cy.get(user_settings.email_input).clear().type("tqa.90634@gmail.com");
    cy.get(user_settings.submit_button)
      .click();
  });

  it("User should be able to update phone number", () => {
    cy.get(user_settings.phoneNumber_input).clear().type("0987654321");
    cy.get(user_settings.submit_button)
      .click();
  });

});
