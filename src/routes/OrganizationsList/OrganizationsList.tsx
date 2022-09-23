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
  PanelFooter,
  Skeleton,
} from '@patternfly/react-core';
import './css/Organizations.scss';
import {CreateOrganizationModal} from './CreateOrganizationModal';
import {Link} from 'react-router-dom';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {searchOrgsState, selectedOrgsState} from 'src/atoms/UserState';
import {useEffect, useState} from 'react';
import {
  bulkDeleteOrganizations,
  fetchAllOrgs,
  fetchOrgsAsSuperUser,
  IOrganization,
} from 'src/resources/OrganizationResource';
import {BulkDeleteModalTemplate} from 'src/components/modals/BulkDeleteModalTemplate';
import RequestError from 'src/components/errors/RequestError';
import {OrganizationToolBar} from './OrganizationToolBar';
import {CubesIcon} from '@patternfly/react-icons';
import {ToolbarButton} from 'src/components/toolbar/ToolbarButton';
import Empty from 'src/components/empty/Empty';
import {QuayBreadcrumb} from 'src/components/breadcrumb/Breadcrumb';
import {LoadingPage} from 'src/components/LoadingPage';
import {
  addDisplayError,
  BulkOperationError,
  isErrorString,
} from 'src/resources/ErrorHandling';
import ErrorModal from 'src/components/errors/ErrorModal';
import {
  fetchAllRepos,
  fetchRepositoriesForNamespace,
  IRepository,
} from 'src/resources/RepositoryResource';
import {fetchAllMembers} from 'src/resources/MembersResource';
import {
  fetchAllRobots,
  fetchRobotsForNamespace,
} from 'src/resources/RobotsResource';
import {formatDate} from 'src/libs/utils';
import {ToolbarPagination} from 'src/components/toolbar/ToolbarPagination';
import {
  fetchUser,
  fetchUsersAsSuperUser,
  IUserResource,
} from 'src/resources/UserResource';
import ColumnNames from './ColumnNames';
import {userRefreshOrgList} from 'src/hooks/UseRefreshPage';
import {refreshPageState} from 'src/atoms/OrganizationListState';
import {fetchQuayConfig} from 'src/resources/QuayConfig';

interface OrganizationsTableItem {
  name: string;
  repoCount: number;
  teamsCount: number | string;
  membersCount: number | string;
  robotsCount: number | string;
  lastModified: number;
}

function OrgListHeader() {
  return (
    <>
      <QuayBreadcrumb />
      <PageSection variant={PageSectionVariants.light}>
        <div className="co-m-nav-title--row">
          <Title headingLevel="h1">Organizations</Title>
        </div>
      </PageSection>
    </>
  );
}

export default function OrganizationsList() {
  const [isOrganizationModalOpen, setOrganizationModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const search = useRecoilValue(searchOrgsState);
  const resetSearch = useResetRecoilState(searchOrgsState);
  const [selectedOrganization, setSelectedOrganization] =
    useRecoilState(selectedOrgsState);
  const [err, setErr] = useState<string[]>();
  const [loadingErr, setLoadingErr] = useState<string>();
  const [organizationsList, setOrganizationsList] = useState<
    OrganizationsTableItem[]
  >([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isKebabOpen, setKebabOpen] = useState(false);
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const refresh = userRefreshOrgList();
  const refreshPageIndex = useRecoilValue(refreshPageState);

  const filteredOrgs =
    search.query !== ''
      ? organizationsList?.filter((repo) => repo.name.includes(search.query))
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
      refresh();
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

  // Get initial data required for rendering page
  useEffect(() => {
    // TODO: Many operations in this function are ran synchronously when
    // they can be ran async - look into running some of these calls in
    // parallel in the future
    const fetchData = async () => {
      try {
        setLoading(true);
        resetSearch();
        const quayConfig = await fetchQuayConfig();
        const user = await fetchUser();

        let orgnames: string[];
        if (quayConfig?.features.SUPERUSERS_FULL_ACCESS && user?.super_user) {
          const orgs: IOrganization[] = await fetchOrgsAsSuperUser();
          orgnames = orgs.map((org) => org.name);
        } else {
          orgnames = user?.organizations.map((org) => org.name);
        }

        // Populate org table temporarily with org names while we wait for org details to return
        const tempOrgsList: OrganizationsTableItem[] = orgnames.map((org) => {
          return {
            name: org,
            repoCount: null,
            membersCount: null,
            robotsCount: null,
            teamsCount: null,
            lastModified: 0,
          } as OrganizationsTableItem;
        });
        setOrganizationsList(tempOrgsList);
        setLoading(false);

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
              teamsCount: orgs[idx]?.teams
                ? Object.keys(orgs[idx]?.teams)?.length
                : 0,
              lastModified: getLastModifiedRepoTime(repos[idx]),
            } as OrganizationsTableItem;
          },
        );

        // Add the user namespace. If superuser get all user namespaces
        // otherwise default to the current user's namespace
        let usernames: string[];
        if (quayConfig?.features.SUPERUSERS_FULL_ACCESS && user?.super_user) {
          const users: IUserResource[] = await fetchUsersAsSuperUser();
          usernames = users.map((user) => user.username);
        } else {
          usernames = [user.username];
        }

        for (const username of usernames) {
          const userRepos = await fetchRepositoriesForNamespace(username);
          const userRobots = await fetchRobotsForNamespace(username, true);
          newOrgsList.push({
            name: username,
            repoCount: userRepos.length,
            membersCount: 'N/A',
            robotsCount: userRobots.length,
            teamsCount: 'N/A',
            lastModified: getLastModifiedRepoTime(userRepos),
          });
        }

        // sort on last modified
        // TODO revisit this after API changes, we don't have enough info to sort 2022-09-14
        // newOrgsList.sort((r1, r2) => {
        //   return r1.lastModified > r2.lastModified ? -1 : 1;
        // });

        setOrganizationsList(newOrgsList);
      } catch (err) {
        console.error(err);
        setLoadingErr(addDisplayError('Unable to get organizations', err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshPageIndex]);

  // Return component Loading state
  if (loading) {
    return (
      <>
        <OrgListHeader />
        <LoadingPage />
      </>
    );
  }

  // Return component Error state
  if (isErrorString(loadingErr)) {
    return (
      <>
        <OrgListHeader />
        <RequestError message={loadingErr} />
      </>
    );
  }

  // Return component Empty state
  if (!loading && !organizationsList?.length) {
    return (
      <>
        <OrgListHeader />
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
      </>
    );
  }

  return (
    <>
      <OrgListHeader />
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
              <Th>{ColumnNames.name}</Th>
              <Th>{ColumnNames.repoCount}</Th>
              <Th>{ColumnNames.teamsCount}</Th>
              <Th>{ColumnNames.membersCount}</Th>
              <Th>{ColumnNames.robotsCount}</Th>
              <Th>{ColumnNames.lastModified}</Th>
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
                <Td dataLabel={ColumnNames.name}>
                  <Link to={org.name}>{org.name}</Link>
                </Td>
                <Td dataLabel={ColumnNames.repoCount}>
                  {org.repoCount !== null ? (
                    org.repoCount
                  ) : (
                    <Skeleton width="100%" />
                  )}
                </Td>
                <Td dataLabel={ColumnNames.teamsCount}>
                  {org.teamsCount !== null ? (
                    org.teamsCount
                  ) : (
                    <Skeleton width="100%" />
                  )}
                </Td>
                <Td dataLabel={ColumnNames.membersCount}>
                  {org.membersCount !== null ? (
                    org.membersCount
                  ) : (
                    <Skeleton width="100%" />
                  )}
                </Td>
                <Td dataLabel={ColumnNames.robotsCount}>
                  {org.robotsCount !== null ? (
                    org.robotsCount
                  ) : (
                    <Skeleton width="100%" />
                  )}
                </Td>
                <Td dataLabel={ColumnNames.lastModified}>
                  {org.lastModified !== 0 ? (
                    formatDate(org.lastModified)
                  ) : (
                    <Skeleton width="100%" />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
        <PanelFooter>
          <ToolbarPagination
            itemsList={organizationsList}
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
