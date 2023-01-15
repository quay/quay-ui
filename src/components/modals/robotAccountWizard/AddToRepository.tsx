import {useRecoilState} from 'recoil';
import {searchRepoState} from 'src/atoms/RepositoryState';
import React, {useEffect, useState} from 'react';
import {
  PageSection,
  PanelFooter,
  Text,
  TextContent,
  TextVariants,
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
import {DropdownWithDescription} from 'src/components/toolbar/DropdownWithDescription';

const ColumnNames = {
  name: 'Repository',
  permissions: 'Permissions',
  lastUpdated: 'Last Updated',
};

type TableModeType = 'All' | 'Selected';

export default function AddToRepository(props: AddToRepositoryProps) {
  const [tableMode, setTableMode] = useState<TableModeType>('All');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [tableItems, setTableItems] = useState([]);
  const [search, setSearch] = useRecoilState(searchRepoState);

  props.repos.sort((r1, r2) => {
    return r1.last_modified > r2.last_modified ? -1 : 1;
  });

  const onTableModeChange: ToggleGroupItemProps['onChange'] = (
    _isSelected,
    event,
  ) => {
    const id = event.currentTarget.id;
    setTableMode(id as TableModeType);
    if (id == 'All') {
      setTableItems(props.repos);
    } else if (id == 'Selected') {
      const selectedItems = [];
      props.repos.map(function (repo) {
        if (props.selectedRepos.includes(repo.name)) {
          selectedItems.push(repo);
        }
      });
      setTableItems(selectedItems);
    }
  };

  const setItemSelected = (item, isSelecting = true) => {
    props.setSelectedRepos((prevSelected) => {
      const otherSelectedItems = prevSelected.filter((r) => r !== item.name);
      return isSelecting
        ? [...otherSelectedItems, item.name]
        : otherSelectedItems;
    });
  };

  // Logic for handling row-wise checkbox selection in <Td>
  const isItemSelected = (item) => props.selectedRepos.includes(item.name);

  const onSelectItem = (item, rowIndex: number, isSelecting: boolean) => {
    setItemSelected(item, isSelecting);
  };

  useEffect(() => {
    if (tableMode == 'All') {
      setTableItems(props.repos);
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

  const updateRepoPerms = (permission, repo) => {
    // Remove item if already present
    props.setSelectedRepoPerms(
      props.selectedRepoPerms.filter((item) => item.name !== repo.name),
    );
    if (permission == 'None') {
      return;
    }
    props.setSelectedRepoPerms((prevSelected) => {
      const newPerms = {
        name: repo.name,
        permission: permission,
        last_modified: repo.last_modified,
      };
      return [...prevSelected, newPerms];
    });
  };

  const fetchRepoPermission = (repo) => {
    for (const repoPerm of props.selectedRepoPerms) {
      if (repoPerm.name == repo.name) {
        return repoPerm.permission;
      }
    }
    return 'None';
  };

  return (
    <>
      <TextContent>
        <Text component={TextVariants.h1}>Add to repository (optional)</Text>
      </TextContent>
      <PageSection>
        <Toolbar>
          <ToolbarContent>
            <DropdownCheckbox
              selectedItems={props.selectedRepos}
              deSelectAll={props.setSelectedRepos}
              allItemsList={props.repos}
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
                      selectedVal={fetchRepoPermission(repo)}
                      onSelect={updateRepoPerms}
                      repo={repo}
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
  selectedRepos?: any[];
  repos: any[];
  setSelectedRepos: (repos) => void;
  selectedRepoPerms: any[];
  setSelectedRepoPerms: (repoPerm) => void;
}
