/// <reference types="cypress" />

describe('Tag Details Page', () => {
  it('renders details', () => {
    cy.visit('/tag/user1/postgres/latest');
    cy.get('[data-testid="name"]').contains('latest').should('exist');
    cy.get('[data-testid="creation"]')
      .contains('Jan 19, 1970, 10:29 PM')
      .should('exist');
    cy.get('[data-testid="repository"]').contains('postgres').should('exist');
    cy.get('[data-testid="modified"]')
      .contains('Jun 2, 2022, 3:12 PM')
      .should('exist');
    cy.get('[data-testid="digest-clipboardcopy"]')
      .contains(
        'sha256:1234567890101112150f0d3de5f80a38f65a85e709b77fd24491253990f306be',
      )
      .should('exist');
    cy.get('[data-testid="size"]').contains('Unknown').should('exist');
    cy.get('[data-testid="vulnerabilities"]')
      .contains('12 High')
      .should('exist');
    cy.get('[data-testid="labels"]')
      .contains('version = 1.0.0')
      .should('exist');
    cy.get('[data-testid="labels"]')
      .contains('vendor = Redhat')
      .should('exist');
    cy.contains('Fetch Tag').should('exist');
    cy.get('[data-testid="copy-pull-commands"]').within(() => {
      cy.contains('Podman Pull (by tag)').should('exist');
      cy.get('input')
        .eq(0)
        .should(
          'have.value',
          'podman pull quay-ui.quaydev.org/user1/postgres:latest',
        );
      cy.contains('Docker Pull (by tag)').should('exist');
      cy.get('input')
        .eq(1)
        .should(
          'have.value',
          'docker pull quay-ui.quaydev.org/user1/postgres:latest',
        );
      cy.contains('Podman Pull (by digest)').should('exist');
      cy.get('input')
        .eq(2)
        .should(
          'have.value',
          'podman pull quay-ui.quaydev.org/user1/postgres@sha256:1234567890101112150f0d3de5f80a38f65a85e709b77fd24491253990f306be',
        );
      cy.contains('Docker Pull (by digest)').should('exist');
      cy.get('input')
        .eq(3)
        .should(
          'have.value',
          'docker pull quay-ui.quaydev.org/user1/postgres@sha256:1234567890101112150f0d3de5f80a38f65a85e709b77fd24491253990f306be',
        );
    });
  });

  it('switch to security report tab', () => {
    cy.visit('/tag/user1/postgres/latest');
    cy.get('button').contains('Security Report').click();
    cy.url().should('include', '/tag/user1/postgres/latest?tab=securityreport');
    cy.contains('Quay Security Reporting has detected 12 vulnerabilities');
  });

  it('switch to packages tab', () => {
    cy.visit('/tag/user1/postgres/latest');
    cy.get('button').contains('Packages').click();
    cy.url().should('include', '/tag/user1/postgres/latest?tab=packages');
    cy.contains('Quay Security Reporting has recognized 25 packages');
  });

  it('switch to security report tab via vulnerabilities field', () => {
    cy.visit('/tag/user1/postgres/latest');
    cy.get('a').contains('12 High').click();
    cy.url().should('include', '/tag/user1/postgres/latest?tab=securityreport');
    cy.contains('Quay Security Reporting has detected 12 vulnerabilities');
  });

  it('switch between architectures', () => {
    cy.visit(
      '/tag/user1/postgres/manifestlist?digest=sha256:ppc64lesubmanifest11f826dd35a24e31eadb507111deae66b0cfea7c52a824',
    );
    cy.get('[data-testid="name"]').contains('manifestlist').should('exist');
    cy.get('[data-testid="digest-clipboardcopy"]')
      .contains(
        'sha256:ppc64lesubmanifest11f826dd35a24e31eadb507111deae66b0cfea7c52a824',
      )
      .should('exist');
    cy.contains('Architecture').should('exist');
    cy.contains('linux on ppc64le').should('exist');
    cy.contains('linux on ppc64le').click();
    cy.contains('linux on amd64').click();
    cy.get('[data-testid="digest-clipboardcopy"]')
      .contains(
        'sha256:amd64submanifest11f34826dd35a24e31eadb507111deae66b0cfea7c52a824',
      )
      .should('exist');
  });
});
