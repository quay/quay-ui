import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import {
  PageSection,
  PageSectionVariants,
  Title,
  DropdownItem,
  Spinner,
} from '@patternfly/react-core';
import './css/Organizations.scss';
import {CreateOrganizationModal} from './CreateOrganizationModal';
import {Link} from 'react-router-dom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  filterOrgState,
  selectedOrgsState,
  UserState,
} from 'src/atoms/UserState';
import {Suspense, useEffect, useState} from 'react';
import {
  bulkDeleteOrganizations,
  fetchAllOrgs,
} from 'src/resources/OrganizationResource';
import {BulkDeleteModalTemplate} from 'src/components/modals/BulkDeleteModalTemplate';
import ErrorBoundary from 'src/components/errors/ErrorBoundary';
import {useRefreshUser} from 'src/hooks/UseRefreshUser';
import RequestError from 'src/components/errors/RequestError';
import {OrganizationToolBar} from './OrganizationToolBar';
import {CubesIcon} from '@patternfly/react-icons';
import {ToolbarButton} from 'src/components/toolbar/ToolbarButton';
import Empty from 'src/components/empty/Empty';
import {QuayBreadcrumb} from 'src/components/breadcrumb/Breadcrumb';
import {LoadingPage} from 'src/components/LoadingPage';
import {addDisplayError, BulkOperationError} from 'src/resources/ErrorHandling';
import ErrorModal from 'src/components/errors/ErrorModal';
import {
  fetchAllRepos,
  fetchRepositoriesForNamespace,
  IRepository,
} from 'src/resources/RepositoryResource';
import {
  fetchAllMembers,
  fetchMembersForOrg,
} from 'src/resources/MembersResource';
import {
  fetchAllRobots,
  fetchRobotsForNamespace,
} from 'src/resources/RobotsResource';
import {formatDate} from 'src/libs/utils';

interface OrganizationsTableItem {
  name: string;
  repoCount: number;
  teamsCount: number | string;
  membersCount: number | string;
  robotsCount: number | string;
  lastModified: number;
}

const columnNames = {
  name: 'Organization',
  repoCount: 'Repo Count',
  teamsCount: 'Teams',
  membersCount: 'Members',
  robotsCount: 'Robots',
  lastModified: 'Last Modified',
};

// Attempt to render OrganizationsList content,
// fallback to RequestError on failure
export default function OrganizationsList() {
  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <div className="co-m-nav-title--row">
          <Title headingLevel="h1">Organizations</Title>
        </div>
      </PageSection>
      <Suspense fallback={<LoadingPage />}>
        <ErrorBoundary
          fallback={<RequestError message={'Unable to load organizations.'} />}
        >
          <PageContent />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

function PageContent() {
  const [isOrganizationModalOpen, setOrganizationModalOpen] = useState(false);
  const [, setOrganizationSearchInput] = useState('Filter by name or ID..');
  const [loading, setLoading] = useState(true);
  const filter = useRecoilValue(filterOrgState);
  const [selectedOrganization, setSelectedOrganization] =
    useRecoilState(selectedOrgsState);
  const [err, setErr] = useState<string[]>();
  const userState = useRecoilValue(UserState);
  const [organizationsList, setOrganizationsList] = useState<
    OrganizationsTableItem[]
  >([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isKebabOpen, setKebabOpen] = useState(false);
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const refreshUser = useRefreshUser();

  const filteredOrgs =
    filter !== ''
      ? organizationsList?.filter((repo) => repo.name.includes(filter))
      : organizationsList;

  const paginatedOrganizationsList = filteredOrgs?.slice(
    page * perPage - perPage,
    page * perPage - perPage + perPage,
  );

  const isOrgSelectable = (org) => org.name !== ''; // Arbitrary logic for this example

  // Logic for handling row-wise checkbox selection in <Td>
  const isOrganizationSelected = (ns: OrganizationsTableItem) =>
    selectedOrganization.some((org) => org.name === ns.name);

  const setOrganizationChecked = (
    ns: OrganizationsTableItem,
    isSelecting = true,
  ) =>
    setSelectedOrganization((prevSelected) => {
      const otherSelectedOrganizationNames = prevSelected.filter(
        (r) => r.name !== ns.name,
      );
      return isSelecting && isOrgSelectable(ns)
        ? [...otherSelectedOrganizationNames, ns]
        : otherSelectedOrganizationNames;
    });

  // To allow shift+click to select/deselect multiple rows
  const [recentSelectedRowIndex, setRecentSelectedRowIndex] = useState<
    number | null
  >(null);
  const [shifting, setShifting] = useState(false);

  const onSelectOrganization = (
    currentOrganization: OrganizationsTableItem,
    rowIndex: number,
    isSelecting: boolean,
  ) => {
    // If the user is shift + selecting the checkboxes, then all intermediate checkboxes should be selected
    if (shifting && recentSelectedRowIndex !== null) {
      const numberSelected = rowIndex - recentSelectedRowIndex;
      const intermediateIndexes =
        numberSelected > 0
          ? Array.from(
              new Array(numberSelected + 1),
              (_x, i) => i + recentSelectedRowIndex,
            )
          : Array.from(
              new Array(Math.abs(numberSelected) + 1),
              (_x, i) => i + rowIndex,
            );
      intermediateIndexes.forEach((index) =>
        setOrganizationChecked(organizationsList[index], isSelecting),
      );
    } else {
      setOrganizationChecked(currentOrganization, isSelecting);
    }
    setRecentSelectedRowIndex(rowIndex);
  };

  const handleOrgDeletion = async () => {
    // Error handling is in BulkDeleteModalTemplate,
    // since that is where it is reported to the user.
    try {
      const orgs = selectedOrganization.map((org) => org.name);
      await bulkDeleteOrganizations(orgs);
    } catch (err) {
      console.error(err);
      if (err instanceof BulkOperationError) {
        const errMessages = [];
        // TODO: Would like to use for .. of instead of foreach
        // typescript complains saying we're using version prior to es6?
        err.getErrors().forEach((error, org) => {
          errMessages.push(
            addDisplayError(`Failed to delete org ${org}`, error.error),
          );
        });
        setErr(errMessages);
      } else {
        setErr([addDisplayError('Failed to delete orgs', err)]);
      }
    } finally {
      setDeleteModalIsOpen(!deleteModalIsOpen);
      refreshUser();
      setSelectedOrganization([]);
    }
  };

  const handleDeleteModalToggle = () => {
    setKebabOpen(!isKebabOpen);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const getLastModifiedRepoTime = (repos: IRepository[]) => {
    // get the repo with the most recent last modified
    if (!repos || !repos.length) {
      return -1;
    }

    const recentRepo = repos.reduce((prev, curr) =>
      prev.last_modified < curr.last_modified ? curr : prev,
    );
    return recentRepo.last_modified;
  };

  const kebabItems = [
    <DropdownItem key="delete" onClick={handleDeleteModalToggle}>
      Delete
    </DropdownItem>,
  ];

  /* Mapper object used to render bulk delete table
    - keys are actual column names of the table
    - value is an object type with a "label" which maps to the attributes of <T>
      and an optional "transformFunc" which can be used to modify the value being displayed */
  const mapOfColNamesToTableData = {
    Organization: {label: 'name'},
    'Repo Count': {
      label: 'repoCount',
    },
  };

  const createOrgModal = (
    <CreateOrganizationModal
      isModalOpen={isOrganizationModalOpen}
      handleModalToggle={() =>
        setOrganizationModalOpen(!isOrganizationModalOpen)
      }
    />
  );

  const deleteModal = (
    <BulkDeleteModalTemplate
      mapOfColNamesToTableData={mapOfColNamesToTableData}
      handleModalToggle={() => setDeleteModalIsOpen(!deleteModalIsOpen)}
      handleBulkDeletion={handleOrgDeletion}
      isModalOpen={deleteModalIsOpen}
      selectedItems={organizationsList?.filter((org) =>
        selectedOrganization.some(
          (selectedOrg) => org.name === selectedOrg.name,
        ),
      )}
      resourceName={'organizations'}
    />
  );

  useEffect(() => {
    // Get latest organizations
    refreshUser();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShifting(true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShifting(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // Render the table with userState changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const orgnames: string[] = userState?.organizations.map(
          (org) => org.name,
        );

        const orgs = await fetchAllOrgs(orgnames);
        const repos = (await fetchAllRepos(orgnames, false)) as Map<
          string,
          IRepository[]
        >;
        const members = await fetchAllMembers(orgnames);
        const robots = await fetchAllRobots(orgnames);

        const newOrgsList: OrganizationsTableItem[] = orgnames.map(
          (org, idx) => {
            return {
              name: org,
              repoCount: repos[idx].length,
              membersCount: members[idx].length,
              robotsCount: robots[idx].length,
              teamsCount: Object.keys(orgs[idx]?.teams)?.length,
              lastModified: getLastModifiedRepoTime(repos[idx]),
            } as OrganizationsTableItem;
          },
        );

        // Add the user namespace entry
        const userRepos = await fetchRepositoriesForNamespace(
          userState.username,
        );
        const userRobots = await fetchRobotsForNamespace(
          userState.username,
          true,
        );

        newOrgsList.push({
          name: userState.username,
          repoCount: userRepos.length,
          membersCount: 'N/A',
          robotsCount: userRobots.length,
          teamsCount: 'N/A',
          lastModified: getLastModifiedRepoTime(userRepos),
        });

        // sort on last modified
        // TODO (syahmed): redo this when we have user selectable sorting
        newOrgsList.sort((r1, r2) => {
          return r1.lastModified > r2.lastModified ? -1 : 1;
        });

        setOrganizationsList(newOrgsList);
      } catch (e) {
        // TODO (syahmed): error handling
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData().catch(console.error);
  }, [userState]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!loading && !organizationsList?.length) {
    return (
      <Empty
        icon={CubesIcon}
        title="Collaborate and share projects across teams"
        body="Create a shared space of public and private repositories for your developers to collaborate in. Organizations make it easy to add and manage people and permissions"
        button={
          <ToolbarButton
            buttonValue="Create Organization"
            Modal={createOrgModal}
            isModalOpen={isOrganizationModalOpen}
            setModalOpen={setOrganizationModalOpen}
          />
        }
      />
    );
  }

  return (
    <>
      <QuayBreadcrumb />
      <ErrorModal title="Org deletion failed" error={err} setError={setErr} />
      <PageSection variant={PageSectionVariants.light}>
        <OrganizationToolBar
          createOrgModal={createOrgModal}
          isOrganizationModalOpen={isOrganizationModalOpen}
          setOrganizationModalOpen={setOrganizationModalOpen}
          isKebabOpen={isKebabOpen}
          setKebabOpen={setKebabOpen}
          kebabItems={kebabItems}
          selectedOrganization={selectedOrganization}
          deleteKebabIsOpen={deleteModalIsOpen}
          deleteModal={deleteModal}
          organizationsList={organizationsList}
          perPage={perPage}
          page={page}
          setPage={setPage}
          setPerPage={setPerPage}
          setSelectedOrganization={setSelectedOrganization}
          paginatedOrganizationsList={paginatedOrganizationsList}
          onSelectOrganization={onSelectOrganization}
        />
        <TableComposable aria-label="Selectable table">
          <Thead>
            <Tr>
              <Th />
              <Th>{columnNames.name}</Th>
              <Th>{columnNames.repoCount}</Th>
              <Th>{columnNames.teamsCount}</Th>
              <Th>{columnNames.membersCount}</Th>
              <Th>{columnNames.robotsCount}</Th>
              <Th>{columnNames.lastModified}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedOrganizationsList?.map((org, rowIndex) => (
              <Tr key={rowIndex}>
                <Td
                  select={{
                    rowIndex,
                    onSelect: (_event, isSelecting) =>
                      onSelectOrganization(org, rowIndex, isSelecting),
                    isSelected: isOrganizationSelected(org),
                    disable: !isOrgSelectable(org),
                  }}
                />
                <Td dataLabel={columnNames.name}>
                  <Link to={org.name}>{org.name}</Link>
                </Td>
                <Td dataLabel={columnNames.repoCount}>{org.repoCount}</Td>
                <Td dataLabel={columnNames.teamsCount}>{org.teamsCount}</Td>
                <Td dataLabel={columnNames.membersCount}>{org.membersCount}</Td>
                <Td dataLabel={columnNames.robotsCount}>{org.robotsCount}</Td>
                <Td dataLabel={columnNames.lastModified}>
                  {formatDate(org.lastModified)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </PageSection>
    </>
  );
}
