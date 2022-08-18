import { functions } from "../helpers/generate_username";
import { main_page } from "../selectors/main_page";
import { sign_in_page } from "../selectors/sign_in_page";
import { transactions_page } from "../selectors/transactions_page";

describe("Manipulations with Transactions", () => {
  const userName = functions.generateUsername();
  const password = "Great123!";

  before("Set-up your User", () => {
    cy.signup(userName, password);
    cy.signin(userName, password);
    cy.onboarding();
    cy.logout();
  });

  it("user should be able to make a new payment", () => {
    cy.signin(userName, password);
    cy.get(main_page.new_transaction_button).click();
    cy.get(transactions_page.user_list)
      .should("be.visible")
      .contains("Kaylin Homenick")
      .click({ force: true });
    cy.get(transactions_page.amount_field).click().type("100");
    cy.get(transactions_page.note_field).click().type("All good");
    cy.get(transactions_page.pay_button).click();
  });

  it("user should be able to make a new request", () => {
    cy.get(transactions_page.create_another_transaction_button).click();
    cy.get(transactions_page.user_list)
      .should("be.visible")
      .contains("Kaylin Homenick")
      .click({ force: true });
    cy.get(transactions_page.amount_field).click().type("50");
    cy.get(transactions_page.note_field).click().type("Verified your request");
    cy.get(transactions_page.request_button).click();
  });

  it("displays new transaction errors", () => {
    cy.get(transactions_page.create_another_transaction_button).click();
    cy.get(transactions_page.user_list)
      .should("be.visible")
      .contains("Kaylin Homenick")
      .click({ force: true });
    cy.get(transactions_page.amount_field).clear().blur();
    cy.get(transactions_page.note_field).clear().blur();
    cy.get(transactions_page.amount_validation_message)
      .should("be.visible")
      .and("have.text", "Please enter a valid amount");
    cy.get(transactions_page.note_validation_message)
      .should("be.visible")
      .and("have.text", "Please enter a note");
    cy.get(transactions_page.pay_button).should("be.disabled");
    cy.get(transactions_page.request_button).should("be.disabled");
    cy.logout();
  });

  it("verifies the deposit for the receiver", () => {
    cy.intercept("POST", "/login").as("signin");
    cy.visit("/");
    cy.get(sign_in_page.username).click().type("Allie2");
    cy.get(sign_in_page.password).click().type("s3cret");
    cy.get(sign_in_page.signIn_button).click();
    cy.get(main_page.mine_home).click();
    cy.url().should("contain", "personal");
    cy.get(transactions_page.transactions_list).should("contain.text", 'All good');
    cy.logout();
    });

    it("searches for a user by attribute", () => {
        cy.signin(userName, password);
        cy.get(main_page.new_transaction_button).click();
        cy.get(transactions_page.search_field).type("Katharina_Bernier");
        cy.get(transactions_page.user_list).should("contain.text", "Edgar Johns");
});
})