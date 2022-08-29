import { main_page } from "../selectors/main_page";
import { sign_in_page } from "../selectors/sign_in_page";
import { sign_up_page } from "../selectors/sign_up_new_user";

const apiUrl = "http://localhost:3001";

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
    cy.get(sign_in_page.username , {timeout: 10000}).should('be.visible').click({ force: true })
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

  Cypress.Commands.add("switchUser", (userName, password) => {
     cy.logout();
     cy.signin(userName, password);
   });     

  
   Cypress.Commands.add("signin_api", (userName, password) => {
    cy.request("POST", `${apiUrl}/login`, {
      username: userName,
      password: password,
    });
  });

  Cypress.Commands.add("signup_api", (userName, password) => {
    cy.request("POST", `${apiUrl}/users`, {
      firstName: "Day",
      lastName: "Moon",
      username: userName,
      password: password,
      confirmPassword: password,
    });
  });

  Cypress.Commands.add("logout_api", () => {
    cy.request("POST", `${apiUrl}/logout`);
  });

  Cypress.Commands.add("loginByXstate", (username, password = "s3cret") => {
      const log = Cypress.log({
        name: "loginbyxstate",
        displayName: "LOGIN BY XSTATE",
        message: [`🔐 Authenticating | ${username}`],
        autoEnd: false,
      });
      cy.intercept("POST", "/login").as("loginUser");
      cy.intercept("GET", "/checkAuth").as("getUserProfile");
      cy.visit("/signin", { log: false });
      cy.window({ log: false }).then((win) =>
        win.authService.send("LOGIN", { username, password })
      );
      cy.url().should("not.contain", "/signin");
        return cy
          .get('[data-test="list-skeleton"]')
          .should("not.exist")
          .then(() => {
            log.snapshot("after");
            log.end();
          });
      });

  Cypress.Commands.add(
    "create_bank_account_API",
    (bankName, accountNumber, routingNumber) => {
      cy.request("POST", `${apiUrl}/bankAccounts`, {
        bankName,
        accountNumber,
        routingNumber,
      }).should((response) => {
        expect(response.status).to.eq(200);
      });
  });

  Cypress.Commands.add("delete_bank_account_API", (bankAccountId) => {
    cy.request("DELETE", `${apiUrl}/bankAccounts/${bankAccountId}`).should(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });

  Cypress.Commands.add("add_contact_API", (userId) => {
    cy.request("POST", `${apiUrl}/contacts`, {
      contactUserId: userId,
    }).should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  Cypress.Commands.add("delete_contact_API", (userId) => {
    cy.request("DELETE", `${apiUrl}/contacts/${userId}`).should((response) => {
      expect(response.status).to.eq(200);
    });
  });


