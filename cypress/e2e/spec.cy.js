/* eslint-disable no-undef */
/// <reference types="cypress" />
describe('Perform a full e2e test', () => {
  it('should visit the URL and fetch the article list, then click on the first article and verify the article page', () => {
    cy.visit('/');
    cy.get('[data-testid=article-link]').eq(0).should('exist').click();
    cy.url().should('include', `${Cypress.env('APP_DOMAIN')}/article/`);
    cy.get('[data-testid=article-title]').should('exist');
    cy.get('[data-testid=article-image]').should('exist');
    cy.get('[data-testid=article-description]').should('exist');
    cy.get('[data-testid=article-read-more]').should('exist');
  });
});
