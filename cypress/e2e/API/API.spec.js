import { functions } from "../../helpers/generate_username";

const username = functions.generateUsername();
const password = "Great123!";
const bankName = "QA-Test";
const accountNumber = "123456789";
const routingNumber = "123456789";

let bankAccountId = "";
let userId = "f657fheos";

describe("Manipulations with bank account by API", () => {
  before("Set-up your account", () => {
    cy.signup_api(username, password);
  });

  beforeEach("Login by API", () => {
    cy.signin_api(username, password);
  });

    it("Create bank account", () => {
        cy.create_bank_account_API(bankName, accountNumber, routingNumber).then(
        (response) => {
            bankAccountId = response.body.account.id;
        });
    });

    it("Delete bank account", () => {
        cy.delete_bank_account_API(bankAccountId);
    });

    it("Add contact", () => {
        cy.add_contact_API(userId);
    });

    it("Delete contact", () => {
        cy.delete_contact_API(userId);
    });
});