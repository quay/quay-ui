import {
  DropdownItem,
  Page,
  PageSection,
  PageSectionVariants,
  Spinner,
  Title,
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
import {
  bulkDeleteRepositories,
  fetchAllRepos,
  IRepository,
} from 'src/resources/RepositoryResource';
import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {CreateRepositoryModalTemplate} from 'src/components/modals/CreateRepoModalTemplate';
import {getRepoDetailPath} from 'src/routes/NavigationPath';
import {selectedReposState} from 'src/atoms/RepositoryState';
import {formatDate} from 'src/libs/utils';
import {BulkDeleteModalTemplate} from 'src/components/modals/BulkDeleteModalTemplate';
import {getUser} from 'src/resources/UserResource';
import {RepositoryToolBar} from '../../components/toolbar/RepositoryToolBar';

function getReponameFromURL(pathname: string): string {
  return pathname.includes('organizations') ? pathname.split('/')[2] : null;
}

export default function RepositoriesList() {
  const [isCreateRepoModalOpen, setCreateRepoModalOpen] = useState(false);
  const [isKebabOpen, setKebabOpen] = useState(false);
  const [makePublicModalOpen, setmakePublicModal] = useState(false);
  const [makePrivateModalOpen, setmakePrivateModal] = useState(false);
  const [repositoryList, setRepositoryList] = useState<IRepository[]>([]);
  const [, setUserState] = useRecoilState(UserState);

  // Pagination related state
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const paginatedRepositoryList = repositoryList.slice(
    page * perPage - perPage,
    page * perPage - perPage + perPage,
  );
  const [selectedRepoNames, setSelectedRepoNames] =
    useRecoilState(selectedReposState);
  const isRepoSelectable = (repo: IRepository) => repo.name !== ''; // Arbitrary logic for this example
  const selectableRepos = repositoryList.filter(isRepoSelectable);

  const selectAllRepos = (isSelecting = true) =>
    setSelectedRepoNames(
      isSelecting ? selectableRepos.map((r) => r.namespace + '/' + r.name) : [],
    );

  const setRepoSelected = (repo: IRepository, isSelecting = true) =>
    setSelectedRepoNames((prevSelected) => {
      const otherSelectedRepoNames = prevSelected.filter(
        (r) => r !== r.namespace + '/' + r.name,
      );
      return isSelecting && isRepoSelectable(repo)
        ? [...otherSelectedRepoNames, repo.namespace + '/' + repo.name]
        : otherSelectedRepoNames;
    });

  const areAllReposSelected =
    selectedRepoNames.length === selectableRepos.length;

  const isRepoSelected = (repo: IRepository) =>
    selectedRepoNames.includes(repo.namespace + '/' + repo.name);

  const [recentSelectedRowIndex, setRecentSelectedRowIndex] = useState<
    number | null
  >(null);

  const onSelectRepo = (
    repo: IRepository,
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

  const [deleteKebabOption, setDeleteKebabOption] = useState({
    isModalOpen: false,
  });

  const userOrgs = useRecoilValue(UserOrgs);
  const currentUser = useRecoilValue(UserState);
  const currentOrg = getReponameFromURL(useLocation().pathname);

  const handleDeleteModalToggle = () => {
    setKebabOpen(!isKebabOpen);
    setDeleteKebabOption((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  const handleRepoDeletion = async (repos: IRepository[]) => {
    setDeleteKebabOption((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
    }));
    const response = await bulkDeleteRepositories(repos);
    const deleteFailed = response.some((resp) => resp.status !== 204);
    if (!deleteFailed) {
      // Fetch user recomputes "repositoryList" via useEffect
      const user = await getUser();
      setUserState(user);
    }
  };

  const kebabItems = [
    <DropdownItem key="delete" onClick={handleDeleteModalToggle}>
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

  async function fetchRepos() {
    setRepositoryList([]);
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
      await fetchAllRepos(listOfOrgNames).then((response) => {
        response.map((eachResponse) =>
          eachResponse?.data.repositories.map((repo) => {
            setRepositoryList((prevRepos) => [
              ...prevRepos,
              {
                namespace: repo.namespace,
                name: repo.name,
                is_public: repo.is_public,
                last_modified: repo.last_modified,
              },
            ]);
          }),
        );
      });
    }
  }

  useEffect(() => {
    fetchRepos();
  }, [userOrgs]);

  const updateListHandler = (value: IRepository) => {
    setRepositoryList((prev) => [...prev, value]);
  };

  /* Mapper object used to render bulk delete table 
    - keys are actual column names of the table
    - value is an object type with a "label" which maps to the attributes of <T> 
      and an optional "transformFunc" which can be used to modify the value being displayed */
  const mapOfColNamesToTableData = {
    Repository: {label: 'name'},
    Visibility: {
      label: 'is_public',
      transformFunc: (value) => (value ? 'public' : 'private'),
    },
    Size: {label: 'size'},
  };

  const createRepoModal = () => {
    return (
      <CreateRepositoryModalTemplate
        isModalOpen={isCreateRepoModalOpen}
        handleModalToggle={() => setCreateRepoModalOpen(!isCreateRepoModalOpen)}
        orgName={currentOrg}
        updateListHandler={updateListHandler}
      />
    );
  };

  const deleteModal = () => {
    return (
      <BulkDeleteModalTemplate
        mapOfColNamesToTableData={mapOfColNamesToTableData}
        handleModalToggle={handleDeleteModalToggle}
        handleBulkDeletion={handleRepoDeletion}
        isModalOpen={deleteKebabOption.isModalOpen}
        selectedItems={repositoryList.filter((repo) =>
          selectedRepoNames.some(
            (selected) => repo.namespace + '/' + repo.name === selected,
          ),
        )}
        resourceName={'repositories'}
      />
    );
  };

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
        <RepositoryToolBar
          currentOrg={currentOrg}
          createRepoModal={createRepoModal}
          isCreateRepoModalOpen={isCreateRepoModalOpen}
          setCreateRepoModalOpen={setCreateRepoModalOpen}
          isKebabOpen={isKebabOpen}
          setKebabOpen={setKebabOpen}
          kebabItems={kebabItems}
          selectedRepoNames={selectedRepoNames}
          deleteModal={deleteModal}
          deleteKebabIsOpen={deleteKebabOption.isModalOpen}
          makePublicModalOpen={makePublicModalOpen}
          toggleMakePublicClick={toggleMakePublicClick}
          makePrivateModalOpen={makePrivateModalOpen}
          toggleMakePrivateClick={toggleMakePrivateClick}
          selectAllRepos={selectAllRepos}
          repositoryList={repositoryList}
          perPage={perPage}
          page={page}
          setPage={setPage}
          setPerPage={setPerPage}
        />
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
            {repositoryList.length === 0 ? (
              // Repo table loading icon
              <Tr>
                <Td>
                  <Spinner size="lg" />
                </Td>
              </Tr>
            ) : (
              paginatedRepositoryList.map((repo, rowIndex) => (
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
                    {repo.is_public ? 'public' : 'private'}
                  </Td>
                  <Td dataLabel={columnNames.tags}> - </Td>
                  <Td dataLabel={columnNames.size}> -</Td>
                  <Td dataLabel={columnNames.pulls}> - </Td>
                  <Td dataLabel={columnNames.lastPull}> - </Td>
                  <Td dataLabel={columnNames.lastModified}>
                    {formatDate(repo.last_modified)}
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </TableComposable>
      </PageSection>
    </Page>
  );
}
