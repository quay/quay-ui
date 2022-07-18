import {render, screen, fireEvent} from '@testing-library/react';
import {within} from '@testing-library/dom';
import {RecoilRoot} from 'recoil';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {mocked} from 'ts-jest/utils';
import prettyBytes from 'pretty-bytes';
import TagDetails from './TagDetails';
import {
  Tag,
  TagsResponse,
  getTags,
  getManifestByDigest,
  Manifest,
} from 'src/resources/TagResource';
import {formatDate} from 'src/libs/utils';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('src/resources/TagResource', () => ({
  getTags: jest.fn(),
  getManifestByDigest: jest.fn(),
  getSecurityDetails: jest.fn(),
  deleteTag: jest.fn(),
}));

const createTagResponse = (): TagsResponse => {
  return {
    page: 1,
    has_additional: false,
    tags: [],
  };
};
const createTag = (name = 'latest'): Tag => {
  return {
    name: name,
    is_manifest_list: false,
    last_modified: 'Thu, 02 Jun 2022 19:12:32 -0000',
    size: 100,
    manifest_digest: 'sha256:fd0922d',
    reversion: false,
    start_ts: 1654197152,
    manifest_list: null,
  };
};

type Test = {
  testId: string;
  name?: string;
  value: string | number;
};

const checkFieldValues = async (tests: Test[]) => {
  for (const test of tests) {
    const field = await screen.findByTestId(test.testId);
    expect(within(field).getByText(test.name)).toBeTruthy();
    expect(await within(field).findByText(test.value)).toBeTruthy();
  }
};

const checkClipboardValues = async (tests: Test[]) => {
  for (const test of tests) {
    const clipboardCopy = (
      await screen.findByTestId(test.testId)
    ).querySelector('input');
    expect(clipboardCopy.value).toBe(test.value);
  }
};

test('Render simple tag', async () => {
  const mockResponse = createTagResponse();
  const mockTag = createTag();
  mockResponse.tags.push(mockTag);
  mocked(getTags, true).mockResolvedValue(mockResponse);
  mocked(useLocation, true).mockImplementation(() => ({
    ...jest.requireActual('react-router-dom').useLocation,
    pathname: '/organizations/testorg/testrepo/latest',
  }));
  mocked(useSearchParams, true).mockImplementation(() => [
    new URLSearchParams(),
    jest.fn(),
  ]);
  render(
    <RecoilRoot>
      <TagDetails />
    </RecoilRoot>,
  );
  const tests: Test[] = [
    {
      testId: 'name',
      name: 'Name',
      value: mockTag.name,
    },
    {
      testId: 'creation',
      name: 'Creation',
      value: formatDate(mockTag.start_ts),
    },
    {
      testId: 'repository',
      name: 'Repository',
      value: 'testrepo',
    },
    {
      testId: 'modified',
      name: 'Modified',
      value: formatDate(mockTag.last_modified),
    },
    {
      testId: 'size',
      name: 'Size',
      value: prettyBytes(mockTag.size),
    },
    {
      testId: 'vulnerabilities',
      name: 'Vulnerabilities',
      value: 'TODO-vulernabilities',
    },
    {
      testId: 'labels',
      name: 'Labels',
      value: 'TODO-labels',
    },
  ];
  await checkFieldValues(tests);
  const clipboardCopyTests: Test[] = [
    {
      testId: 'podman-tag-clipboardcopy',
      value: 'podman pull quay.io/testorg/testrepo:latest',
    },
    {
      testId: 'docker-tag-clipboardcopy',
      value: 'docker pull quay.io/testorg/testrepo:latest',
    },
    {
      testId: 'podman-digest-clipboardcopy',
      value: 'podman pull quay.io/testorg/testrepo@' + mockTag.manifest_digest,
    },
    {
      testId: 'docker-digest-clipboardcopy',
      value: 'docker pull quay.io/testorg/testrepo@' + mockTag.manifest_digest,
    },
  ];
  expect(
    within(await screen.findByTestId('digest-clipboardcopy')).getByText(
      mockTag.manifest_digest,
    ),
  ).toBeTruthy();
  await checkClipboardValues(clipboardCopyTests);
});

test('Render manifest list tag', async () => {
  const mockResponse = createTagResponse();
  const mockTag = createTag();
  mockTag.is_manifest_list = true;
  mockResponse.tags.push(mockTag);

  const FIRST_MANIFEST = 0,
    SECOND_MANIFEST = 1;
  const mockManifest = {
    schemaVersion: 2,
    mediaType: 'application/vnd.oci.image.index.v1+json',
    manifests: [
      {
        digest: 'sha256:abcdefghijk',
        size: 1,
        platform: {
          architecture: 'ppc64le',
          os: 'linux',
        },
      },
      {
        digest: 'sha256:12345678910',
        size: 2,
        platform: {
          architecture: 'amd64',
          os: 'linux',
        },
      },
    ],
  };

  mocked(getTags, true).mockResolvedValue(mockResponse);
  mocked(getManifestByDigest, true).mockResolvedValue({
    digest: mockTag.manifest_digest,
    is_manifest_list: true,
    manifest_data: JSON.stringify(mockManifest),
  });
  mocked(useLocation, true).mockImplementation(() => ({
    ...jest.requireActual('react-router-dom').useLocation,
    pathname: '/organizations/testorg/testrepo/latest',
  }));
  mocked(useSearchParams, true).mockImplementation(() => [
    new URLSearchParams(),
    jest.fn(),
  ]);

  render(
    <RecoilRoot>
      <TagDetails />
    </RecoilRoot>,
  );

  const archSelect = await screen.findByText('ppc64le');
  expect(archSelect).toBeTruthy();

  const tests: Test[] = [
    {
      testId: 'name',
      name: 'Name',
      value: mockTag.name,
    },
    {
      testId: 'creation',
      name: 'Creation',
      value: formatDate(mockTag.start_ts),
    },
    {
      testId: 'repository',
      name: 'Repository',
      value: 'testrepo',
    },
    {
      testId: 'modified',
      name: 'Modified',
      value: formatDate(mockTag.last_modified),
    },
    {
      testId: 'size',
      name: 'Size',
      value: prettyBytes(mockManifest.manifests[FIRST_MANIFEST].size),
    },
    {
      testId: 'vulnerabilities',
      name: 'Vulnerabilities',
      value: 'TODO-vulernabilities',
    },
    {
      testId: 'labels',
      name: 'Labels',
      value: 'TODO-labels',
    },
  ];
  await checkFieldValues(tests);

  let clipboardCopyTests: Test[] = [
    {
      testId: 'podman-tag-clipboardcopy',
      value: 'podman pull quay.io/testorg/testrepo:latest',
    },
    {
      testId: 'docker-tag-clipboardcopy',
      value: 'docker pull quay.io/testorg/testrepo:latest',
    },
    {
      testId: 'podman-digest-clipboardcopy',
      value:
        'podman pull quay.io/testorg/testrepo@' +
        mockManifest.manifests[FIRST_MANIFEST].digest,
    },
    {
      testId: 'docker-digest-clipboardcopy',
      value:
        'docker pull quay.io/testorg/testrepo@' +
        mockManifest.manifests[FIRST_MANIFEST].digest,
    },
  ];
  expect(
    within(await screen.findByTestId('digest-clipboardcopy')).getByText(
      mockManifest.manifests[FIRST_MANIFEST].digest,
    ),
  ).toBeTruthy();
  await checkClipboardValues(clipboardCopyTests);

  // Select the other architecture
  fireEvent(
    archSelect,
    new MouseEvent('click', {bubbles: true, cancelable: true}),
  );
  expect(await screen.findAllByText('ppc64le')).toBeTruthy();
  const secondArchOption = await screen.findByText('amd64');
  expect(secondArchOption).toBeTruthy();
  fireEvent(
    secondArchOption,
    new MouseEvent('click', {bubbles: true, cancelable: true}),
  );

  tests[4].value = prettyBytes(mockManifest.manifests[SECOND_MANIFEST].size);
  await checkFieldValues(tests);

  clipboardCopyTests = [
    {
      testId: 'podman-tag-clipboardcopy',
      value: 'podman pull quay.io/testorg/testrepo:latest',
    },
    {
      testId: 'docker-tag-clipboardcopy',
      value: 'docker pull quay.io/testorg/testrepo:latest',
    },
    {
      testId: 'podman-digest-clipboardcopy',
      value:
        'podman pull quay.io/testorg/testrepo@' +
        mockManifest.manifests[SECOND_MANIFEST].digest,
    },
    {
      testId: 'docker-digest-clipboardcopy',
      value:
        'docker pull quay.io/testorg/testrepo@' +
        mockManifest.manifests[SECOND_MANIFEST].digest,
    },
  ];
  expect(
    within(await screen.findByTestId('digest-clipboardcopy')).getByText(
      mockManifest.manifests[SECOND_MANIFEST].digest,
    ),
  ).toBeTruthy();
  await checkClipboardValues(clipboardCopyTests);
});
