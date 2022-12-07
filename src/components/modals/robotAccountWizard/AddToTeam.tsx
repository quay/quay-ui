import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import {
  PageSection,
  PanelFooter,
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupItemProps,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  DropdownItem,
} from '@patternfly/react-core';
import {ToolbarPagination} from 'src/components/toolbar/ToolbarPagination';
import {useRecoilState, useRecoilValue} from 'recoil';
import {selectedTeamsState, searchTeamState} from 'src/atoms/RobotAccountState';
import React, {useEffect, useState} from 'react';
import {DropdownCheckbox} from 'src/components/toolbar/DropdownCheckbox';
import {FilterWithDropdown} from 'src/components/toolbar/FilterWithDropdown';
import {DesktopIcon} from '@patternfly/react-icons';

const ColumnNames = {
  name: 'Team',
  role: 'Role',
  members: 'Members',
  lastUpdated: 'Last Updated',
};

type TableModeType = 'All' | 'Selected';

export default function AddToTeam(props: AddToTeamProps) {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedTeamsState);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableMode, setTableMode] = useState<TableModeType>('All');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [tableItems, setTableItems] = useState([]);
  const [search, setSearch] = useRecoilState(searchTeamState);

  const dropdownItems = [
    <DropdownItem
      key="separated action"
      component="button"
      icon={<DesktopIcon />}
    >
      Create new team
    </DropdownItem>,
  ];

  const onTableModeChange: ToggleGroupItemProps['onChange'] = (
    _isSelected,
    event,
  ) => {
    const id = event.currentTarget.id;
    setTableMode(id as TableModeType);
  };

  const setItemSelected = (item, isSelecting = true) =>
    setSelectedItems((prevSelected) => {
      const otherSelectedItems = prevSelected.filter((r) => r !== item.name);
      return isSelecting
        ? [...otherSelectedItems, item.name]
        : otherSelectedItems;
    });

  // Logic for handling row-wise checkbox selection in <Td>
  const isItemSelected = (item) => selectedItems.includes(item.name);

  const onSelectItem = (item, rowIndex: number, isSelecting: boolean) => {
    setItemSelected(item, isSelecting);
    setSelectedRows((prevSelected) => {
      const otherSelectedItems = prevSelected.filter((r) => r !== item.name);
      return isSelecting ? [...otherSelectedItems, item] : otherSelectedItems;
    });
  };

  useEffect(() => {
    if (tableMode == 'All') {
      setTableItems(props.items);
    } else if (tableMode == 'Selected') {
      setTableItems(selectedRows);
    }
  });

  const filteredItems =
    search.query !== ''
      ? tableItems.filter((item) => {
          const Itemname = item.name;
          return Itemname.includes(search.query);
        })
      : tableItems;

  const paginatedItems = filteredItems?.slice(
    page * perPage - perPage,
    page * perPage - perPage + perPage,
  );

  return (
    <>
      <PageSection>
        <Toolbar>
          <ToolbarContent>
            <DropdownCheckbox
              selectedItems={selectedItems}
              deSelectAll={setSelectedItems}
              allItemsList={props.items}
              itemsPerPageList={paginatedItems}
              onItemSelect={onSelectItem}
            />
            <ToolbarItem>
              <ToggleGroup aria-label="Default with single selectable">
                <ToggleGroupItem
                  text="All"
                  buttonId="All"
                  isSelected={tableMode === 'All'}
                  onChange={onTableModeChange}
                />
                <ToggleGroupItem
                  text="Selected"
                  buttonId="Selected"
                  isSelected={tableMode === 'Selected'}
                  onChange={onTableModeChange}
                />
              </ToggleGroup>
            </ToolbarItem>
            <FilterWithDropdown
              searchState={search}
              onChange={setSearch}
              dropdownItems={dropdownItems}
              searchInputText="Search, add"
            />
            <ToolbarPagination
              itemsList={filteredItems}
              perPage={perPage}
              page={page}
              setPage={setPage}
              setPerPage={setPerPage}
              total={filteredItems.length}
            />
          </ToolbarContent>
        </Toolbar>
        <TableComposable aria-label="Selectable table">
          <Thead>
            <Tr>
              <Th />
              <Th>{ColumnNames.name}</Th>
              <Th>{ColumnNames.role}</Th>
              <Th>{ColumnNames.members}</Th>
              <Th>{ColumnNames.lastUpdated}</Th>
            </Tr>
          </Thead>
          {paginatedItems.map((team, rowIndex) => {
            return (
              <Tbody key={team.name}>
                <Tr>
                  <Td
                    select={{
                      rowIndex,
                      onSelect: (_event, isSelecting) =>
                        onSelectItem(team, rowIndex, isSelecting),
                      isSelected: isItemSelected(team),
                    }}
                  />
                  <Td dataLabel={ColumnNames.name}>{team.name}</Td>
                  <Td dataLabel={ColumnNames.role}>{team.role}</Td>
                  <Td dataLabel={ColumnNames.members}>
                    {team.member_count > 1
                      ? team.member_count + ' Members'
                      : team.member_count + ' Member'}
                  </Td>
                  <Td dataLabel={ColumnNames.lastUpdated}>
                    {team.last_updated ? team.last_updated : 'Never'}
                  </Td>
                </Tr>
              </Tbody>
            );
          })}
        </TableComposable>
        <PanelFooter>
          <ToolbarPagination
            itemsList={filteredItems}
            perPage={perPage}
            page={page}
            setPage={setPage}
            setPerPage={setPerPage}
            bottom={true}
            total={filteredItems.length}
          />
        </PanelFooter>
      </PageSection>
    </>
  );
}

interface AddToTeamProps {
  items: any[];
  namespace: string;
}
