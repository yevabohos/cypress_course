
export const transactions_page = {
  search_field: '[data-test="user-list-search-input"]',
  user_list: '[data-test="users-list"]',
  contacts_list_item: '[data-test*="user-list-item"]',
  amount_field: "#amount",
  amount_validation_message: "#transaction-create-amount-input-helper-text",
  note_field: "#transaction-create-description-input",
  note_validation_message: "#transaction-create-description-input-helper-text",
  request_button: '[data-test="transaction-create-submit-request"]',
  pay_button: '[data-test="transaction-create-submit-payment"]',
  transaction_requested_message:
    '[class="MuiTypography-root MuiTypography-h6 MuiTypography-colorPrimary MuiTypography-gutterBottom"]',
  transaction_paid_message:
    '[class="MuiTypography-root MuiTypography-h6 MuiTypography-colorPrimary MuiTypography-gutterBottom"]',
  create_another_transaction_button:
    '[data-test="new-transaction-create-another-transaction"]',
  return_button:
    '[class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSizeSmall MuiButton-sizeSmall"]',
  transactions_list: '[class="ReactVirtualized__Grid ReactVirtualized__List"]',

};