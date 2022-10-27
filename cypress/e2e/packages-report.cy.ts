/// <reference types="cypress" />

describe('Packages Report Page', () => {
  it('render packages', () => {
    cy.visit('/tag/quay/postgres/securityreportmixedvulns?tab=packages');
    cy.contains('Quay Security Reporting has recognized 49 packages');
    cy.contains('Patches are available for 30 vulnerabilities');
    cy.get('[data-testid="packages-chart"]').contains('49').should('exist');
    cy.get('td[data-label="Package Name"]').should('have.length', 10);
  });

  it('render no packages', () => {
    cy.visit('/tag/quay/postgres/packagesreportnopackages?tab=packages');
    cy.contains('Quay Security Reporting does not recognize any packages');
    cy.contains('No known patches are available');
    cy.get('[data-testid="packages-chart"]').contains('0').should('exist');
    cy.get('td[data-label="Package Name"]').should('have.length', 0);
  });

  it('filter by name', () => {
    cy.visit('/tag/quay/postgres/securityreportmixedvulns?tab=packages');
    cy.get('td[data-label="Package Name"]').should('have.length', 10);
    cy.get('input[placeholder="Filter Packages..."]').type('python');
    cy.get('td[data-label="Package Name"]').should('have.length', 7);
    cy.get('td[data-label="Package Name"]')
      .filter(':contains("python")')
      .should('have.length', 7);
  });

  // // TODO: UI needs to be implemented
  // it('render unsupported state', () => {
  //     cy.visit('/tag/quay/postgres/securityreportunsupported?tab=securityreport');
  // });

  // // TODO: UI needs to be implemented
  // it('render failed state', () => {
  //     cy.visit('/tag/quay/postgres/securityreportfailed?tab=securityreport');
  // });

  // // TODO: UI needs to be implemented
  // it('render queued state', () => {
  //     cy.visit('/tag/quay/postgres/securityreportqueued?tab=securityreport');
  // });

  it('paginate values', () => {
    cy.visit('/tag/quay/postgres/securityreportmixedvulns?tab=packages');
    cy.contains('1 - 10 of 49').should('exist');
    cy.get('td[data-label="Package Name"]').should('have.length', 10);

    // Change per page
    cy.get('button:contains("1 - 10 of 49")').first().click();
    cy.contains('20 per page').click();
    cy.get('td[data-label="Package Name"]').should('have.length', 20);

    // cycle through the pages
    cy.get('[id="packages-table-pagination"]').within(() =>
      cy.get('button[aria-label="Go to next page"]').click(),
    );
    cy.get('td[data-label="Package Name"]').should('have.length', 20);
    cy.get('[id="packages-table-pagination"]').within(() =>
      cy.get('button[aria-label="Go to next page"]').click(),
    );
    cy.get('td[data-label="Package Name"]').should('have.length', 9);

    // Go to first page
    cy.get('[id="packages-table-pagination"]').within(() =>
      cy.get('button[aria-label="Go to first page"]').click(),
    );
    cy.contains('libbz2').should('exist');

    // Go to last page
    cy.get('[id="packages-table-pagination"]').within(() =>
      cy.get('button[aria-label="Go to last page"]').click(),
    );
    cy.contains('click').should('exist');

    // Switch per page while while being on a different page
    cy.get('button:contains("41 - 49 of 49")').first().click();
    cy.contains('10 per page').click();
    cy.contains('1 - 10 of 49').should('exist');
    cy.get('td[data-label="Package Name"]').should('have.length', 10);
  });
});
