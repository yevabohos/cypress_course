import { main_page } from "../selectors/main_page";
import { transactions_page } from "../selectors/transactions_page"; 

describe("Transactions view", () => {

const password = "s3cret";

const userA = {
  username: "Allie2",
  name: "Kaylin Homenick",
};

const userB = {
  username: "Katharina_Bernier",
  name: "Edgar Johns",
};
const userC = {
  username: "Jessyca.Kuhic",
  name: "Devon Becker",
};

  it("transactions navigation tabs should be hidden on a transaction view page", () => {
    cy.signin(userA.username, password);
    cy.get(main_page.transactions_table)
      .contains("Kaylin Homenick requested Arely Kertzmann")
      .click({ force: true });
    cy.get(main_page.transaction_info)
      .should("be.visible")
      .and("have.text", "Transaction Detail");
    cy.get(main_page.everyone_home).should("not.exist");
    cy.get(main_page.friends_home).should("not.exist");
    cy.get(main_page.mine_home).should("not.exist");
  });

 it("User should be able to like a transaction", () => {
    cy.switchUser(userB.username, password);
    cy.get(main_page.new_transaction_button).click();
    cy.get(transactions_page.user_list)
      .should("be.visible")
      .contains("Allie2")
      .click({ force: true });
    cy.get(transactions_page.amount_field).click().type("145");
    cy.get(transactions_page.note_field).click().type("Nice");
    cy.get(transactions_page.pay_button).click(); 
    cy.switchUser(userA.username, password);
    cy.get(main_page.mine_home).click();
    cy.get(main_page.transactions_table)
      .contains("Edgar Johns paid Kaylin Homenick")
      .click({ force: true });
    cy.get(main_page.transaction_info)
      .should("be.visible")
      .and("have.text", "Transaction Detail");
    cy.get(main_page.like_button).click();
  });

it("User should be able to comment on a transaction", () => {
   cy.switchUser(userC.username, password);
   cy.get(main_page.new_transaction_button).click();
   cy.get(transactions_page.user_list)
     .should("be.visible")
     .contains("Allie2")
     .click({ force: true });
   cy.get(transactions_page.amount_field).click().type("180");
   cy.get(transactions_page.note_field).click().type("Good");
   cy.get(transactions_page.pay_button).click(); 
  cy.switchUser(userA.username, password);
  cy.get(main_page.mine_home).click();
  cy.get(main_page.transactions_table)
    .contains("Devon Becker paid Kaylin Homenick")
    .click({ force: true });
  cy.get(main_page.transaction_info)
    .should("be.visible")
    .and("have.text", "Transaction Detail");
  cy.get(main_page.comment_input).type("Hello there!").type("{enter}");
});

 it("User should be able to accept a transaction request", () => {
   cy.switchUser(userB.username, password);
   cy.get(main_page.new_transaction_button).click();
   cy.get(transactions_page.user_list)
     .should("be.visible")
     .contains("Allie2")
     .click({ force: true });
   cy.get(transactions_page.amount_field).click().type("380");
   cy.get(transactions_page.note_field).click().type("Present");
   cy.get(transactions_page.request_button).click();
   cy.switchUser(userA.username, password);
   cy.get(main_page.mine_home).click();
   cy.get(main_page.transactions_table).contains("Edgar Johns requested Kaylin Homenick").click({ force: true });
   cy.get(main_page.transaction_info).should("contain.text", "Transaction Detail");
   cy.get(main_page.accept_request_button).should("be.enabled").click();
 });

 it("User should be able to accept a transaction request", () => {
   cy.switchUser(userC.username, password);
   cy.get(main_page.new_transaction_button).click();
   cy.get(transactions_page.user_list)
     .should("be.visible")
     .contains("Allie2")
     .click({ force: true });
   cy.get(transactions_page.amount_field).click().type("465");
   cy.get(transactions_page.note_field).click().type("For Help");
   cy.get(transactions_page.request_button).click();
   cy.switchUser(userA.username, password);
   cy.get(main_page.mine_home).click();
   cy.get(main_page.transactions_table).contains("Devon Becker requested Kaylin Homenick").click({ force: true });
   cy.get(main_page.transaction_info).should("contain.text", "Transaction Detail");
   cy.get(main_page.reject_request_button).should("be.enabled").click();
 });

it("Accept/reject buttons shouldn't exist on completed request", () => {
  cy.switchUser(userA.username, password);
  cy.get(main_page.new_transaction_button).click();
  cy.get(transactions_page.user_list)
    .should("be.visible")
    .contains("Katharina_Bernier")
    .click({ force: true });
  cy.get(transactions_page.amount_field).click().type("45");
  cy.get(transactions_page.note_field).click().type("Use for dinner");
  cy.get(transactions_page.request_button).click();
  cy.switchUser(userB.username, password);
  cy.get(main_page.mine_home).click();
  cy.get(main_page.transactions_table)
    .contains("Kaylin Homenick requested Edgar Johns")
    .click({ force: true });
  cy.get(main_page.transaction_info).should(
    "contain.text",
    "Transaction Detail"
  );
  cy.get(main_page.accept_request_button).should("be.enabled").click();
  cy.get(main_page.accept_request_button).should("not.exist");
  cy.get(main_page.reject_request_button).should("not.exist");
});
})