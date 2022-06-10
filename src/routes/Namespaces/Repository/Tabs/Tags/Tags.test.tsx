import Tags from './Tags';
import {render, screen, fireEvent} from '@testing-library/react';
import {RecoilRoot} from 'recoil';
import {mocked} from 'ts-jest/utils';
import {
  Tag,
  TagsResponse,
  getTags,
  getManifestByDigest,
  getSecurityDetails,
} from 'src/resources/TagResource';

jest.mock('src/resources/TagResource', () => ({
  getTags: jest.fn(),
  getManifestByDigest: jest.fn(),
  getSecurityDetails: jest.fn(),
}));

const testOrg = 'testorg';
const testRepo = 'testrepo';
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

test('Tags should render', async () => {
  mocked(getTags, true).mockResolvedValue(createTagResponse());
  render(
    <RecoilRoot>
      <Tags organization={testOrg} repository={testRepo} />
    </RecoilRoot>,
  );
  const message = await screen.findByText('This repository is empty.');
  expect(message).toBeTruthy();
});

test('Tags should appear in list', async () => {
  const mockResponse = createTagResponse();
  mockResponse.tags.push(createTag());
  mocked(getTags, true).mockResolvedValue(mockResponse);
  render(
    <RecoilRoot>
      <Tags organization={testOrg} repository={testRepo} />
    </RecoilRoot>,
  );
  const message = await screen.findByText('latest');
  expect(message).toBeTruthy();
});

test('Filter search should return matching list', async () => {
  const tagNames = ['latest', 'slim', 'alpine'];
  const mockResponse = createTagResponse();
  for (const tag of tagNames) {
    mockResponse.tags.push(createTag(tag));
  }
  mocked(getTags, true).mockResolvedValue(mockResponse);
  render(
    <RecoilRoot>
      <Tags organization={testOrg} repository={testRepo} />
    </RecoilRoot>,
  );
  expect(await screen.findByText('latest')).toBeTruthy();
  expect(await screen.findByText('slim')).toBeTruthy();
  expect(await screen.findByText('alpine')).toBeTruthy();
  const filterTextBox = screen.getByPlaceholderText('Filter by Tag name');
  fireEvent.change(filterTextBox, {target: {value: 'latest'}});
  expect(await screen.findByText('latest')).toBeTruthy();
  expect(screen.queryByText('slim')).toBeNull();
  expect(screen.queryByText('alpine')).toBeNull();
});

test('Updating per page should update table content', async () => {
  const mockResponse: TagsResponse = createTagResponse();
  for (let i = 0; i < 40; i++) {
    mockResponse.tags.push(createTag(`tag${i}`));
  }
  mocked(getTags, true).mockResolvedValue(mockResponse);
  const {container} = render(
    <RecoilRoot>
      <Tags organization={testOrg} repository={testRepo} />
    </RecoilRoot>,
  );
  const initialRows = await screen.findAllByTestId('table-entry');
  expect(initialRows.length).toBe(25);
  const perPageButton = (await screen.findByTestId('pagination')).querySelector(
    'button',
  ); // Assumes 1st button is per page
  fireEvent(
    perPageButton,
    new MouseEvent('click', {bubbles: true, cancelable: true}),
  );
  fireEvent(
    await screen.findByText('10 per page'),
    new MouseEvent('click', {bubbles: true, cancelable: true}),
  );
  const updatedRows = screen.getAllByTestId('table-entry');
  expect(updatedRows.length).toBe(10);
});

test('Updating page should update table content', async () => {
  const mockResponse: TagsResponse = createTagResponse();
  for (let i = 0; i < 40; i++) {
    mockResponse.tags.push(createTag(`tag${i}`));
  }
  mocked(getTags, true).mockResolvedValue(mockResponse);
  const {container} = render(
    <RecoilRoot>
      <Tags organization={testOrg} repository={testRepo} />
    </RecoilRoot>,
  );
  const initialRows = await screen.findAllByTestId('table-entry');
  expect(initialRows.length).toBe(25);
  fireEvent(
    screen.getByLabelText('Go to next page'),
    new MouseEvent('click', {bubbles: true, cancelable: true}),
  );
  const updatedRows = screen.getAllByTestId('table-entry');
  expect(updatedRows.length).toBe(15);
});

test('Copy modal should show org and repo', async () => {
  const mockResponse = createTagResponse();
  const tag = createTag();
  mockResponse.tags.push(tag);
  mocked(getTags, true).mockResolvedValue(mockResponse);
  render(
    <RecoilRoot>
      <Tags organization={testOrg} repository={testRepo} />
    </RecoilRoot>,
  );
  expect(await screen.findByText(tag.name)).toBeTruthy();
  fireEvent(
    screen.getByTestId('pull'),
    new MouseEvent('click', {bubbles: true, cancelable: true}),
  );
  expect(screen.getByTestId(`copy-tag`).querySelector('input').value).toBe(
    `docker pull quay.io/${testOrg}/${testRepo}:${tag.name}`,
  );
  expect(screen.getByTestId(`copy-digest`).querySelector('input').value).toBe(
    `docker pull quay.io/${testOrg}/${testRepo}@${tag.manifest_digest}`,
  );
});
