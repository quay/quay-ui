import {mock} from 'src/tests/fake-db/MockAxios';
import {AxiosRequestConfig} from 'axios';
import {ManifestByDigestResponse, Manifest} from 'src/resources/TagResource';

const manifest = {
  schemaVersion: 2,
  mediaType: 'application/vnd.oci.image.index.v1+json',
  manifests: [
    {
      digest:
        'sha256:3a8221b6b7780a7d5211f826dd35a24e31eadb507111deae66b0cfea7c52a824',
      size: 1000,
      platform: {
        architecture: 'ppc64le',
        os: 'linux',
      },
    },
    {
      digest:
        'sha256:6854f4ba26f34d1029d481024d3e03d87aaa2635389e6e38d8557e69184546f1',
      size: 2000,
      platform: {
        architecture: 'amd64',
        os: 'linux',
      },
    },
  ],
};

mock
  .onGet(/api\/v1\/repository\/testorg\/testrepo\/manifest\/.+/)
  .reply((request: AxiosRequestConfig) => {
    const manifestResponse: ManifestByDigestResponse = {
      digest: '',
      manifest_data: '',
      is_manifest_list: true,
    };
    const digest = request.baseURL.split('/').pop();
    manifestResponse.digest = digest;
    manifestResponse.manifest_data = JSON.stringify(manifest);
    return [200, manifestResponse];
  });
