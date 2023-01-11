import {useRecoilState} from 'recoil';
import {searchRepoState, selectedReposState} from 'src/atoms/RepositoryState';
import React, {useEffect, useState} from 'react';
import {
  DropdownItem,
  PageSection,
  PanelFooter,
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupItemProps,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import {DropdownCheckbox} from 'src/components/toolbar/DropdownCheckbox';
import {FilterInput} from 'src/components/toolbar/FilterInput';
import {ToolbarPagination} from 'src/components/toolbar/ToolbarPagination';
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import {useRepositories} from 'src/hooks/UseRepositories';
import {DropdownWithDescription} from 'src/components/toolbar/DropdownWithDescription';

const ColumnNames = {
  name: 'Repository',
  permissions: 'Permissions',
  lastUpdated: 'Last Updated',
};

type TableModeType = 'All' | 'Selected';

export default function AddToRepository(props: AddToRepositoryProps) {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedReposState);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableMode, setTableMode] = useState<TableModeType>('All');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [tableItems, setTableItems] = useState([]);
  const [dropdownToggle, setDropdownToggle] = useState('None');
  const [search, setSearch] = useRecoilState(searchRepoState);

  // Fetching repos
  const {repos: repos, totalResults: repoCount} = useRepositories(
    props.namespace,
  );

  repos.sort((r1, r2) => {
    return r1.last_modified > r2.last_modified ? -1 : 1;
  });

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
      setTableItems(repos);
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
              allItemsList={repos}
              itemsPerPageList={paginatedItems}
              onItemSelect={onSelectItem}
            />
            <FilterInput searchState={search} onChange={setSearch} />
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
              <Th>{ColumnNames.permissions}</Th>
              <Th>{ColumnNames.lastUpdated}</Th>
            </Tr>
          </Thead>
          {paginatedItems.map((repo, rowIndex) => {
            return (
              <Tbody key={repo.name}>
                <Tr>
                  <Td
                    select={{
                      rowIndex,
                      onSelect: (_event, isSelecting) =>
                        onSelectItem(repo, rowIndex, isSelecting),
                      isSelected: isItemSelected(repo),
                    }}
                  />
                  <Td dataLabel={ColumnNames.name}>{repo.name}</Td>
                  <Td dataLabel={ColumnNames.permissions}>
                    <DropdownWithDescription
                      dropdownItems={props.dropdownItems}
                    />
                  </Td>
                  <Td dataLabel={ColumnNames.lastUpdated}>
                    {repo.last_modified ? repo.last_modified : 'Never'}
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

interface AddToRepositoryProps {
  namespace: string;
  dropdownItems: any[];
}
