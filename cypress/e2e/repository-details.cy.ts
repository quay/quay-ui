/// <reference types="cypress" />

describe('Repository Details Page', () => {
  it('renders tag', () => {
    cy.visit('/repositories/user1/postgres');
    const firstRow = cy.get('tbody').first();
    firstRow.within(() => {
      cy.get(`[data-label="Name"]`).should('have.text', 'latest');
      cy.get(`[data-label="Security"]`).should('have.text', '12 High');
      cy.get(`[data-label="Size"]`).should('have.text', '100 B');
      cy.get(`[data-label="Last Modified"]`).should(
        'have.text',
        'Jun 2, 2022, 3:12 PM',
      );
      cy.get(`[data-label="Expires"]`).should('have.text', 'Never');
      cy.get(`[data-label="Manifest"]`).should(
        'have.text',
        'sha256:123456789010',
      );
    });
  });

  it('renders manifest list tag', () => {
    cy.visit('/repositories/user1/postgres');
    const secondRow = cy.get('tbody').eq(1);
    secondRow.within(() => {
      // Assert values for top level row
      cy.get(`[data-label="Name"]`).should('have.text', 'manifestlist');
      cy.get(`[data-label="Security"]`).should(
        'have.text',
        'See Child Manifests',
      );
      cy.get(`[data-label="Size"]`).should('have.text', 'N/A');
      cy.get(`[data-label="Last Modified"]`).should(
        'have.text',
        'Jun 2, 2022, 3:12 PM',
      );
      cy.get(`[data-label="Expires"]`).should('have.text', 'Never');
      cy.get(`[data-label="Manifest"]`).should(
        'have.text',
        'sha256:abcdefghij37',
      );

      // Expand second row
      cy.get('tr').eq(1).should('not.be.visible');
      cy.get('tr').eq(2).should('not.be.visible');
      cy.get('button').first().click();
      cy.get('tr').eq(1).should('be.visible');
      cy.get('tr').eq(2).should('be.visible');

      // Assert values for first subrow
      cy.get('tr')
        .eq(1)
        .within(() => {
          cy.get(`[data-label="platform"]`).should(
            'have.text',
            'linux on ppc64le',
          );
          cy.get(`[data-label="security"]`).should(
            'have.text',
            'None Detected',
          );
          cy.get(`[data-label="size"]`).should('have.text', 'Unknown');
          cy.get(`[data-label="digest"]`).should(
            'have.text',
            'sha256:ppc64lesubma',
          );
        });

      // Assert values for second subrow
      cy.get('tr')
        .eq(2)
        .within(() => {
          cy.get(`[data-label="platform"]`).should(
            'have.text',
            'linux on amd64',
          );
          cy.get(`[data-label="security"]`).should('have.text', 'Queued');
          cy.get(`[data-label="size"]`).should('have.text', 'Unknown');
          cy.get(`[data-label="digest"]`).should(
            'have.text',
            'sha256:amd64submani',
          );
        });
    });
  });

  it('deletes tag', () => {
    cy.visit('/repositories/user1/postgres');
    cy.get('[name="checkrow0"]').click();
    cy.contains('Actions').click();
    cy.contains('Delete').click();
    cy.contains('Delete the following tag?').should('exist');
    cy.contains('Cancel').should('exist');
    cy.get('button').contains('Delete').should('exist');
    cy.get('button').contains('Delete').click();
    cy.contains('latest').should('not.exist');
  });

  it('bulk deletes tags', () => {
    cy.visit('/repositories/user1/postgres');
    cy.get('#toolbar-dropdown-checkbox').click();
    cy.get('button').contains('Select page (8)').click();
    cy.contains('Actions').click();
    cy.contains('Delete').click();
    cy.contains('Delete the following tags?').should('exist');
    cy.get('[data-testid="delete-tags-modal"]').within(() => {
      cy.contains('latest').should('exist');
      cy.contains('manifestlist').should('exist');
    });
    cy.contains('Note: This operation can take several minutes.').should(
      'exist',
    );
    cy.contains('Cancel').should('exist');
    cy.get('button').contains('Delete').should('exist');
    cy.get('button').contains('Delete').click();
    cy.contains('latest').should('not.exist');
    cy.contains('manifestlist').should('not.exist');
  });

  it('renders pull popover', () => {
    cy.visit('/repositories/user1/postgres');
    cy.get('td[data-label="Pull"')
      .first()
      .within(() => cy.get('svg').trigger('mouseover'));
    cy.get('[data-testid="pull-popover"]').within(() => {
      cy.contains('Fetch Tag').should('exist');
      cy.contains('Podman Pull (By Tag)').should('exist');
      cy.get('input')
        .eq(0)
        .should(
          'have.value',
          'podman pull quay-ui.quaydev.org/user1/postgres:latest',
        );
      cy.contains('Podman Pull (By Digest)').should('exist');
      cy.get('input')
        .eq(1)
        .should(
          'have.value',
          'podman pull quay-ui.quaydev.org/user1/postgres@sha256:1234567890101112150f0d3de5f80a38f65a85e709b77fd24491253990f306be',
        );
      cy.contains('Docker Pull (By Tag)').should('exist');
      cy.get('input')
        .eq(2)
        .should(
          'have.value',
          'docker pull quay-ui.quaydev.org/user1/postgres:latest',
        );
      cy.contains('Docker Pull (By Digest)').should('exist');
      cy.get('input')
        .eq(3)
        .should(
          'have.value',
          'docker pull quay-ui.quaydev.org/user1/postgres@sha256:1234567890101112150f0d3de5f80a38f65a85e709b77fd24491253990f306be',
        );
    });
  });

  it('clicking tag name goes to tag details page', () => {
    cy.visit('/repositories/user1/postgres');
    cy.get('a').contains('latest').click();
    cy.url().should('include', '/tag/user1/postgres/latest');
    cy.get('[data-testid="tag-details"]').within(() => {
      cy.contains('latest').should('exist');
      cy.contains(
        'sha256:1234567890101112150f0d3de5f80a38f65a85e709b77fd24491253990f306be',
      ).should('exist');
    });
  });

  it('clicking platform name goes to tag details page', () => {
    cy.visit('/repositories/user1/postgres');
    const secondRow = cy.get('tbody').eq(1);
    secondRow.within(() => {
      cy.get('button').first().click();
      cy.get('a').contains('linux on ppc64le').click();
    });
    cy.url().should(
      'include',
      '/tag/user1/postgres/manifestlist?digest=sha256:ppc64lesubmanifest11f826dd35a24e31eadb507111deae66b0cfea7c52a824',
    );
    cy.contains('linux on ppc64le').should('exist');
    cy.get('[data-testid="tag-details"]').within(() => {
      cy.contains('manifestlist').should('exist');
      cy.contains(
        'sha256:ppc64lesubmanifest11f826dd35a24e31eadb507111deae66b0cfea7c52a824',
      ).should('exist');
    });
  });

  it('clicking tag security data goes to security report page', () => {
    cy.visit('/repositories/user1/postgres');
    cy.contains('12 High').click();
    cy.url().should(
      'include',
      '/tag/user1/postgres/latest?tab=securityreport&digest=sha256:1234567890101112150f0d3de5f80a38f65a85e709b77fd24491253990f306be',
    );
    cy.contains(
      'Quay Security Reporting has detected 12 vulnerabilities',
    ).should('exist');
    cy.contains('latest').should('exist');
  });

  it('clicking platform security data goes to security report page', () => {
    cy.visit('/repositories/user1/postgres');
    const secondRow = cy.get('tbody').eq(1);
    secondRow.within(() => {
      cy.get('button').first().click();
      cy.get('a').contains('None Detected').click();
    });
    cy.url().should(
      'include',
      '/tag/user1/postgres/manifestlist?tab=securityreport&digest=sha256:ppc64lesubmanifest11f826dd35a24e31eadb507111deae66b0cfea7c52a824',
    );
    cy.contains('linux on ppc64le').should('exist');
    cy.contains(
      'Quay Security Reporting has detected no vulnerabilities',
    ).should('exist');
  });

  it('search by name', () => {
    cy.visit('/repositories/user1/postgres');
    cy.get('input[name="search input"]').type('test');
    cy.contains('latest').should('exist');
    cy.contains('manifestlist').should('not.exist');
  });

  it('search by manifest', () => {
    cy.visit('/repositories/user1/postgres');
    cy.get('#toolbar-dropdown-filter').click();
    cy.get('a').contains('Manifest').click();
    cy.get('input[name="search input"]').type('123456789');
    cy.contains('latest').should('exist');
    cy.contains('manifestlist').should('not.exist');
  });

  it('renders nested repositories', () => {
    cy.visit('/repositories/user1/nested/repository');
    cy.get('[data-testid="repo-title"]').within(() =>
      cy.contains('nested/repository').should('exist'),
    );
    cy.contains('latest').should('exist');
    cy.contains('manifestlist').should('exist');
  });
});
