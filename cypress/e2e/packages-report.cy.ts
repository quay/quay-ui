/// <reference types="cypress" />

describe('Packages Report Page', () => {
  it('render packages', () => {
    cy.visit('/tag/quay/postgres/securityreportmixedvulns?tab=packages');
    cy.contains('Quay Security Reporting has recognized 33 packages');
    cy.contains('Patches are available for 13 vulnerabilities');
    cy.get('[data-testid="packages-chart"]').contains('33').should('exist');
    cy.get('table[data-testid="packages-table"]')
      .children()
      .should('have.length', 34);
  });

  it('render no packages', () => {
    cy.visit('/tag/quay/postgres/packagesreportnopackages?tab=packages');
    cy.contains('Quay Security Reporting does not recognize any packages');
    cy.contains('No known patches are available');
    cy.get('[data-testid="packages-chart"]').contains('0').should('exist');
    cy.get('table[data-testid="packages-table"]')
      .children()
      .should('have.length', 2);
  });

  it('filter by name', () => {
    cy.visit('/tag/quay/postgres/securityreportmixedvulns?tab=packages');
    cy.get('table[data-testid="packages-table"]')
      .children()
      .should('have.length', 34);
    cy.get('input[placeholder="Filter Packages..."]').type('lib');
    cy.get('[data-testid="packages-table"]')
      .children()
      .should('have.length', 15);
    cy.get('td[data-label="Package Name"]')
      .filter(':contains("lib")')
      .should('have.length', 14);
  });

  it('render unsupported state', () => {
    cy.visit('/tag/quay/postgres/securityreportunsupported?tab=packages');
    cy.contains('Security scan is not supported.');
    cy.contains('Image does not have content the scanner recognizes.');
  });

  it('render failed state', () => {
    cy.visit('/tag/quay/postgres/securityreportfailed?tab=packages');
    cy.contains('Security scan has failed.');
    cy.contains('The scan could not be completed due to error.');
  });

  it('render queued state', () => {
    cy.visit('/tag/quay/postgres/securityreportqueued?tab=packages');
    cy.contains('Security scan is currently queued.');
    cy.contains('Refresh page for updates in scan status.');
    cy.contains('Reload');
  });

  // // TODO: UI needs to be implemented
  // it('paginate values', () => {
  //     cy.visit('/tag/quay/postgres/securityreportqueued?tab=securityreport');
  // });
});
