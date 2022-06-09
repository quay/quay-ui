import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownToggleCheckbox,
  KebabToggle,
  Page,
  PageSection,
  PageSectionVariants,
  TextInput,
  Title,
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
import {useRecoilValue} from 'recoil';
import {UserOrgs, UserState} from 'src/atoms/UserState';
import {fetchAllRepos} from 'src/resources/RepositoryResource';
import {DeleteRepositoryModal} from './DeleteRepositoryModal';
import {ConfirmationModal} from 'src/components/modals/ConfirmationModal';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {CreateRepositoryModalTemplate} from 'src/components/modals/CreateRepoModalTemplate';

function getReponameFromURL(pathname: string): string {
  return pathname.includes('organizations') ? pathname.split('/')[2] : null;
}

export default function Repositories() {
  const [isCreateRepoModalOpen, setCreateRepoModalOpen] = useState(false);
  const [isSelectDropDownOpen, setSelectDropDownOpen] = useState(false);
  const [isKebabOpen, setKebabOpen] = useState(false);
  const [makePublicModalOpen, setmakePublicModal] = useState(false);
  const [makePrivateModalOpen, setmakePrivateModal] = useState(false);
  const [repositoryList, setRepositoryList] = useState<RepositoryListProps[]>(
    [],
  );

  const toggleMakePublicClick = () => {
    setmakePublicModal(!makePublicModalOpen);
  };

  const toggleMakePrivateClick = () => {
    setmakePrivateModal(!makePrivateModalOpen);
  };

  const [repositorySearchInput, setRepositorySearchInput] =
    React.useState('Filter by name..');

  const [deleteKebabOption, setDeleteKebabOption] = useState({
    isModalOpen: false,
  });

  const userOrgs = useRecoilValue(UserOrgs);
  const currentUser = useRecoilValue(UserState);
  const currentOrg = getReponameFromURL(useLocation().pathname);

  const handleDeleteModalToggle = () => {
    setDeleteKebabOption((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  const handleRepoDeletion = () => {
    setKebabOpen(!isKebabOpen);
    handleDeleteModalToggle();
    // TODO: ADD API calls for bulk/ selected repo deletion
  };

  const selectDropdownItems = [
    <DropdownItem key="Select all">Select all</DropdownItem>,
    <DropdownItem key="Select none">Select none</DropdownItem>,
  ];

  const kebabItems = [
    <DropdownItem key="delete" onClick={handleRepoDeletion}>
      Delete
    </DropdownItem>,

    <DropdownItem
      key="make public123"
      component="button"
      onClick={toggleMakePublicClick}
    >
      Make Public
    </DropdownItem>,
    <DropdownItem
      key="make private"
      component="button"
      onClick={toggleMakePrivateClick}
    >
      Make Private
    </DropdownItem>,
    <DropdownItem key="Set team permissions">
      Set team permissions
    </DropdownItem>,
  ];

  const columnNames = {
    repoName: 'Name',
    visibility: 'Visibility',
    tags: 'Tags',
    size: 'Size',
    pulls: 'Pulls',
    lastPull: 'Last Pull',
    lastModified: 'Last Modified',
  };

  const handleFilteredSearch = (value: any) => {
    setRepositorySearchInput(value);
  };

  useEffect(() => {
    async function fetchRepos() {
      const listOfOrgNames = [];
      if (userOrgs) {
        // check if view is global vs scoped to a organization
        if (currentOrg === null) {
          userOrgs.map((org) => listOfOrgNames.push(org.name));
          // add user to fetch user specific repositories
          listOfOrgNames.push(currentUser.username);
        } else {
          listOfOrgNames.push(currentOrg);
        }
        try {
          await fetchAllRepos(listOfOrgNames).then((response) => {
            response.map((eachResponse) =>
              eachResponse?.data.repositories.map((repo) => {
                console.log('repo', repo);
                setRepositoryList((prevRepos) => [
                  ...prevRepos,
                  {
                    name: repo.name,
                    visibility: repo.is_public,
                    tags: 1,
                    size: '1.1GB',
                    pulls: 108,
                    lastPull: 'TBA',
                    lastModified: 'TBA',
                  },
                ]);
              }),
            );
          });
        } catch (e) {
          console.error(e);
        }
      }
    }

    fetchRepos();
  }, [userOrgs]);

  return (
    <Page>
      {currentOrg === null ? (
        <PageSection variant={PageSectionVariants.light} hasShadowBottom>
          <div className="co-m-nav-title--row">
            <Title headingLevel="h1">Repositories</Title>
          </div>
        </PageSection>
      ) : null}

      <PageSection variant={PageSectionVariants.light}>
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
                    onToggle={() =>
                      setSelectDropDownOpen(!isSelectDropDownOpen)
                    }
                  />
                }
                isOpen={isSelectDropDownOpen}
                dropdownItems={selectDropdownItems}
              />
            </ToolbarItem>
            <ToolbarItem>
              <TextInput
                isRequired
                type="search"
                id="modal-with-form-form-name"
                name="search input"
                value={repositorySearchInput}
                onChange={handleFilteredSearch}
              />
            </ToolbarItem>
            <ToolbarItem>
              <Button
                variant="primary"
                onClick={() => setCreateRepoModalOpen(true)}
              >
                Create Repository
              </Button>
              {isCreateRepoModalOpen ? (
                <CreateRepositoryModalTemplate
                  isModalOpen={isCreateRepoModalOpen}
                  handleModalToggle={() =>
                    setCreateRepoModalOpen(!isCreateRepoModalOpen)
                  }
                  orgNameProp={currentOrg}
                />
              ) : null}{' '}
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
              {deleteKebabOption.isModalOpen ? (
                <DeleteRepositoryModal
                  handleModalToggle={handleDeleteModalToggle}
                  handleRepoDeletion={handleRepoDeletion}
                  isModalOpen={deleteKebabOption.isModalOpen}
                />
              ) : null}
            </ToolbarItem>
          </ToolbarContent>
          <ConfirmationModal
            title="Make repositories public"
            description="Update repositories visibility to be public so they are visible to all user, and may be pulled by all users."
            modalOpen={makePublicModalOpen}
            toggleModal={toggleMakePublicClick}
            buttonText="Make public"
          />
          <ConfirmationModal
            title="Make repositories private"
            description="Update repositories visibility to be private so they are only visible to certain users, and only may be pulled by certain users."
            modalOpen={makePrivateModalOpen}
            toggleModal={toggleMakePrivateClick}
            buttonText="Make private"
          />
        </Toolbar>
        <TableComposable aria-label="Selectable table">
          <Thead>
            <Tr>
              <Th
              // select={{
              //   onSelect: (_event, isSelecting) =>
              //     selectAllNamespaces(isSelecting),
              //   isSelected: areAllNamespacesSelected,
              // }}
              />
              <Th>{columnNames.repoName}</Th>
              <Th>{columnNames.visibility}</Th>
              <Th>{columnNames.tags}</Th>
              <Th>{columnNames.size}</Th>
              <Th>{columnNames.pulls}</Th>
              <Th>{columnNames.lastPull}</Th>
              <Th>{columnNames.lastModified}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {repositoryList.map((repo, idx) => {
              <Tr key={idx}>
                <Td dataLabel={columnNames.repoName}> {repo.name} </Td>
                <Td dataLabel={columnNames.visibility}>{repo.visibility}</Td>
                <Td dataLabel={columnNames.tags}>TBA</Td>
                <Td dataLabel={columnNames.size}>TBA</Td>
                <Td dataLabel={columnNames.pulls}>TBA</Td>
                <Td dataLabel={columnNames.lastPull}>TBA</Td>
                <Td dataLabel={columnNames.lastModified}>TBA</Td>
              </Tr>;
            })}
          </Tbody>
        </TableComposable>
      </PageSection>
    </Page>
  );
}

type RepositoryListProps = {
  name: string;
  visibility: boolean;
  tags: number;
  size: string;
  pulls: number;
  lastPull: string;
  lastModified: string;
};
