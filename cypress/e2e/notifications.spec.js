import { main_page } from "../selectors/main_page";
import { transactions_page } from "../selectors/transactions_page";

const password = "s3cret";
const transactionAmount = "100";

const userA = {
  username: "Allie2",
  name: "Kaylin Homenick",
};

const userB = {
  username: "Katharina_Bernier",
  name: "Edgar Johns",
};

const userC = {
  username: "Tavares_Barrows",
  name: "Arely Kertzmann",
};
// 1. When user A likes a transaction of user B, user B should get notification that user A liked transaction
it("When user A likes a transaction of user B, user B should get notification that user A liked transaction", () => {
   cy.signin(userB.username, password);
   cy.get(main_page.new_transaction_button).click();
   cy.get(transactions_page.user_list)
     .should("be.visible")
     .contains("Allie2")
     .click({ force: true });
   cy.get(transactions_page.amount_field).click().type("500");
   cy.get(transactions_page.note_field).click().type("Thanks");
   cy.get(transactions_page.pay_button).click();
   cy.switchUser(userA.username, password);
   cy.get(main_page.mine_home).click();
   cy.get(main_page.transactions_table).contains("Edgar Johns paid Kaylin Homenick").click({ force: true });
   cy.get(main_page.transaction_info).should("be.visible").and("have.text", "Transaction Detail");
   cy.get(main_page.like_button).click();
   cy.switchUser(userB.username, password);
   cy.get(main_page.notification_button).click();
   cy.url().should("contain", "/notifications");
   cy.get(main_page.notifications_list).contains("Kaylin Homenick liked a transaction");
 });
// 2. When user C likes a transaction between user A and user B, user A and user B should get notifications that user C liked transaction
it("When user C likes a transaction between user A and user B, user A and user B should get notifications that user C liked transaction", () => {
  cy.switchUser(userC.username, password);
  cy.get(main_page.transactions_table)
  .contains("Edgar Johns paid Kaylin Homenick")
  .click({ force: true });
  cy.get(main_page.transaction_info)
    .should("be.visible")
    .and("have.text", "Transaction Detail");
  cy.get(main_page.like_button).click();
  cy.switchUser(userA.username, password);
  cy.get(main_page.notification_button).click();
  cy.url().should("contain", "/notifications");
  cy.get(main_page.notifications_list).contains(
    "Arely Kertzmann liked a transaction."
  );
    cy.switchUser(userB.username, password);
    cy.get(main_page.notification_button).click();
    cy.url().should("contain", "/notifications");
    cy.get(main_page.notifications_list).contains(
      "Arely Kertzmann liked a transaction"
    );
});
// 3. When user A comments on a transaction of user B, user B should get notification that User A commented on their transaction
it("When user A comments on a transaction of user B, user B should get notification that User A commented on their transaction", () => {
  cy.switchUser(userA.username, password);
  cy.get(main_page.mine_home).click();
  cy.get(main_page.transactions_table)
    .contains("Edgar Johns paid Kaylin Homenick")
    .click({ force: true });
  cy.get(main_page.transaction_info)
    .should("be.visible")
    .and("have.text", "Transaction Detail");
  cy.get(main_page.comment_input).type("August").type('{enter}');
  cy.switchUser(userB.username, password);
  cy.get(main_page.notification_button).click();
  cy.url().should("contain", "/notifications");
  cy.get(main_page.notifications_list).contains(
    "Kaylin Homenick commented on a transaction."
  );
});
// 4. When user C comments on a transaction between user A and user B, user A and B should get notifications that user C commented on their transaction
it("When user C comments on a transaction between user A and user B, user A and B should get notifications that user C commented on their transaction", () => {
  cy.switchUser(userC.username, password);
  cy.get(main_page.everyone_home).click();
  cy.get(main_page.transactions_table)
    .contains("Edgar Johns paid Kaylin Homenick")
    .click({ force: true });
  cy.get(main_page.transaction_info)
    .should("be.visible")
    .and("have.text", "Transaction Detail");
  cy.get(main_page.comment_input).type("Comment from me").type("{enter}");
  cy.switchUser(userB.username, password);
  cy.get(main_page.notification_button).click();
  cy.url().should("contain", "/notifications");
  cy.get(main_page.notifications_list).contains(
    "Arely Kertzmann commented on a transaction."
  );
  cy.switchUser(userA.username, password);
  cy.get(main_page.notification_button).click();
  cy.url().should("contain", "/notifications");
  cy.get(main_page.notifications_list).contains(
    "Arely Kertzmann commented on a transaction."
  );
});
// 5. When user A sends a payment to user B, user B should be notified of payment
it("When user A sends a payment to user B, user B should be notified of payment", () => {
   cy.switchUser(userA.username, password);
   cy.get(main_page.new_transaction_button).click();
   cy.get(transactions_page.user_list)
     .should("be.visible")
     .contains("Katharina_Bernier")
     .click({ force: true });
   cy.get(transactions_page.amount_field).click().type("20");
   cy.get(transactions_page.note_field).click().type("New payment");
   cy.get(transactions_page.pay_button).click();
  cy.switchUser(userB.username, password);
  cy.get(main_page.notification_button).click();
  cy.url().should("contain", "/notifications");
  cy.get(main_page.notifications_list).contains("Edgar Johns received payment.");
});
// 6. When user A sends a payment request to user C, user C should be notified of request from user A
it("When user A sends a payment request to user C, user C should be notified of request from user A", () => {
  cy.switchUser(userA.username, password);
  cy.get(main_page.new_transaction_button).click();
  cy.get(transactions_page.user_list)
    .should("be.visible")
    .contains("Tavares_Barrows")
    .click({ force: true });
  cy.get(transactions_page.amount_field).click().type("70");
  cy.get(transactions_page.note_field).click().type("Request");
  cy.get(transactions_page.request_button).click();
  cy.switchUser(userB.username, password);
  cy.get(main_page.notification_button).click();
  cy.url().should("contain", "/notifications");
  cy.get(main_page.notifications_list).contains(
    "Kaylin Homenick requested payment."
  );
});