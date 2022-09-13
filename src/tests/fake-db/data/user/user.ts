import {AxiosRequestConfig} from 'axios';
import {mock} from 'src/tests/fake-db/MockAxios';

const response = {
  anonymous: false,
  username: 'syahmed',
  avatar: {
    name: 'syed',
    hash: 'd27382531c5b7ec00bbec3865cea775',
    color: '#17becf',
    kind: 'user',
  },
  can_create_repo: true,
  is_me: true,
  verified: true,
  email: 'syahmed@redhat.com',
  logins: [
    {
      service: 'rhsso',
      service_identifier:
        'f:9f97392e-a27f-4e15-91ae-81da814b530f:syahmed@redhat.com',
      metadata: {
        service_username: 'syahmed',
      },
    },
  ],
  invoice_email: false,
  invoice_email_address: null,
  preferred_namespace: false,
  tag_expiration_s: 1209600,
  prompts: [],
  super_user: true,
  company: '',
  family_name: null,
  given_name: null,
  location: null,
  is_free_account: true,
  has_password_set: true,
  organizations: [
    {
      name: 'quay',
      avatar: {
        name: 'quay',
        hash: '641eefcb35fec8d5622b495879a91653',
        color: '#2ca02c',
        kind: 'org',
      },
      can_create_repo: true,
      public: false,
      is_org_admin: true,
      preferred_namespace: true,
    },
    {
      name: 'projectquay',
      avatar: {
        name: 'projectquay',
        hash: 'f203c4cdecd4445765750deafa7d589d',
        color: '#17becf',
        kind: 'org',
      },
      can_create_repo: true,
      public: false,
      is_org_admin: true,
      preferred_namespace: false,
    },
    {
      name: 'redhat_emp1',
      avatar: {
        name: 'redhat_emp1',
        hash: 'c14d7c707b2e793ce37f63440593e308',
        color: '#aec7e8',
        kind: 'org',
      },
      can_create_repo: true,
      public: false,
      is_org_admin: true,
      preferred_namespace: true,
    },
    {
      name: 'syedorg',
      avatar: {
        name: 'syedorg',
        hash: 'f1b1a80e240c78db3eb6ead7a10f4647',
        color: '#1f77b4',
        kind: 'org',
      },
      can_create_repo: true,
      public: false,
      is_org_admin: true,
      preferred_namespace: false,
    },
    {
      name: 'syedorg3',
      avatar: {
        name: 'syedorg3',
        hash: '8f043a0e130eb1b9b291f3c8e51230da',
        color: '#c7c7c7',
        kind: 'org',
      },
      can_create_repo: true,
      public: false,
      is_org_admin: true,
      preferred_namespace: false,
    },
    {
      name: 'testorg1234',
      avatar: {
        name: 'testorg1234',
        hash: '80d7b15766626006f56d6dbbcb831767',
        color: '#969696',
        kind: 'org',
      },
      can_create_repo: true,
      public: false,
      is_org_admin: true,
      preferred_namespace: false,
    },
  ],
};

mock.onGet('/api/v1/user/').reply((request: AxiosRequestConfig) => {
  return [200, response];
});

const superUserUsersResponse = {
  users: [
    {
      username: 'syed',
    },
    {
      username: 'dconnor',
    },
    {
      username: 'jonathankingfc',
    },
    {
      username: 'bcaton',
    },
  ],
};

mock.onGet('/api/v1/superuser/users/').reply((request: AxiosRequestConfig) => {
  return [200, superUserUsersResponse];
});
