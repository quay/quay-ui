import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import {
  Button,
  TextInput,
  Page,
  PageSection,
  PageSectionVariants,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Select,
  SelectOption,
  SelectVariant,
  SelectGroup,
  Slider,
} from '@patternfly/react-core';

import './css/Organizations.scss';
import {CreateOrganizationModal} from './CreateOrganizationModal';
import {Link} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {UserOrgs} from 'src/atoms/UserState';
import {deleteOrg} from 'src/resources/OrganisationResource';
import {useEffect, useState} from 'react';
import * as React from 'react';

export default function OrganizationsList() {
  const [organizationsList, setOrganizationsList] = useState<
    OrganizationsListProps[]
  >([]);
  const [isOrganizationModalOpen, setOrganizationModalOpen] = useState(false);
  const [organizationSearchInput, setOrganizationSearchInput] = useState(
    'Filter by name or ID..',
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<string[]>(
    [],
  );

  const userOrgs = useRecoilValue(UserOrgs);

  const columnNames = {
    name: 'Organization',
    repoCount: 'Repo Count',
    tagCount: 'Tags',
    size: 'Size',
    pulls: 'Pulls (Activity)',
    lastPull: 'Last Pull',
    lastModified: 'Last Modified',
  };

  const handleModalToggle = () => {
    setOrganizationModalOpen(!isOrganizationModalOpen);
  };

  const handleFilteredSearch = (value: any) => {
    setOrganizationSearchInput(value);
  };

  const onSelect = () => {
    // TODO: Add filter logic
  };

  // Logic for handling all ns checkbox selections from <Th>
  const selectAllOrganizations = (isSelecting = true) => {
    setSelectedOrganization(
      isSelecting ? organizationsList.map((ns) => ns.name) : [],
    );
  };

  const areAllOrganizationsSelected =
    selectedOrganization.length === organizationsList.length;

  // Logic for handling row-wise checkbox selection in <Td>
  const isOrganizationSelected = (ns: OrganizationsListProps) =>
    selectedOrganization.includes(ns.name);

  const setOrganizationChecked = (
    ns: OrganizationsListProps,
    isSelecting = true,
  ) =>
    setSelectedOrganization((prevSelected) => {
      const otherSelectedOrganizationNames = prevSelected.filter(
        (r) => r !== ns.name,
      );
      return isSelecting
        ? [...otherSelectedOrganizationNames, ns.name]
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

  useEffect(() => {
    if (userOrgs) {
      userOrgs.map((org: any) => {
        setOrganizationsList((prevOrganizations) => [
          ...prevOrganizations,
          {
            name: org.name,
            repoCount: 1,
            tagCount: 1,
            size: '1.1GB',
            pulls: 108,
            lastPull: 'TBA',
            lastModified: 'TBA',
          },
        ]);
      });
    }
  }, [userOrgs]);

  const onDelete = async () => {
    const x = selectedOrganization?.forEach(async (nsToBeDeleted) => {
      try {
        await deleteOrg(nsToBeDeleted);
        setOrganizationsList((prev) =>
          prev.filter((ns) => ns.name !== nsToBeDeleted),
        );
      } catch (e) {
        console.error(e);
      }
    });
  };

  const options = [
    <SelectGroup label="Role" key="group1">
      <SelectOption key={0} value="Public" />
      <SelectOption key={1} value="Private" />
    </SelectGroup>,
  ];

  return (
    <Page>
      <PageSection variant={PageSectionVariants.light} hasShadowBottom>
        <div className="co-m-nav-title--row">
          <Title headingLevel="h1">Organizations</Title>
        </div>
      </PageSection>

      <PageSection>
        <PageSection variant={PageSectionVariants.light}>
          <Toolbar>
            <ToolbarContent>
              <ToolbarItem spacer={{default: 'spacerNone'}}>
                <Select
                  variant={SelectVariant.checkbox}
                  aria-label="Select Input"
                  onToggle={() => setFilterOpen(!filterOpen)}
                  onSelect={onSelect}
                  isOpen={filterOpen}
                  placeholderText="Filter"
                >
                  {options}
                </Select>
              </ToolbarItem>
              <ToolbarItem>
                <TextInput
                  isRequired
                  type="search"
                  id="modal-with-form-form-name"
                  name="search input"
                  value={organizationSearchInput}
                  onChange={handleFilteredSearch}
                />
              </ToolbarItem>
              <ToolbarItem>
                <Button
                  isDisabled={selectedOrganization.length === 0}
                  variant="primary"
                  className="pf-c-button pf-m-plain"
                  type="button"
                  onClick={onDelete}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </ToolbarItem>
              <ToolbarItem alignment={{xl: 'alignRight'}}>
                <Button
                  variant="primary"
                  onClick={() => setOrganizationModalOpen(true)}
                >
                  Create Organization
                </Button>
                {isOrganizationModalOpen ? (
                  <CreateOrganizationModal
                    isModalOpen={isOrganizationModalOpen}
                    handleModalToggle={handleModalToggle}
                  />
                ) : null}
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>
          <TableComposable aria-label="Selectable table">
            <Thead>
              <Tr>
                <Th
                  select={{
                    onSelect: (_event, isSelecting) =>
                      selectAllOrganizations(isSelecting),
                    isSelected: areAllOrganizationsSelected,
                  }}
                />
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
              {organizationsList.map((org, rowIndex) => (
                <Tr key={org.name}>
                  <Td
                    select={{
                      rowIndex,
                      onSelect: (_event, isSelecting) =>
                        onSelectOrganization(org, rowIndex, isSelecting),
                      isSelected: isOrganizationSelected(org),
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
