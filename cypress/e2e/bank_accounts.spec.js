import { functions } from "../helpers/generate_username";
import { bankAccount_page } from "../selectors/bankAccount_page";
import { main_page } from "../selectors/main_page";

describe ("Manipulation with bank account", () => {
  const userName = functions.generateUsername();
  const password = "Great123!";

  before("Set-up your User", () => {
    cy.signup(userName, password);
    cy.signin(userName, password);
    cy.onboarding();
    cy.logout();
  });

  it("user should be able to delete a bank account", () => {
    cy.signin(userName, password);
    cy.get(main_page.sidebar_bankAccounts).click();
    cy.url().should("contain", "bankaccounts");
    cy.get(bankAccount_page.deleteBank_button).click().should("have.text", "Delete");
    cy.logout();
  });
  
  it("allows user to create new bank account", () => {
    cy.signin(userName, password);
    cy.get(main_page.sidebar_bankAccounts).click();
    cy.url().should("contain", "bankaccounts");
    cy.get(bankAccount_page.createBank_button).click();
    cy.url().should("contain", "new");
    cy.get(bankAccount_page.bankName).type("QA-Test");
    cy.get(bankAccount_page.routingNumber).type("123456789");
    cy.get(bankAccount_page.accountNumber).type("123456789");
    cy.get(bankAccount_page.submit_button).should("be.enabled").click();
    cy.get(bankAccount_page.bank_list).should("contain", "QA-Test");
  });

  it("should display Create Bank Account form", () => {
    cy.get(main_page.sidebar_bankAccounts).click();
    cy.url().should("contain", "bankaccounts");
    cy.get(bankAccount_page.createBank_button).click();
    cy.url().should("contain", "new");
    cy.get(bankAccount_page.createBankForm_title)
      .should("be.visible")
      .and("have.text", "Create Bank Account");
    cy.get(bankAccount_page.bankName)
      .should("be.visible")
      .and("have.attr", "placeholder", "Bank Name");
    cy.get(bankAccount_page.routingNumber)
      .should("be.visible")
      .and("have.attr", "placeholder", "Routing Number");
    cy.get(bankAccount_page.accountNumber)
      .should("be.visible")
      .and("have.attr", "placeholder", "Account Number");
    cy.get(bankAccount_page.submit_button).should("be.visible");
  });

    it("should display bank account form errors", () => {
    cy.get(bankAccount_page.bankName).type("qa").blur();
    cy.get(bankAccount_page.bankName_validation_message)
        .should("be.visible")
        .and("have.text", "Must contain at least 5 characters");
    cy.get(bankAccount_page.routingNumber).clear().type("123").blur();
    cy.get(bankAccount_page.routingNumber_validation_message)
        .should("be.visible")
        .and("have.text", "Must contain a valid routing number");
    cy.get(bankAccount_page.routingNumber).clear().type("1234567890").blur();
    cy.get(bankAccount_page.routingNumber_validation_message)
        .should("be.visible")
        .and("have.text", "Must contain a valid routing number");
  });
});





