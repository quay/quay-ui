/// <reference types="cypress" />

describe('Repositories List Page', () => {
  it('renders list of all repositories', () => {
    cy.visit('/repositories');
    cy.contains('Repositories').should('exist');
    cy.get('[data-testid="repository-list-table"]')
      .children()
      .should('have.length', 7);
    cy.get('[data-testid="repository-list-table"]').within(() => {
      cy.contains('user1/postgres').should('exist');
      cy.contains('user1/nested/repository').should('exist');
      cy.contains('quay/postgres').should('exist');
      cy.contains('testorg/postgres').should('exist');
      cy.contains('testorg/redis').should('exist');
    });
  });

  it('renders list of repositories for a single organization', () => {
    cy.visit('/organizations/quay');
    cy.get('[data-testid="repo-title"]').within(() => cy.contains('quay'));
    cy.get('[data-testid="repository-list-table"]')
      .children()
      .should('have.length', 3);
    cy.get('[data-testid="repository-list-table"]').within(() => {
      cy.contains('postgres').should('exist');
      cy.contains('python').should('exist');
      cy.contains('busybox').should('exist');
    });
  });

  it('create public repository', () => {
    cy.visit('/repositories');
    cy.get('button').contains('Create Repository').click();
    cy.contains('Create repository').should('exist');
    cy.contains('Select namespace').click();
    cy.get('button').contains('quay').click();
    cy.get('input[id="repository-name-input"]').type('new-repo');
    cy.get('input[id="repository-description-input"]').type(
      'This is a new public repository',
    );
    cy.get('[id="create-repository-modal"]').within(() =>
      cy.get('button:contains("Create")').click(),
    );
    cy.contains('new-repo').should('exist');
    cy.get('tr:contains("new-repo")').within(() =>
      cy.contains('public').should('exist'),
    );
  });

  it('create private repository', () => {
    cy.visit('/repositories');
    cy.get('button').contains('Create Repository').click();
    cy.contains('Create repository').should('exist');
    cy.contains('Select namespace').click();
    cy.get('button').contains('quay').click();
    cy.get('input[id="repository-name-input"]').type('new-repo');
    cy.get('input[id="repository-description-input"]').type(
      'This is a new private repository',
    );
    cy.get('input[id="PRIVATE"]').click();
    cy.get('[id="create-repository-modal"]').within(() =>
      cy.get('button:contains("Create")').click(),
    );
    cy.contains('new-repo').should('exist');
    cy.get('tr:contains("new-repo")').within(() =>
      cy.contains('private').should('exist'),
    );
  });

  it('create repository under organization', () => {
    cy.visit('/organizations/quay');
    cy.get('button').contains('Create Repository').click();
    cy.contains('Create repository').should('exist');
    cy.get('button:contains("quay")').should('exist');
    cy.get('input[id="repository-name-input"]').type('new-repo');
    cy.get('input[id="repository-description-input"]').type(
      'This is a new private repository',
    );
    cy.get('input[id="PRIVATE"]').click();
    cy.get('[id="create-repository-modal"]').within(() =>
      cy.get('button:contains("Create")').click(),
    );
    cy.contains('new-repo').should('exist');
    cy.get('tr:contains("new-repo")').within(() =>
      cy.contains('private').should('exist'),
    );
  });

  it('deletes multiple repositories', () => {
    cy.visit('/repositories');
    cy.get('button[id="toolbar-dropdown-checkbox"]').click();
    cy.contains('Select page').click();
    cy.contains('Actions').click();
    cy.contains('Delete').click();
    cy.contains('Permanently delete repositories?');
    cy.contains(
      'This action deletes all repositories and cannot be recovered.',
    );
    cy.contains('Confirm deletion by typing "confirm" below:');
    cy.get('input[id="delete-confirmation-input"]').type('confirm');
    cy.get('[id="bulk-delete-modal"]').within(() =>
      cy.get('button:contains("Delete")').click(),
    );
    cy.contains('There are no viewable repositories').should('exist');
    cy.contains(
      'Either no repositories exist yet or you may not have permission to view any. If you have permission, try creating a new repository.',
    ).should('exist');
    cy.contains('Create Repository');
  });

  // TODO: per page currently does not work
  // https://issues.redhat.com/browse/PROJQUAY-4663
  // it('deletes repositories pagination', () => {
  //     cy.visit('/organizations/manyrepositories');
  //     cy.get('button[id="toolbar-dropdown-checkbox"]').click();
  //     cy.contains('Select all').click();
  //     cy.contains('Actions').click();
  //     cy.contains('Delete').click();
  // })

  it('makes multiple repositories public', () => {
    cy.visit('/repositories');
    cy.get('button[id="toolbar-dropdown-checkbox"]').click();
    cy.contains('Select page (7)').click();
    cy.contains('Actions').click();
    cy.contains('Make Public').click();
    cy.contains('Make repositories public');
    cy.contains(
      'Update 7 repositories visibility to be public so they are visible to all user, and may be pulled by all users.',
    );
    cy.contains('Make public').click();
    cy.contains('private').should('not.exist');
  });

  it('makes multiple repositories private', () => {
    cy.visit('/repositories');
    cy.get('button[id="toolbar-dropdown-checkbox"]').click();
    cy.contains('Select page (7)').click();
    cy.contains('Actions').click();
    cy.contains('Make Private').click();
    cy.contains('Make repositories private');
    cy.contains(
      'Update 7 repositories visibility to be private so they are only visible to certain users, and only may be pulled by certain users.',
    );
    cy.contains('Make private').click();
    cy.contains('public').should('not.exist');
  });

  it('searches by name', () => {
    cy.visit('/repositories');
    cy.get('input[placeholder="Search by Name..."]').type('postgres');
    cy.get('td[data-label="Name"]')
      .filter(':contains("postgres")')
      .should('have.length', 3);
  });

  it('searches by name including organization', () => {
    cy.visit('/repositories');
    cy.get('input[placeholder="Search by Name..."]').type('user1');
    cy.get('td[data-label="Name"]')
      .filter(':contains("user1")')
      .should('have.length', 2);
  });

  it('paginates repositories', () => {
    cy.visit('/organizations/manyrepositories');
    cy.contains('1 - 10 of 50').should('exist');
    cy.get('td[data-label="Name"]').should('have.length', 10);

    // Change per page
    cy.get('button:contains("1 - 10 of 50")').first().click();
    cy.contains('20 per page').click();
    cy.get('td[data-label="Name"]').should('have.length', 20);

    // cycle through the pages
    cy.get('button[aria-label="Go to next page"]').first().click();
    cy.get('td[data-label="Name"]').should('have.length', 20);
    cy.get('button[aria-label="Go to next page"]').first().click();
    cy.get('td[data-label="Name"]').should('have.length', 10);

    // Go to first page
    cy.get('button[aria-label="Go to first page"]').first().click();
    cy.contains('repo0').should('exist');

    // Go to last page
    cy.get('button[aria-label="Go to last page"]').first().click();
    cy.contains('repo49').should('exist');

    // Switch per page while while being on a different page
    cy.get('button:contains("41 - 50 of 50")').first().click();
    cy.contains('10 per page').click();
    cy.contains('1 - 10 of 50').should('exist');
    cy.get('td[data-label="Name"]').should('have.length', 10);
  });
});
