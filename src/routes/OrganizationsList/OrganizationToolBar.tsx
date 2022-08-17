import {Toolbar, ToolbarContent, ToolbarItem} from '@patternfly/react-core';
import {DropdownCheckbox} from 'src/components/toolbar/DropdownCheckbox';
import {DropdownFilter} from 'src/components/toolbar/DropdownFilter';
import {FilterBar} from 'src/components/toolbar/FilterBar';
import {ToolbarButton} from 'src/components/toolbar/ToolbarButton';
import {Kebab} from 'src/components/toolbar/Kebab';
import {ToolbarPagination} from 'src/components/toolbar/Pagination';
import {filterOrgState} from 'src/atoms/UserState';
import {useRecoilState} from 'recoil';
import * as React from 'react';
import {DropdownItemProps} from '@patternfly/react-core/dist/esm/components/Dropdown/DropdownItem';

export function OrganizationToolBar(props: OrganizationToolBarProps) {
  const [filterOrg, setOrgFilter] = useRecoilState(filterOrgState);
  const filterOrgs = (value: string) => {
    setOrgFilter(value);
  };

  return (
    <Toolbar>
      <ToolbarContent>
        <DropdownCheckbox
          selectedItems={props.selectedOrganization}
          deSelectAll={props.setSelectedOrganization}
          allItemsList={props.organizationsList}
          itemsPerPageList={props.paginatedOrganizationsList}
          onItemSelect={props.onSelectOrganization}
        />
        <DropdownFilter />
        <FilterBar
          placeholderText="Filter by name"
          value={filterOrg}
          onChange={filterOrgs}
        />
        <ToolbarButton
          buttonValue="Create Organization"
          Modal={props.createOrgModal}
          isModalOpen={props.isOrganizationModalOpen}
          setModalOpen={props.setOrganizationModalOpen}
        />
        <ToolbarItem>
          {props.selectedOrganization?.length !== 0 ? (
            <Kebab
              isKebabOpen={props.isKebabOpen}
              setKebabOpen={props.setKebabOpen}
              kebabItems={props.kebabItems}
            />
          ) : null}
          {props.deleteKebabIsOpen ? props.deleteModal : null}
        </ToolbarItem>
        <ToolbarPagination
          repositoryList={props.organizationsList}
          perPage={props.perPage}
          page={props.page}
          setPage={props.setPage}
          setPerPage={props.setPerPage}
        />
      </ToolbarContent>
    </Toolbar>
  );
}

type OrganizationToolBarProps = {
  createOrgModal: object;
  isOrganizationModalOpen: boolean;
  setOrganizationModalOpen: (open) => void;
  isKebabOpen: boolean;
  setKebabOpen: (open) => void;
  kebabItems: React.FunctionComponent<DropdownItemProps>[];
  selectedOrganization: any[];
  deleteKebabIsOpen: boolean;
  deleteModal: object;
  organizationsList: any[];
  perPage: number;
  page: number;
  setPage: (pageNumber) => void;
  setPerPage: (perPageNumber) => void;
  setSelectedOrganization: (selectedOrgList) => void;
  paginatedOrganizationsList: any[];
  onSelectOrganization: (Org, rowIndex, isSelecting) => void;
};
