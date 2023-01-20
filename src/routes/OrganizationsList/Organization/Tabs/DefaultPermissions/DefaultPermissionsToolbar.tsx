import {
  Button,
  Flex,
  FlexItem,
  PanelFooter,
  Toolbar,
  ToolbarContent,
} from '@patternfly/react-core';
import {useState} from 'react';
import {DropdownCheckbox} from 'src/components/toolbar/DropdownCheckbox';
import {SearchDropdown} from 'src/components/toolbar/SearchDropdown';
import {SearchInput} from 'src/components/toolbar/SearchInput';
import {SearchState} from 'src/components/toolbar/SearchTypes';
import {ToolbarPagination} from 'src/components/toolbar/ToolbarPagination';
import {IDefaultPermission} from 'src/hooks/UseDefaultPermissions';
import {DrawerContentType} from '../../Organization';
import {permissionColumnNames} from './DefaultPermissions';

export default function DefaultPermissionsToolbar(
  props: DefaultPermissionsToolbarProps,
) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <>
      <Toolbar>
        <ToolbarContent>
          <DropdownCheckbox
            selectedItems={props.selectedItems}
            deSelectAll={props.deSelectAll}
            allItemsList={props.allItems}
            itemsPerPageList={props.paginatedItems}
            onItemSelect={props.onItemSelect}
          />
          <SearchDropdown
            items={props.searchOptions}
            searchState={props.search}
            setSearchState={props.setSearch}
          />
          <Flex className="pf-u-mr-md">
            <FlexItem>
              <SearchInput
                searchState={props.search}
                onChange={props.setSearch}
              />
            </FlexItem>
          </Flex>
          <Button
            //   aria-expanded={isCreatePermDrawerOpen}
            onClick={() =>
              props.setDrawerContent(
                DrawerContentType.CreatePermissionSpecificUser,
              )
            }
          >
            Create default permission
          </Button>
          <ToolbarPagination
            itemsList={props.allItems}
            perPage={props.perPage}
            page={props.page}
            setPage={props.setPage}
            setPerPage={props.setPerPage}
          />
        </ToolbarContent>
      </Toolbar>
      {props.children}
      <PanelFooter>
        <ToolbarPagination
          itemsList={props.allItems}
          perPage={props.perPage}
          page={props.page}
          setPage={props.setPage}
          setPerPage={props.setPerPage}
          bottom={true}
        />
      </PanelFooter>
    </>
  );
}

interface DefaultPermissionsToolbarProps {
  selectedItems: IDefaultPermission[];
  deSelectAll: () => void;
  allItems: IDefaultPermission[];
  paginatedItems: IDefaultPermission[];
  onItemSelect: (
    item: IDefaultPermission,
    rowIndex: number,
    isSelecting: boolean,
  ) => void;
  page: number;
  setPage: (page: number) => void;
  perPage: number;
  setPerPage: (perPage: number) => void;
  searchOptions: string[];
  search: SearchState;
  setSearch: (search: SearchState) => void;
  setDrawerContent: (content: DrawerContentType) => void;
  children?: React.ReactNode;
}
