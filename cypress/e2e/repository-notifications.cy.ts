/// <reference types="cypress" />

describe('Repository Settings - Notifications', () => {
  beforeEach(() => {
    cy.exec('npm run quay:seed');
    cy.request('GET', `${Cypress.env('REACT_QUAY_APP_API_URL')}/csrf_token`)
      .then((response) => response.body.csrf_token)
      .then((token) => {
        cy.loginByCSRF(token);
      });
    // Enable the repository settings feature
    cy.intercept('GET', '/config', (req) =>
      req.reply((res) => {
        res.body.features['UI_V2_REPO_SETTINGS'] = true;
        res.body.features['MAILING'] = true;
        return res;
      }),
    ).as('getConfig');
    cy.visit('/repository/testorg/testrepo?tab=settings');
    cy.contains('Events and notifications').click();
  });

  it('Renders notifications', () => {
    const flowdockRow = cy.get('tr:contains("(Untitled)")');
    flowdockRow.within(() => {
      cy.get(`[data-label="title"]`).should('have.text', '(Untitled)');
      cy.get(`[data-label="event"]`).should('have.text', 'Image build failed');
      cy.get(`[data-label="notification"]`).should(
        'have.text',
        'Flowdock Team Notification',
      );
      cy.get(`[data-label="status"]`).should('have.text', 'Enabled');
    });
    const hipchatRow = cy.get('tr:contains("hipchat-notification")');
    hipchatRow.within(() => {
      cy.get(`[data-label="title"]`).should(
        'have.text',
        'hipchat-notification',
      );
      cy.get(`[data-label="event"]`).should('have.text', 'Image build queued');
      cy.get(`[data-label="notification"]`).should(
        'have.text',
        'HipChat Room Notification',
      );
      cy.get(`[data-label="status"]`).should('have.text', 'Enabled');
    });
    const slackRow = cy.get('tr:contains("slack-notification")');
    slackRow.within(() => {
      cy.get(`[data-label="title"]`).should('have.text', 'slack-notification');
      cy.get(`[data-label="event"]`).should(
        'have.text',
        'Package Vulnerability Found',
      );
      cy.get(`[data-label="notification"]`).should(
        'have.text',
        'Slack Notification',
      );
      cy.get(`[data-label="status"]`).should(
        'have.text',
        'Disabled due to 3 failed attempts in a row',
      );
    });
    const webhookRow = cy.get('tr:contains("webhook-notification")');
    webhookRow.within(() => {
      cy.get(`[data-label="title"]`).should(
        'have.text',
        'webhook-notification',
      );
      cy.get(`[data-label="event"]`).should(
        'have.text',
        'Repository mirror started',
      );
      cy.get(`[data-label="notification"]`).should('have.text', 'Webhook POST');
      cy.get(`[data-label="status"]`).should(
        'have.text',
        'Disabled due to 3 failed attempts in a row',
      );
    });
    const emailRow = cy.get('tr:contains("email-notification")');
    emailRow.within(() => {
      cy.get(`[data-label="title"]`).should('have.text', 'email-notification');
      cy.get(`[data-label="event"]`).should(
        'have.text',
        'Repository mirror successful',
      );
      cy.get(`[data-label="notification"]`).should(
        'contain.text',
        'Email Notification',
      );
      cy.get(`[data-label="notification"]`).should(
        'contain.text',
        'email: user1@redhat.com',
      );
      cy.get(`[data-label="status"]`).should(
        'have.text',
        'Disabled due to 3 failed attempts in a row',
      );
    });
  });

  it('Inline tests notification', () => {
    const flowdockRow = cy.get('tr:contains("(Untitled)")');
    flowdockRow.within(() => {
      cy.get('[data-label="kebab"]').within(() => cy.get('button').click());
      cy.contains('Test Notification').click();
    });
    cy.contains('Test Notification Queued').should('exist');
    cy.contains(
      'A test version of this notification has been queued and should appear shortly',
    ).should('exist');
  });

  it('Inline enables notification', () => {
    const emailRow = cy.get('tr:contains("email-notification")');
    emailRow.within(() => {
      cy.get('[data-label="kebab"]').within(() => cy.get('button').click());
      cy.contains('Enable Notification').click();
      cy.get(`[data-label="status"]`).should('have.text', 'Enabled');
    });
  });

  it('Inline deletes notification', () => {
    const emailRow = cy.get('tr:contains("email-notification")');
    emailRow.within(() => {
      cy.get('[data-label="kebab"]').within(() => cy.get('button').click());
      cy.contains('Delete Notification').click();
      cy.contains('email-notification').should('not.exist');
    });
  });

  it('Bulk enables notification', () => {
    cy.get('#notifications-select-all').click();
    cy.contains('Actions').click();
    cy.contains('Enable').click();
    cy.contains('Disabled due to 3 failed attempts in a row').should(
      'not.exist',
    );
  });

  it('Bulk deletes notification', () => {
    cy.get('#notifications-select-all').click();
    cy.contains('Actions').click();
    cy.contains('Delete').click();
    cy.contains('No notifications found');
    cy.contains('No notifications have been setup for this repository');
  });

  // TODO: Need notifications in the header
  // to be implemented first
  // it('Creates quay notification',()=>{
  //     cy.contains('Create Notification').click();
  //     cy.get('#create-notification-form').within(()=>{
  //         cy.contains('Select event').click();
  //         cy.contains('Push to Repository').click();
  //         cy.contains('Select method').click();
  //         cy.contains('Red Hat Quay Notification').click();
  //         cy.get('#entity-search-select-typeahead').type('user2');
  //         cy.contains('user2').click();
  //         cy.get('#notification-title').type('newnotification');
  //         cy.contains('Submit').click();
  //     })
  //     const newnotificationRow = cy.get('tr:contains("newnotification")');
  //     newnotificationRow.within(()=>{
  //         cy.get(`[data-label="title"]`).should('have.text', 'newnotification');
  //         cy.get(`[data-label="event"]`).should('have.text', 'Push to Repository');
  //         cy.get(`[data-label="notification"]`).should('contain.text', 'Red Hat Quay Notification');
  //         cy.get(`[data-label="status"]`).should('have.text', 'Enabled');
  //     })
  // });

  it('Creates Flowdock notification', () => {
    cy.contains('Create Notification').click();
    cy.get('#create-notification-form').within(() => {
      cy.contains('Select event').click();
      cy.contains('Push to Repository').click();
      cy.contains('Select method').click();
      cy.contains('Flowdock Team Notification').click();
      cy.get('#flowdock-api-token-field').type('testtoken');
      cy.get('#notification-title').type('newnotification');
      cy.contains('Submit').click();
    });
    const newnotificationRow = cy.get('tr:contains("newnotification")');
    newnotificationRow.within(() => {
      cy.get(`[data-label="title"]`).should('have.text', 'newnotification');
      cy.get(`[data-label="event"]`).should('have.text', 'Push to Repository');
      cy.get(`[data-label="notification"]`).should(
        'contain.text',
        'Flowdock Team Notification',
      );
      cy.get(`[data-label="status"]`).should('have.text', 'Enabled');
    });
  });

  it('Creates Hipchat notification', () => {
    cy.contains('Create Notification').click();
    cy.get('#create-notification-form').within(() => {
      cy.contains('Select event').click();
      cy.contains('Push to Repository').click();
      cy.contains('Select method').click();
      cy.contains('HipChat Room Notification').click();
      cy.get('#room-id-number-field').type('12345');
      cy.get('#room-notification-token-field').type('testtoken');
      cy.get('#notification-title').type('newnotification');
      cy.contains('Submit').click();
    });
    const newnotificationRow = cy.get('tr:contains("newnotification")');
    newnotificationRow.within(() => {
      cy.get(`[data-label="title"]`).should('have.text', 'newnotification');
      cy.get(`[data-label="event"]`).should('have.text', 'Push to Repository');
      cy.get(`[data-label="notification"]`).should(
        'contain.text',
        'HipChat Room Notification',
      );
      cy.get(`[data-label="status"]`).should('have.text', 'Enabled');
    });
  });

  it('Creates Slack notification', () => {
    cy.contains('Create Notification').click();
    cy.get('#create-notification-form').within(() => {
      cy.contains('Select event').click();
      cy.contains('Push to Repository').click();
      cy.contains('Select method').click();
      cy.contains('Slack Notification').click();
      cy.get('#slack-webhook-url-field').type(
        'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
      );
      cy.get('#notification-title').type('newnotification');
      cy.contains('Submit').click();
    });
    const newnotificationRow = cy.get('tr:contains("newnotification")');
    newnotificationRow.within(() => {
      cy.get(`[data-label="title"]`).should('have.text', 'newnotification');
      cy.get(`[data-label="event"]`).should('have.text', 'Push to Repository');
      cy.get(`[data-label="notification"]`).should(
        'contain.text',
        'Slack Notification',
      );
      cy.get(`[data-label="status"]`).should('have.text', 'Enabled');
    });
  });

  it('Creates Webhook notification', () => {
    cy.contains('Create Notification').click();
    cy.get('#create-notification-form').within(() => {
      cy.contains('Select event').click();
      cy.contains('Push to Repository').click();
      cy.contains('Select method').click();
      cy.contains('Webhook POST').click();
      cy.get('#webhook-url-field').type('https://doesnotexist');
      cy.get('#json-body-field').type('{"foo":"bar"}', {
        parseSpecialCharSequences: false,
      });
      cy.get('#notification-title').type('newnotification');
      cy.contains('Submit').click();
    });
    const newnotificationRow = cy.get('tr:contains("newnotification")');
    newnotificationRow.within(() => {
      cy.get(`[data-label="title"]`).should('have.text', 'newnotification');
      cy.get(`[data-label="event"]`).should('have.text', 'Push to Repository');
      cy.get(`[data-label="notification"]`).should(
        'contain.text',
        'Webhook POST',
      );
      cy.get(`[data-label="status"]`).should('have.text', 'Enabled');
    });
  });

  // We're mocking this workflow because of the complexity in
  // implementing the email auth flow in the CI
  it('Creates email notification', () => {
    const responses = [
      {
        email: 'user2@redhat.com',
        repository: 'testrepo',
        namespace: 'testorg',
        confirmed: false,
      },
      {
        email: 'user2@redhat.com',
        repository: 'testrepo',
        namespace: 'testorg',
        confirmed: false,
      },
      {
        email: 'user2@redhat.com',
        repository: 'testrepo',
        namespace: 'testorg',
        confirmed: true,
      },
    ];
    cy.intercept(
      'GET',
      '/api/v1/repository/testorg/testrepo/authorizedemail/user2@redhat.com',
      (req) => req.reply((res) => res.send(200, responses.shift())),
    ).as('getAuthorizedEmail');
    cy.intercept(
      'POST',
      '/api/v1/repository/testorg/testrepo/authorizedemail/user2@redhat.com',
      {},
    ).as('sendConfirmationEmail');
    cy.intercept(
      'POST',
      '/api/v1/repository/testorg/testrepo/notification/',
      {},
    ).as('createNotification');
    cy.contains('Create Notification').click();
    cy.get('#create-notification-form').within(() => {
      cy.contains('Select event').click();
      cy.contains('Push to Repository').click();
      cy.contains('Select method').click();
      cy.contains('Email Notification').click();
      cy.get('#notification-email').type('user2@redhat.com');
      cy.get('#notification-title').type('newnotification');
      cy.contains('Submit').click();
    });
    cy.contains('Email Authorization').should('exist');
    cy.contains(
      'The email address user2@redhat.com has not been authorized to recieve notifications from this repository. Please click ‘Send Authorized Email‘ to start the authorization process.',
    ).should('exist');
    cy.get('button').contains('Send Authorized Email').click();
    cy.contains(
      'An email has been sent to user2@redhat.com. Please click the link contained in the email.',
    ).should('exist');
    cy.wait('@createNotification', {timeout: 20000});
    cy.get('@createNotification')
      .its('request.body')
      .should('deep.equal', {
        config: {
          email: 'user2@redhat.com',
        },
        event: 'repo_push',
        eventConfig: {},
        event_config: {},
        method: 'email',
        title: 'newnotification',
      });
  });
});
