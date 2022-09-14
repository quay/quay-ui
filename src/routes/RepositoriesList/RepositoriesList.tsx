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
import {UserState} from 'src/atoms/UserState';
import {
  bulkDeleteRepositories,
  fetchAllRepos,
  IRepository,
} from 'src/resources/RepositoryResource';
import {ReactElement, Suspense, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import CreateRepositoryModalTemplate from 'src/components/modals/CreateRepoModalTemplate';
import {getRepoDetailPath} from 'src/routes/NavigationPath';
import {selectedReposState, searchRepoState} from 'src/atoms/RepositoryState';
import {formatDate, formatSize} from 'src/libs/utils';
import {BulkDeleteModalTemplate} from 'src/components/modals/BulkDeleteModalTemplate';
import {RepositoryToolBar} from 'src/routes/RepositoriesList/RepositoryToolBar';
import {
  addDisplayError,
  BulkOperationError,
  isErrorString,
} from 'src/resources/ErrorHandling';
import ErrorBoundary from 'src/components/errors/ErrorBoundary';
import {useRefreshUser} from 'src/hooks/UseRefreshUser';
import RequestError from 'src/components/errors/RequestError';
import Empty from 'src/components/empty/Empty';
import {CubesIcon} from '@patternfly/react-icons';
import {ToolbarButton} from 'src/components/toolbar/ToolbarButton';
import {QuayBreadcrumb} from 'src/components/breadcrumb/Breadcrumb';
import {LoadingPage} from 'src/components/LoadingPage';
import ErrorModal from 'src/components/errors/ErrorModal';
import {useQuayConfig} from 'src/hooks/UseQuayConfig';
import {ToolbarPagination} from 'src/components/toolbar/ToolbarPagination';
import ColumnNames from './ColumnNames';

function getReponameFromURL(pathname: string): string {
  return pathname.includes('organizations') ? pathname.split('/')[2] : null;
}

// Attempt to render RepositoriesList, fallback to RequestError
// on failure
export default function RepositoriesList() {
  const currentOrg = getReponameFromURL(useLocation().pathname);
  const [loadingErr, setLoadingErr] = useState<string>();
  return (
    <>
      {currentOrg === null ? <RepoListTitle /> : null}
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary
          hasError={isErrorString(loadingErr)}
          fallback={
            <RequestError
              message={
                isErrorString(loadingErr)
                  ? loadingErr
                  : 'Unable to load repositories'
              }
            />
          }
        >
          <RepoListContent
            currentOrg={currentOrg}
            setLoadingErr={setLoadingErr}
          />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

function RepoListTitle() {
  return (
    <div>
      <QuayBreadcrumb />
      <PageSection variant={PageSectionVariants.light} hasShadowBottom>
        <div className="co-m-nav-title--row">
          <Title headingLevel="h1">Repositories</Title>
        </div>
      </PageSection>
    </div>
  );
}

function RepoListContent(props: RepoListContentProps) {
  const [isCreateRepoModalOpen, setCreateRepoModalOpen] = useState(false);
  const [isKebabOpen, setKebabOpen] = useState(false);
  const [makePublicModalOpen, setmakePublicModal] = useState(false);
  const [makePrivateModalOpen, setmakePrivateModal] = useState(false);
  const [repositoryList, setRepositoryList] = useState<IRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLoaded, setUserLoaded] = useState(false);
  const userState = useRecoilValue(UserState);
  const refreshUser = useRefreshUser();
  const [err, setErr] = useState<string[]>();
  const quayConfig = useQuayConfig();
  const search = useRecoilValue(searchRepoState);
  const resetSearch = useResetRecoilState(searchRepoState);

  useEffect(() => {
    // Get latest organizations
    refreshUser();
    setUserLoaded(true);
    resetSearch();
  }, []);

  // Filtering Repositories after applied filter
  const filteredRepos =
    search.query !== ''
      ? repositoryList.filter((repo) => repo.name.includes(search.query))
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
      refreshUser();
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
    <DropdownItem key="Set team permissions">
      Set team permissions
    </DropdownItem>,
  ];

  async function fetchRepos() {
    // clearing previous states
    setLoading(true);
    setRepositoryList([]);
    setSelectedRepoNames([]);
    if (userState) {
      // check if view is global vs scoped to a organization
      // TODO: we inculde username as part of org list
      // fix this after we have MyQuay page
      const listOfOrgNames: string[] = props.currentOrg
        ? [props.currentOrg]
        : userState.organizations
            .map((org) => org.name)
            .concat(userState.username);

      try {
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
        setLoading(false);
      } catch (err) {
        console.error(err);
        props.setLoadingErr(addDisplayError('Unable to get repositories', err));
      }
    }
  }

  useEffect(() => {
    // TODO: error handling
    if (userLoaded) {
      fetchRepos();
    }
  }, [userState, userLoaded]);

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
      orgName={props.currentOrg}
      updateListHandler={updateListHandler}
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
    <PageSection variant={PageSectionVariants.light}>
      <ErrorModal title="Org deletion failed" error={err} setError={setErr} />
      <RepositoryToolBar
        currentOrg={props.currentOrg}
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
        repositoryList={repositoryList}
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
                <Td dataLabel={ColumnNames.name}>
                  {props.currentOrg == null ? (
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
                  <Td dataLabel={ColumnNames.size}> {formatSize(repo.size)}</Td>
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
          itemsList={repositoryList}
          perPage={perPage}
          page={page}
          setPage={setPage}
          setPerPage={setPerPage}
          bottom={true}
        />
      </PanelFooter>
    </PageSection>
  );
}

interface RepoListContentProps {
  currentOrg: string;
  setLoadingErr: (message: string) => void;
}

interface RepoListTableItem {
  namespace: string;
  name: string;
  is_public: boolean;
  size: number;
  last_modified: number;
}
