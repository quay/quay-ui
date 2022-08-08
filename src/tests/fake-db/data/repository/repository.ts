import {AxiosRequestConfig} from 'axios';
import {mock} from 'src/tests/fake-db/MockAxios';

const syahmedResponse = {
  repositories: [
    {
      namespace: 'syahmed',
      name: 'postgres',
      description: null,
      is_public: false,
      kind: 'image',
      state: 'NORMAL',
      quota_report: {
        quota_bytes: 132459661,
        configured_quota: 104857600,
      },
      last_modified: 1656432090,
      popularity: 0.0,
      is_starred: false,
    },
  ],
};

const quayResponse = {
  repositories: [
    {
      namespace: 'quay',
      name: 'postgres',
      description: null,
      is_public: false,
      kind: 'image',
      state: 'NORMAL',
      quota_report: {
        quota_bytes: 132459661,
        configured_quota: 104857600,
      },
      last_modified: 1656428008,
      popularity: 0.0,
      is_starred: false,
    },
  ],
};

const projectquayResponse = {
  repositories: [],
};

const redhatemp1Response = {
  repositories: [
    {
      namespace: 'redhatemp1',
      name: 'redis',
      description: null,
      is_public: false,
      kind: 'image',
      state: 'NORMAL',
      quota_report: {
        quota_bytes: 42329739,
        configured_quota: 1073741824,
      },
      last_modified: 1653495945,
      popularity: 0.0,
      is_starred: false,
    },
  ],
};

const syedorgResponse = {
  repositories: [
    {
      namespace: 'syedorg',
      name: 'nginx',
      description: null,
      is_public: false,
      kind: 'image',
      state: 'NORMAL',
      quota_report: {
        quota_bytes: 56737142,
        configured_quota: 104857600,
      },
      last_modified: 1656433701,
      popularity: 7.0,
      is_starred: false,
    },
    {
      namespace: 'syedorg',
      name: 'python',
      description: null,
      is_public: false,
      kind: 'image',
      state: 'NORMAL',
      quota_report: {
        quota_bytes: 0,
        configured_quota: 104857600,
      },
      last_modified: null,
      popularity: 2.0,
      is_starred: false,
    },
  ],
};

const syedorg3Response = {
  repositories: [
    {
      namespace: 'syedorg3',
      name: 'postgres',
      description: null,
      is_public: false,
      kind: 'image',
      state: 'NORMAL',
      quota_report: {
        quota_bytes: 132459661,
        configured_quota: 104857600,
      },
      last_modified: 1656433136,
      popularity: 2.0,
      is_starred: false,
    },
  ],
};

const testorg1234Response = {
  repositories: [
    {
      namespace: 'testorg1234',
      name: 'redis',
      description: null,
      is_public: false,
      kind: 'image',
      state: 'NORMAL',
      quota_report: {
        quota_bytes: 0,
        configured_quota: 104857600,
      },
      last_modified: null,
      popularity: 1.0,
      is_starred: false,
    },
    {
      namespace: 'testorg1234',
      name: 'postgres',
      description: null,
      is_public: false,
      kind: 'image',
      state: 'NORMAL',
      quota_report: {
        quota_bytes: 132459661,
        configured_quota: 104857600,
      },
      last_modified: 1656426723,
      popularity: 1.0,
      is_starred: false,
    },
    {
      namespace: 'testorg1234',
      name: 'blah-blah12',
      description: 'blah-blah',
      is_public: true,
      kind: 'image',
      state: 'NORMAL',
      quota_report: {
        quota_bytes: 0,
        configured_quota: 104857600,
      },
      last_modified: null,
      popularity: 1.0,
      is_starred: false,
    },
  ],
};

const response = {
  namespace: 'quay',
  name: 'testrepo',
  kind: 'image',
};

const successResponse = {
  success: true,
};

mock
  .onGet('/api/v1/repository?last_modified=true&namespace=syahmed')
  .reply((request: AxiosRequestConfig) => {
    return [200, syahmedResponse];
  });

mock
  .onGet('/api/v1/repository?last_modified=true&namespace=quay')
  .reply((request: AxiosRequestConfig) => {
    return [200, quayResponse];
  });

mock
  .onGet('/api/v1/repository?last_modified=true&namespace=projectquay')
  .reply((request: AxiosRequestConfig) => {
    return [200, projectquayResponse];
  });

mock
  .onGet('/api/v1/repository?last_modified=true&namespace=redhat_emp1')
  .reply((request: AxiosRequestConfig) => {
    return [200, redhatemp1Response];
  });

mock
  .onGet('/api/v1/repository?last_modified=true&namespace=syedorg')
  .reply((request: AxiosRequestConfig) => {
    return [200, syedorgResponse];
  });

mock
  .onGet('/api/v1/repository?last_modified=true&namespace=syedorg3')
  .reply((request: AxiosRequestConfig) => {
    return [200, syedorg3Response];
  });

mock
  .onGet('/api/v1/repository?last_modified=true&namespace=testorg1234')
  .reply((request: AxiosRequestConfig) => {
    return [200, testorg1234Response];
  });

mock.onPost('/api/v1/repository').reply((request: AxiosRequestConfig) => {
  const {namespace, repository, visibility, description, repo_kind} =
    JSON.parse(request.data);
  return [200, successResponse];
});

const visibilityPathRegex = new RegExp(
  `/api/v1/repository/.+/.+/changevisibility`,
);
mock.onPost(visibilityPathRegex).reply((request: AxiosRequestConfig) => {
  const {visibility} = JSON.parse(request.data);
  return [200, successResponse];
});

const deleteRepoRegex = new RegExp(`/api/v1/repository/.+/.+`);
mock.onDelete(deleteRepoRegex).reply((request: AxiosRequestConfig) => {
  return [200, successResponse];
});
