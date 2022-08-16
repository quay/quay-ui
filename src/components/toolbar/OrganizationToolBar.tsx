import {Toolbar, ToolbarContent, ToolbarItem} from '@patternfly/react-core';
import {DropdownCheckbox} from './DropdownCheckbox';
import {DropdownFilter} from './DropdownFilter';
import {FilterBar} from './FilterBar';
import {ToolbarButton} from './ToolbarButton';
import {Kebab} from './Kebab';
import {ToolbarPagination} from './Pagination';
import {filterOrgState} from 'src/atoms/UserState';
import {useRecoilState} from 'recoil';

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
          setItemAsSelected={props.setSelectedOrganization}
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
          {props.selectedOrganization.length !== 0 ? (
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
  kebabItems: any[];
  selectedOrganization: any[];
  deleteKebabIsOpen: boolean;
  deleteModal: object;
  organizationsList: any[];
  perPage: number;
  page: number;
  setPage: (pageNumber) => void;
  setPerPage: (perPageNumber) => void;
  setSelectedOrganization: (selectedOrgList) => void;
};
