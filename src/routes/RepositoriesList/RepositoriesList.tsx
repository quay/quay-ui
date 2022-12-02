import {
  DropdownItem,
  PageSection,
  PageSectionVariants,
  Spinner,
  Title,
  PanelFooter,
} from '@patternfly/react-core';
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {
  bulkDeleteRepositories,
  fetchAllRepos,
  IRepository,
} from 'src/resources/RepositoryResource';
import {ReactElement, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import CreateRepositoryModalTemplate from 'src/components/modals/CreateRepoModalTemplate';
import {getRepoDetailPath} from 'src/routes/NavigationPath';
import {
  selectedReposState,
  searchRepoState,
  refreshPageState,
} from 'src/atoms/RepositoryState';
import {formatDate, formatSize} from 'src/libs/utils';
import {BulkDeleteModalTemplate} from 'src/components/modals/BulkDeleteModalTemplate';
import {RepositoryToolBar} from 'src/routes/RepositoriesList/RepositoryToolBar';
import {
  addDisplayError,
  BulkOperationError,
  isErrorString,
} from 'src/resources/ErrorHandling';
import RequestError from 'src/components/errors/RequestError';
import Empty from 'src/components/empty/Empty';
import {CubesIcon} from '@patternfly/react-icons';
import {ToolbarButton} from 'src/components/toolbar/ToolbarButton';
import {QuayBreadcrumb} from 'src/components/breadcrumb/Breadcrumb';
import ErrorModal from 'src/components/errors/ErrorModal';
import {useQuayConfig} from 'src/hooks/UseQuayConfig';
import {ToolbarPagination} from 'src/components/toolbar/ToolbarPagination';
import ColumnNames from './ColumnNames';
import {useRefreshRepoList} from 'src/hooks/UseRefreshPage';
import {fetchUser, IUserResource} from 'src/resources/UserResource';
import {LoadingPage} from 'src/components/LoadingPage';

function getReponameFromURL(pathname: string): string {
  return pathname.includes('organization') ? pathname.split('/')[2] : null;
}

interface RepoListHeaderProps {
  shouldRender: boolean;
}
function RepoListHeader(props: RepoListHeaderProps) {
  if (!props.shouldRender) {
    return null;
  }
  return (
    <>
      <QuayBreadcrumb />
      <PageSection variant={PageSectionVariants.light} hasShadowBottom>
        <div className="co-m-nav-title--row">
          <Title headingLevel="h1">Repositories</Title>
        </div>
      </PageSection>
    </>
  );
}

export default function RepositoriesList() {
  const currentOrg = getReponameFromURL(useLocation().pathname);
  const [loadingErr, setLoadingErr] = useState<string>();
  const [isCreateRepoModalOpen, setCreateRepoModalOpen] = useState(false);
  const [isKebabOpen, setKebabOpen] = useState(false);
  const [makePublicModalOpen, setmakePublicModal] = useState(false);
  const [makePrivateModalOpen, setmakePrivateModal] = useState(false);
  const [repositoryList, setRepositoryList] = useState<IRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshRepoList();
  const pageRefreshIndex = useRecoilValue(refreshPageState);
  const [err, setErr] = useState<string[]>();
  const quayConfig = useQuayConfig();
  const search = useRecoilValue(searchRepoState);
  const resetSearch = useResetRecoilState(searchRepoState);
  const [userState, setUserState] = useState<IUserResource>({
    username: '',
    organizations: [],
  } as IUserResource);

  // Filtering Repositories after applied filter
  const filteredRepos =
    search.query !== ''
      ? repositoryList.filter((repo) => {
          const repoName =
            currentOrg == null ? `${repo.namespace}/${repo.name}` : repo.name;
          return repoName.includes(search.query);
        })
      : repositoryList;

  // Pagination related states
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const paginatedRepositoryList = filteredRepos.slice(
    page * perPage - perPage,
    page * perPage - perPage + perPage,
  );

  // Select related states
  const [selectedRepoNames, setSelectedRepoNames] =
    useRecoilState(selectedReposState);
  const isRepoSelectable = (repo: IRepository) => repo.name !== ''; // Arbitrary logic for this example
  const selectAllRepos = (isSelecting = true) =>
    setSelectedRepoNames(
      isSelecting ? filteredRepos.map((r) => r.namespace + '/' + r.name) : [],
    );

  const setRepoSelected = (repo: IRepository, isSelecting = true) =>
    setSelectedRepoNames((prevSelected) => {
      const otherSelectedRepoNames = prevSelected.filter(
        (r) => r !== repo.namespace + '/' + repo.name,
      );
      return isSelecting && isRepoSelectable(repo)
        ? [...otherSelectedRepoNames, repo.namespace + '/' + repo.name]
        : otherSelectedRepoNames;
    });

  const isRepoSelected = (repo: IRepository) =>
    selectedRepoNames.includes(repo.namespace + '/' + repo.name);

  const onSelectRepo = (
    repo: IRepository,
    rowIndex: number,
    isSelecting: boolean,
  ) => {
    setRepoSelected(repo, isSelecting);
  };

  const toggleMakePublicClick = () => {
    setmakePublicModal(!makePublicModalOpen);
  };

  const toggleMakePrivateClick = () => {
    setmakePrivateModal(!makePrivateModalOpen);
  };

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteModalToggle = () => {
    setKebabOpen(!isKebabOpen);
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleRepoDeletion = async (repos: IRepository[]) => {
    try {
      await bulkDeleteRepositories(repos);
    } catch (err) {
      if (err instanceof BulkOperationError) {
        const errMessages = [];
        // TODO: Would like to use for .. of instead of foreach
        // typescript complains saying we're using version prior to es6?
        err.getErrors().forEach((error, repo) => {
          errMessages.push(
            addDisplayError(`Failed to delete repository ${repo}`, error.error),
          );
        });
        setErr(errMessages);
      } else {
        setErr([addDisplayError('Failed to delete repository', err)]);
      }
    } finally {
      refresh();
      setSelectedRepoNames([]);
      setDeleteModalOpen(!isDeleteModalOpen);
    }
  };

  const kebabItems: ReactElement[] = [
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
  ];

  async function fetchRepos() {
    // clearing previous states
    setLoading(true);
    resetSearch();
    setRepositoryList([]);
    setSelectedRepoNames([]);
    try {
      const user = await fetchUser();
      setUserState(user);

      // check if view is global vs scoped to a organization
      // TODO: we inculde username as part of org list
      // fix this after we have MyQuay page
      const listOfOrgNames: string[] = currentOrg
        ? [currentOrg]
        : user.organizations.map((org) => org.name).concat(user.username);

      const repos = (await fetchAllRepos(
        listOfOrgNames,
        true,
      )) as IRepository[];

      // default sort by last modified
      // TODO (syahmed): redo this when we have user selectable sorting
      repos.sort((r1, r2) => {
        return r1.last_modified > r2.last_modified ? -1 : 1;
      });

      // TODO: Here we're formatting repo's into the correct
      // type. Once we know the return type from the repo's
      // API we should pass 'repos' directly into 'setRepositoryList'
      const formattedRepos: RepoListTableItem[] = repos.map((repo) => {
        return {
          namespace: repo.namespace,
          name: repo.name,
          is_public: repo.is_public,
          last_modified: repo.last_modified,
          size: repo.quota_report?.quota_bytes,
        } as RepoListTableItem;
      });
      setRepositoryList(formattedRepos);
    } catch (err) {
      console.error(err);
      setLoadingErr(addDisplayError('Unable to get repositories', err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRepos();
  }, [pageRefreshIndex]);

  const updateListHandler = (value: IRepository) => {
    setRepositoryList((prev) => [...prev, value]);
  };

  /* Mapper object used to render bulk delete table
    - keys are actual column names of the table
    - value is an object type with a "label" which maps to the attributes of <T>
      and an optional "transformFunc" which can be used to modify the value being displayed */
  const mapOfColNamesToTableData = {
    Repository: {
      label: 'name',
      transformFunc: (item: IRepository) => {
        return `${item.namespace}/${item.name}`;
      },
    },
    Visibility: {
      label: 'is_public',
      transformFunc: (item: IRepository) =>
        item.is_public ? 'public' : 'private',
    },
    Size: {
      label: 'size',
      transformFunc: (item: IRepository) => formatSize(item.size),
    },
  };

  const createRepoModal = (
    <CreateRepositoryModalTemplate
      isModalOpen={isCreateRepoModalOpen}
      handleModalToggle={() => setCreateRepoModalOpen(!isCreateRepoModalOpen)}
      orgName={currentOrg}
      updateListHandler={updateListHandler}
      username={userState.username}
      organizations={userState.organizations}
    />
  );

  const deleteRepositoryModal = (
    <BulkDeleteModalTemplate
      mapOfColNamesToTableData={mapOfColNamesToTableData}
      handleModalToggle={handleDeleteModalToggle}
      handleBulkDeletion={handleRepoDeletion}
      isModalOpen={isDeleteModalOpen}
      selectedItems={repositoryList.filter((repo) =>
        selectedRepoNames.some(
          (selected) => repo.namespace + '/' + repo.name === selected,
        ),
      )}
      resourceName={'repositories'}
    />
  );

  // Return component Loading state
  if (loading) {
    return (
      <>
        <RepoListHeader shouldRender={currentOrg === null} />
        <LoadingPage />
      </>
    );
  }

  // Return component Error state
  if (isErrorString(loadingErr)) {
    return (
      <>
        <RepoListHeader shouldRender={currentOrg === null} />
        <RequestError message={loadingErr} />
      </>
    );
  }

  // Return component Empty state
  if (!loading && !repositoryList?.length) {
    return (
      <Empty
        icon={CubesIcon}
        title="There are no viewable repositories"
        body="Either no repositories exist yet or you may not have permission to view any. If you have permission, try creating a new repository."
        button={
          <ToolbarButton
            buttonValue="Create Repository"
            Modal={createRepoModal}
            isModalOpen={isCreateRepoModalOpen}
            setModalOpen={setCreateRepoModalOpen}
          />
        }
      />
    );
  }

  return (
    <>
      <RepoListHeader shouldRender={currentOrg === null} />
      <PageSection variant={PageSectionVariants.light}>
        <ErrorModal title="Org deletion failed" error={err} setError={setErr} />
        <RepositoryToolBar
          currentOrg={currentOrg}
          createRepoModal={createRepoModal}
          isCreateRepoModalOpen={isCreateRepoModalOpen}
          setCreateRepoModalOpen={setCreateRepoModalOpen}
          isKebabOpen={isKebabOpen}
          setKebabOpen={setKebabOpen}
          kebabItems={kebabItems}
          selectedRepoNames={selectedRepoNames}
          deleteModal={deleteRepositoryModal}
          deleteKebabIsOpen={isDeleteModalOpen}
          makePublicModalOpen={makePublicModalOpen}
          toggleMakePublicClick={toggleMakePublicClick}
          makePrivateModalOpen={makePrivateModalOpen}
          toggleMakePrivateClick={toggleMakePrivateClick}
          selectAllRepos={selectAllRepos}
          repositoryList={filteredRepos}
          perPage={perPage}
          page={page}
          setPage={setPage}
          setPerPage={setPerPage}
          setSelectedRepoNames={setSelectedRepoNames}
          paginatedRepositoryList={paginatedRepositoryList}
          onSelectRepo={onSelectRepo}
        />
        <TableComposable aria-label="Selectable table">
          <Thead>
            <Tr>
              <Th />
              <Th>{ColumnNames.name}</Th>
              <Th>{ColumnNames.visibility}</Th>
              {quayConfig?.features.QUOTA_MANAGEMENT ? (
                <Th>{ColumnNames.size}</Th>
              ) : (
                <></>
              )}
              <Th>{ColumnNames.lastModified}</Th>
            </Tr>
          </Thead>
          <Tbody data-testid="repository-list-table">
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
                  <Td dataLabel={ColumnNames.name}>
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
                  <Td dataLabel={ColumnNames.visibility}>
                    {repo.is_public ? 'public' : 'private'}
                  </Td>
                  {quayConfig?.features.QUOTA_MANAGEMENT ? (
                    <Td dataLabel={ColumnNames.size}>
                      {' '}
                      {formatSize(repo.size)}
                    </Td>
                  ) : (
                    <></>
                  )}
                  <Td dataLabel={ColumnNames.lastModified}>
                    {formatDate(repo.last_modified)}
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </TableComposable>
        <PanelFooter>
          <ToolbarPagination
            itemsList={filteredRepos}
            perPage={perPage}
            page={page}
            setPage={setPage}
            setPerPage={setPerPage}
            bottom={true}
          />
        </PanelFooter>
      </PageSection>
    </>
  );
}

interface RepoListTableItem {
  namespace: string;
  name: string;
  is_public: boolean;
  size: number;
  last_modified: number;
}
