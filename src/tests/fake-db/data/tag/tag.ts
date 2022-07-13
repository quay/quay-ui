import {mock} from 'src/tests/fake-db/MockAxios';
import {AxiosRequestConfig} from 'axios';
import {TagsResponse, Tag} from 'src/resources/TagResource';

const testTag: Tag = {
  name: 'testtag',
  is_manifest_list: false,
  last_modified: 'Thu, 02 Jun 2022 19:12:32 -0000',
  size: 100,
  manifest_digest:
    'sha256:ad6562704f3759fb50f0d3de5f80a38f65a85e709b77fd24491253990f30b6be',
  reversion: false,
  start_ts: 1654197152,
  manifest_list: null,
};

const manifestListTag: Tag = {
  name: 'manifestlist',
  is_manifest_list: true,
  last_modified: 'Thu, 02 Jun 2022 19:12:32 -0000',
  size: 100,
  manifest_digest:
    'sha256:ad6562704f3759fb50f0d3de5f80a38f65a85e709b77fd24491253990f30b6be',
  reversion: false,
  start_ts: 1654197152,
  manifest_list: {
    schemaVersion: 2,
    mediaType: '',
    manifests: [],
  },
};

mock
  .onGet(
    /api\/v1\/repository\/testorg\/testrepo\/tag\/\?limit=100&page=1&onlyActiveTags=true&specificTag=.+/,
  )
  .reply((request: AxiosRequestConfig) => {
    const tagResponse: TagsResponse = {
      page: 1,
      has_additional: false,
      tags: [],
    };
    const searchParams = new URLSearchParams(request.url);
    switch (searchParams.get('specificTag')) {
      case 'testtag':
        tagResponse.tags.push(testTag);
        break;
      case 'manifestlist':
        tagResponse.tags.push(manifestListTag);
    }
    return [200, tagResponse];
  });

mock
  .onGet(
    '/api/v1/repository/testorg/testrepo/tag/?limit=100&page=1&onlyActiveTags=true',
  )
  .reply(() => {
    const tagResponse: TagsResponse = {
      page: 1,
      has_additional: false,
      tags: [],
    };
    tagResponse.tags.push(testTag);
    tagResponse.tags.push(manifestListTag);
    return [200, tagResponse];
  });
