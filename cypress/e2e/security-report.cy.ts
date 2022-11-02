// /// <reference types="cypress" />

// describe('Security Report Page', () => {
//   it('render no vulnerabilities', () => {
//     cy.visit('/tag/quay/postgres/securityreportnovulns?tab=securityreport');
//     cy.contains(
//       'Quay Security Reporting has detected no vulnerabilities',
//     ).should('exist');
//     cy.get('[data-testid="vulnerability-chart"]').within(() =>
//       cy.contains('0'),
//     );
//     // TODO: we render an empty row event though the count is 0, need to update this
//     // test case when 'no vulns found' table state is implemented
//     cy.get('[data-testid="vulnerability-table"]')
//       .children()
//       .should('have.length', 2);
//   });

//   it('render mixed vulnerabilities', () => {
//     cy.visit('/tag/quay/postgres/securityreportmixedvulns?tab=securityreport');
//     cy.contains(
//       'Quay Security Reporting has detected 21 vulnerabilities',
//     ).should('exist');
//     cy.contains('Patches are available for 13 vulnerabilities').should('exist');
//     cy.get('[data-testid="vulnerability-chart"]').within(() =>
//       cy.contains('21'),
//     );
//     // 21 results but check for 22 because of header
//     cy.get('[data-testid="vulnerability-table"]')
//       .children()
//       .should('have.length', 22);
//     cy.get('[data-testid="vulnerability-table"]').within(() => {
//       cy.get('[data-label="Severity"]')
//         .get('span:contains("Critical")')
//         .should('have.length', 3);
//       cy.get('[data-label="Severity"]')
//         .get('span:contains("High")')
//         .should('have.length', 12);
//       cy.get('[data-label="Severity"]')
//         .get('span:contains("Medium")')
//         .should('have.length', 2);
//       cy.get('[data-label="Severity"]')
//         .get('span:contains("Low")')
//         .should('have.length', 2);
//       cy.get('[data-label="Severity"]')
//         .get('span:contains("Unknown")')
//         .should('have.length', 2);
//     });
//   });

//   it('only show fixable', () => {
//     cy.visit('/tag/quay/postgres/securityreportmixedvulns?tab=securityreport');
//     // 21 results but check for 22 because of header
//     cy.get('[data-testid="vulnerability-table"]')
//       .children()
//       .should('have.length', 22);
//     cy.get('#fixable-checkbox').click();
//     cy.get('[data-testid="vulnerability-table"]')
//       .children()
//       .should('have.length', 14);
//     cy.contains('(None)').should('not.exist');
//     cy.get('#fixable-checkbox').click();
//     cy.get('[data-testid="vulnerability-table"]')
//       .children()
//       .should('have.length', 22);
//   });

//   it('filter by name', () => {
//     cy.visit('/tag/quay/postgres/securityreportmixedvulns?tab=securityreport');
//     cy.get('[data-testid="vulnerability-table"]')
//       .children()
//       .should('have.length', 22);
//     cy.get('input[placeholder="Filter Vulnerabilities..."]').type('pyup.io');
//     cy.get('[data-testid="vulnerability-table"]')
//       .children()
//       .should('have.length', 9);
//     cy.get('td[data-label="Advisory"]')
//       .filter(':contains("pyup.io")')
//       .should('have.length', 8);
//   });

//   // // TODO: UI needs to be implemented
//   // it('render unsupported state', () => {
//   //     cy.visit('/tag/quay/postgres/securityreportunsupported?tab=securityreport');
//   // });

//   // // TODO: UI needs to be implemented
//   // it('render failed state', () => {
//   //     cy.visit('/tag/quay/postgres/securityreportfailed?tab=securityreport');
//   // });

//   // // TODO: UI needs to be implemented
//   // it('render queued state', () => {
//   //     cy.visit('/tag/quay/postgres/securityreportqueued?tab=securityreport');
//   // });

//   // // TODO: UI needs to be implemented
//   // it('paginate values', () => {
//   //     cy.visit('/tag/quay/postgres/securityreportqueued?tab=securityreport');
//   // });
// });
