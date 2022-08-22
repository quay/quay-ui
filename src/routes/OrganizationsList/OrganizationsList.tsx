import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import {
  Page,
  PageSection,
  PageSectionVariants,
  Title,
  DropdownItem,
} from '@patternfly/react-core';
import './css/Organizations.scss';
import {CreateOrganizationModal} from './CreateOrganizationModal';
import {Link} from 'react-router-dom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {filterOrgState, selectedOrgsState, UserOrgs} from 'src/atoms/UserState';
import {useEffect, useState} from 'react';
import {bulkDeleteOrganizations} from 'src/resources/OrganisationResource';
import {BulkDeleteModalTemplate} from 'src/components/modals/BulkDeleteModalTemplate';
import ErrorBoundary from 'src/components/errors/ErrorBoundary';
import {useRefreshUser} from 'src/hooks/UseRefreshUser';
import RequestError from 'src/components/errors/RequestError';
import {OrganizationToolBar} from './OrganizationToolBar';
import {CubesIcon} from '@patternfly/react-icons';
import {ToolbarButton} from 'src/components/toolbar/ToolbarButton';
import Empty from 'src/components/empty/Empty';

// Attempt to render OrganizationsList content,
// fallback to RequestError on failure
export default function OrganizationsList() {
  return (
    <Page>
      <PageSection variant={PageSectionVariants.light} hasShadowBottom>
        <div className="co-m-nav-title--row">
          <Title headingLevel="h1">Organizations</Title>
        </div>
      </PageSection>
      <PageSection>
        <ErrorBoundary
          fallback={<RequestError message={'Unable to load organizations.'} />}
        >
          <PageContent />
        </ErrorBoundary>
      </PageSection>
    </Page>
  );
}

function PageContent() {
  const [isOrganizationModalOpen, setOrganizationModalOpen] = useState(false);
  const [organizationSearchInput, setOrganizationSearchInput] = useState(
    'Filter by name or ID..',
  );
  const [loading, setLoading] = useState(true);

  const filter = useRecoilValue(filterOrgState);
  const [selectedOrganization, setSelectedOrganization] =
    useRecoilState(selectedOrgsState);
  const userOrgs = useRecoilValue(UserOrgs);
  const refreshUser = useRefreshUser();
  useEffect(() => {
    // Get latest organizations
    refreshUser();
    setLoading(false);
  }, []);
  // TODO: Using mock values here - remove in the future?
  const organizationsList = userOrgs.map((org) => ({
    name: org.name,
    repoCount: 1,
    tagCount: 1,
    size: '1.1GB',
    pulls: 108,
    lastPull: 'TBA',
    lastModified: 'TBA',
  }));

  const filteredOrgs =
    filter !== ''
      ? organizationsList.filter((repo) => repo.name.includes(filter))
      : organizationsList;

  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const paginatedOrganizationsList = filteredOrgs.slice(
    page * perPage - perPage,
    page * perPage - perPage + perPage,
  );

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const [isKebabOpen, setKebabOpen] = useState(false);

  const columnNames = {
    name: 'Organization',
    repoCount: 'Repo Count',
    tagCount: 'Tags',
    size: 'Size',
    pulls: 'Pulls (Activity)',
    lastPull: 'Last Pull',
    lastModified: 'Last Modified',
  };

  const handleFilteredSearch = (value: any) => {
    setOrganizationSearchInput(value);
  };

  const isOrgSelectable = (org) => org.name !== ''; // Arbitrary logic for this example
  // Logic for handling all ns checkbox selections from <Th>
  const selectAllOrganizations = (isSelecting = true) => {
    setSelectedOrganization(isSelecting ? filteredOrgs : []);
  };

  const areAllOrganizationsSelected =
    selectedOrganization.length === organizationsList.length;

  // Logic for handling row-wise checkbox selection in <Td>
  const isOrganizationSelected = (ns: OrganizationsListProps) =>
    selectedOrganization.some((org) => org.name === ns.name);

  const setOrganizationChecked = (
    ns: OrganizationsListProps,
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
    currentOrganization: OrganizationsListProps,
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

  const handleOrgDeletion = async () => {
    // Error handling is in BulkDeleteModalTemplate,
    // since that is where it is reported to the user.
    const orgs = selectedOrganization.map((org) => org.name);
    await bulkDeleteOrganizations(orgs);
    refreshUser();
    setSelectedOrganization([]);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const handleDeleteModalToggle = () => {
    setKebabOpen(!isKebabOpen);
    setDeleteModalIsOpen(!deleteModalIsOpen);
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
    Tags: {label: 'tagCount'},
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
      selectedItems={organizationsList.filter((org) =>
        selectedOrganization.some(
          (selectedOrg) => org.name === selectedOrg.name,
        ),
      )}
      resourceName={'organizations'}
    />
  );

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
    <Page>
      <PageSection>
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
                <Th>{columnNames.tagCount}</Th>
                <Th>{columnNames.size}</Th>
                <Th>{columnNames.pulls}</Th>
                <Th>{columnNames.lastPull}</Th>
                <Th>{columnNames.lastModified}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedOrganizationsList.map((org, rowIndex) => (
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
                  <Td dataLabel={columnNames.tagCount}>{org.tagCount}</Td>
                  <Td dataLabel={columnNames.size}>{org.size}</Td>
                  <Td dataLabel={columnNames.pulls}>{org.pulls}</Td>
                  <Td dataLabel={columnNames.lastPull}>{org.lastPull}</Td>
                  <Td dataLabel={columnNames.lastModified}>
                    {org.lastModified}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </TableComposable>
        </PageSection>
      </PageSection>
    </Page>
  );
}

type OrganizationsListProps = {
  name: string;
  repoCount: number;
  tagCount: number;
  size: string;
  pulls: number;
  lastPull: string;
  lastModified: string;
};
