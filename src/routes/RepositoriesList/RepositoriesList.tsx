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
import {useRecoilState, useRecoilValue} from 'recoil';
import {UserOrgs, UserState} from 'src/atoms/UserState';
import {repositoryListState} from 'src/atoms/RepositoryState';
import {fetchAllRepos} from 'src/resources/RepositoryResource';
import {DeleteRepositoryModal} from './DeleteRepositoryModal';
import {ConfirmationModal} from 'src/components/modals/ConfirmationModal';
import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {CreateRepositoryModalTemplate} from 'src/components/modals/CreateRepoModalTemplate';
import {getRepoDetailPath} from 'src/routes/NavigationPath';

function getReponameFromURL(pathname: string): string {
  return pathname.includes('organizations') ? pathname.split('/')[2] : null;
}

export default function RepositoriesList() {
  const [isCreateRepoModalOpen, setCreateRepoModalOpen] = useState(false);
  const [isSelectDropDownOpen, setSelectDropDownOpen] = useState(false);
  const [isKebabOpen, setKebabOpen] = useState(false);
  const [makePublicModalOpen, setmakePublicModal] = useState(false);
  const [makePrivateModalOpen, setmakePrivateModal] = useState(false);
  const [repositoryList, setRepositoryList] =
    useRecoilState(repositoryListState);

  const isRepoSelectable = (repo: Repository) => repo.name !== ''; // Arbitrary logic for this example
  const selectableRepos = repositoryList.filter(isRepoSelectable);
  const [selectedRepoNames, setSelectedRepoNames] = useState<string[]>([]);

  const setRepoSelected = (repo: Repository, isSelecting = true) =>
    setSelectedRepoNames((prevSelected) => {
      const otherSelectedRepoNames = prevSelected.filter(
        (r) => r !== repo.path,
      );
      return isSelecting && isRepoSelectable(repo)
        ? [...otherSelectedRepoNames, repo.path]
        : otherSelectedRepoNames;
    });

  const selectAllRepos = (isSelecting = true) =>
    setSelectedRepoNames(isSelecting ? selectableRepos.map((r) => r.path) : []);

  const areAllReposSelected =
    selectedRepoNames.length === selectableRepos.length;

  const isRepoSelected = (repo: Repository) =>
    selectedRepoNames.includes(repo.path);

  const [recentSelectedRowIndex, setRecentSelectedRowIndex] = useState<
    number | null
  >(null);

  const onSelectRepo = (
    repo: Repository,
    rowIndex: number,
    isSelecting: boolean,
  ) => {
    // If the user is shift + selecting the checkboxes, then all intermediate checkboxes should be selected
    // if (shifting && recentSelectedRowIndex !== null) {
    //   const numberSelected = rowIndex - recentSelectedRowIndex;
    //   const intermediateIndexes =
    //     numberSelected > 0
    //       ? Array.from(new Array(numberSelected + 1), (_x, i) => i + recentSelectedRowIndex)
    //       : Array.from(new Array(Math.abs(numberSelected) + 1), (_x, i) => i + rowIndex);
    //   intermediateIndexes.forEach(index => setRepoSelected(repositories[index], isSelecting));
    // } else {
    setRepoSelected(repo, isSelecting);
    // }
    setRecentSelectedRowIndex(rowIndex);
  };

  // const selectAllNamespaces = (isSelecting = true) =>
  //   setSelectedRepoNames(isSelecting ? selectableRepos.map(r => r.path) : []);

  const toggleMakePublicClick = () => {
    setmakePublicModal(!makePublicModalOpen);
  };

  const toggleMakePrivateClick = () => {
    setmakePrivateModal(!makePrivateModalOpen);
  };

  const [repositorySearchInput, setRepositorySearchInput] =
    useState('Filter by name..');

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

  const fetchConfirmationModalText = () => {
    if (selectedRepoNames.length == 1) {
      return selectedRepoNames[0];
    }
    return selectedRepoNames.length;
  };

  const fetchMakePublicDescription = () => {
    if (selectedRepoNames.length == 0) {
      return 'Please select one/more repositories to change visibility.';
    }
    return (
      'Update ' +
      fetchConfirmationModalText() +
      ' repositories visibility to be public so they are visible to all user, and may be pulled by all users.'
    );
  };

  const fetchMakePrivateDescription = () => {
    if (selectedRepoNames.length == 0) {
      return 'Please select one/more repositories to change visibility.';
    }
    return (
      'Update ' +
      fetchConfirmationModalText() +
      ' repositories visibility to be private so they are only visible to certain users, and only may be pulled by certain users.'
    );
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
      key="make public"
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

  async function fetchRepos(refresh = false) {
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
        if (refresh) {
          setRepositoryList([]);
        }
        await fetchAllRepos(listOfOrgNames).then((response) => {
          response.map((eachResponse) =>
            eachResponse?.data.repositories.map((repo) => {
              setRepositoryList((prevRepos) => [
                ...prevRepos,
                {
                  name: repo.name,
                  namespace: repo.namespace,
                  path: repo.namespace + '/' + repo.name,
                  isPublic: repo.is_public,
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

  useEffect(() => {
    fetchRepos();
  }, [userOrgs]);

  const updateListHandler = (value: RepositoryListProps) => {
    setRepositoryList((prev) => [...prev, value]);
  };

  console.log(repositoryList);

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
                  updateListHandler={updateListHandler}
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
            description={fetchMakePublicDescription()}
            modalOpen={makePublicModalOpen}
            selectedItems={selectedRepoNames}
            toggleModal={toggleMakePublicClick}
            buttonText="Make public"
            makePublic={true}
            fetchRepos={fetchRepos}
            selectAllRepos={selectAllRepos}
          />
          <ConfirmationModal
            title="Make repositories private"
            description={fetchMakePrivateDescription()}
            modalOpen={makePrivateModalOpen}
            toggleModal={toggleMakePrivateClick}
            buttonText="Make private"
            selectedItems={selectedRepoNames}
            makePublic={false}
            fetchRepos={fetchRepos}
            selectAllRepos={selectAllRepos}
          />
        </Toolbar>
        <TableComposable aria-label="Selectable table">
          <Thead>
            <Tr>
              <Th
                select={{
                  onSelect: (_event, isSelecting) =>
                    selectAllRepos(isSelecting),
                  isSelected: areAllReposSelected,
                }}
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
            {repositoryList.map((repo, rowIndex) => (
              <Tr key={rowIndex}>
                <Td
                  select={{
                    rowIndex,
                    onSelect: (_event, isSelecting) =>
                      onSelectRepo(repo, rowIndex, isSelecting),
                    isSelected: isRepoSelected(repo),
                    disable: !isRepoSelectable(repo),
                  }}
                />
                <Td dataLabel={columnNames.repoName}>
                  {currentOrg == null ? (
                    <Link to={getRepoDetailPath(repo.namespace, repo.name)}>
                      {repo.namespace}/{repo.name}
                    </Link>
                  ) : (
                    <Link to={getRepoDetailPath(repo.namespace, repo.name)}>
                      {repo.name}
                    </Link>
                  )}
                </Td>
                <Td dataLabel={columnNames.visibility}>
                  {' '}
                  {repo.isPublic ? 'public' : 'private'}
                </Td>
                <Td dataLabel={columnNames.tags}> {repo.tags} </Td>
                <Td dataLabel={columnNames.size}> {repo.size} </Td>
                <Td dataLabel={columnNames.pulls}> {repo.pulls} </Td>
                <Td dataLabel={columnNames.lastPull}> {repo.lastPull} </Td>
                <Td dataLabel={columnNames.lastModified}>
                  {' '}
                  {repo.lastModified}{' '}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </PageSection>
    </Page>
  );
}

export type RepositoryListProps = {
  name: string;
  namespace: string;
  path: string;
  isPublic: boolean;
  tags: number;
  size: string;
  pulls: number;
  lastPull: string;
  lastModified: string;
};

interface Repository {
  name: string;
  namespace: string;
  path: string;
  isPublic: boolean;
  tags: number;
  size: string;
  pulls: number;
  lastPull: string;
  lastModified: string;
}
