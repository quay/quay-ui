import {mock} from 'src/tests/fake-db/MockAxios';
import {SecurityDetailsResponse} from 'src/resources/TagResource';

const securityResponse: SecurityDetailsResponse = {
  status: 'queued',
  data: {
    Layer: {
      Name: '',
      ParentName: '',
      NamespaceName: '',
      IndexedByVersion: 1,
      Features: [],
    },
  },
};

mock
  .onGet(
    /api\/v1\/repository\/testorg\/testrepo\/manifest\/.+\/security\?vulnerabilities=true/,
  )
  .reply(() => {
    return [200, securityResponse];
  });
