import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownToggleCheckbox,
  KebabToggle,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import * as React from 'react';
import {Link} from 'react-router-dom';
import {CreateRepositoryModal} from './CreateRepositoryModal';

export default function RepositoriesTab() {
  const QUAY_ENDPOINT = {
    QUAY_OAUTH_TOKEN: '7xahJf2TH8uOZPF1Xya8DkWanOZ75F0MjRX4RnvW',
    QUAY_HOSTNAME:
      'https://skynet-quay-test-harish-ns.apps.hgovinda-ui.quay.devcluster.openshift.com',
  };

  const [isCreateRepoModalOpen, setCreateRepoModalOpen] = React.useState(false);
  const [isSelectDropDownOpen, setSelectDropDownOpen] = React.useState(false);
  const [isKebabOpen, setKebabOpen] = React.useState(false);
  const [repositoryList, setRepositoryList] = React.useState<
    RepositoryListProps[]
  >([]);

  const dummy = () => {
    setRepositoryList(repositoryList); // dummy line added to fix compilation
  };
  console.log(dummy);

  const data = ['dummy1', 'dummy2'];

  const selectDropdownItems = [
    <DropdownItem key="Select all">Select all</DropdownItem>,
    <DropdownItem key="Select none">Select none</DropdownItem>,
  ];

  const kebabItems = [
    <DropdownItem key="delete">Delete</DropdownItem>,
    <DropdownItem key="Make public">Make public</DropdownItem>,
    <DropdownItem key="Make private">Make private</DropdownItem>,
    <DropdownItem key="Add to team">Add to team</DropdownItem>,
  ];

  const columnNames = {
    repoName: 'Repository Name',
    users: 'Users',
    tagCount: 'Tags',
    size: 'Size',
    pulls: 'Pulls (Activity)',
    lastPull: 'Last Pull',
    vunerabilities: 'Vunerabilities',
  };

  return (
    <>
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem variant="bulk-select">
            <Dropdown
              onSelect={() => setSelectDropDownOpen(!isSelectDropDownOpen)}
              toggle={
                <DropdownToggle
                  id="stacked-example-toggle"
                  splitButtonItems={[
                    <DropdownToggleCheckbox
                      id="example-checkbox-1"
                      key="split-checkbox"
                      aria-label="Select all"
                    />,
                  ]}
                  onToggle={() => setSelectDropDownOpen(!isSelectDropDownOpen)}
                />
              }
              isOpen={isSelectDropDownOpen}
              dropdownItems={selectDropdownItems}
            />
          </ToolbarItem>
          <ToolbarItem>
            <Dropdown
              onSelect={() => setKebabOpen(!isKebabOpen)}
              toggle={
                <KebabToggle
                  onToggle={() => setKebabOpen(!isKebabOpen)}
                  id="toggle-id-6"
                />
              }
              isOpen={isKebabOpen}
              isPlain
              dropdownItems={kebabItems}
            />
          </ToolbarItem>
          <ToolbarItem></ToolbarItem>
          <ToolbarItem>
            <Button
              variant="primary"
              onClick={() => setCreateRepoModalOpen(true)}
            >
              Create Repository
            </Button>
            {isCreateRepoModalOpen ? (
              <CreateRepositoryModal
                isModalOpen={isCreateRepoModalOpen}
                handleModalToggle={() =>
                  setCreateRepoModalOpen(!isCreateRepoModalOpen)
                }
                quayEndPoint={QUAY_ENDPOINT}
              />
            ) : null}{' '}
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <TableComposable aria-label="Selectable table">
        <Thead>
          <Tr>
            <Th />
            <Th>{columnNames.repoName}</Th>
            <Th>{columnNames.users}</Th>
            <Th>{columnNames.tagCount}</Th>
            <Th>{columnNames.size}</Th>
            <Th>{columnNames.pulls}</Th>
            <Th>{columnNames.lastPull}</Th>
            <Th>{columnNames.vunerabilities}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {repositoryList.map((repo, rowIndex) => (
            <Tr key={repo.repoName}>
              <Td />
              <Td dataLabel={columnNames.repoName}>
                <Link to={`/quay/namespaces/${repo.repoName}`}>
                  {repo.repoName}
                </Link>
              </Td>
              <Td dataLabel={columnNames.users}>{repo.users}</Td>
              <Td dataLabel={columnNames.tagCount}>{repo.tagCount}</Td>
              <Td dataLabel={columnNames.size}>{repo.size}</Td>
              <Td dataLabel={columnNames.pulls}>{repo.pulls}</Td>
              <Td dataLabel={columnNames.lastPull}>{repo.lastPull}</Td>
              <Td dataLabel={columnNames.vunerabilities}>
                {repo.vunerabilities}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </>
  );
}

type RepositoryListProps = {
  repoName: string;
  users: number;
  tagCount: number;
  size: string;
  pulls: number;
  lastPull: string;
  vunerabilities: string;
};
