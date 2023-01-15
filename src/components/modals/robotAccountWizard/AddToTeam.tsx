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
  Button,
  Text,
  TextVariants,
  TextContent,
} from '@patternfly/react-core';
import {ToolbarPagination} from 'src/components/toolbar/ToolbarPagination';
import {useRecoilState} from 'recoil';
import {searchTeamState} from 'src/atoms/TeamState';
import React, {useEffect, useState} from 'react';
import {DropdownCheckbox} from 'src/components/toolbar/DropdownCheckbox';
import {FilterWithDropdown} from 'src/components/toolbar/FilterWithDropdown';
import {DesktopIcon} from '@patternfly/react-icons';
import ToggleDrawer from 'src/components/ToggleDrawer';
import NameAndDescription from 'src/components/modals/robotAccountWizard/NameAndDescription';
import {useTeams} from 'src/hooks/useTeams';
import {addDisplayError} from 'src/resources/ErrorHandling';

const ColumnNames = {
  name: 'Team',
  role: 'Role',
  members: 'Members',
  lastUpdated: 'Last Updated',
};

type TableModeType = 'All' | 'Selected';

export default function AddToTeam(props: AddToTeamProps) {
  const [tableMode, setTableMode] = useState<TableModeType>('All');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [tableItems, setTableItems] = useState([]);
  const [search, setSearch] = useRecoilState(searchTeamState);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');
  const [err, setErr] = useState<string>();

  const {createNewTeamHook} = useTeams(props.namespace);

  const createNewTeam = () => {
    props.setDrawerExpanded(true);
  };

  const dropdownItems = [
    <DropdownItem
      key="separated action"
      component="button"
      icon={<DesktopIcon />}
      onClick={createNewTeam}
    >
      Create new team
    </DropdownItem>,
  ];

  const validateTeamName = () => {
    return /^[a-z][a-z0-9_]{1,254}$/.test(newTeamName);
  };

  const onCreateNewTeam = async () => {
    try {
      await createNewTeamHook({
        namespace: props.namespace,
        name: newTeamName,
        description: newTeamDescription,
      }).then(function () {
        setNewTeamName('');
        setNewTeamDescription('');
        props.setDrawerExpanded(false);
      });
    } catch (error) {
      console.error(error);
      setErr(addDisplayError('Unable to create team', error));
    }
  };

  const DrawerPanelContent = (
    <>
      <NameAndDescription
        name={newTeamName}
        setName={setNewTeamName}
        description={newTeamDescription}
        setDescription={setNewTeamDescription}
        nameLabel="Provide a name for your new team account:"
        descriptionLabel="Provide an optional description for your new team account:"
        helperText="Enter a description to provide extra information to your teammates about this new team account. Max length: 255"
        nameHelperText="Choose a name to inform your teammates about this new account. Must match ^[a-z][a-z0-9_]{1,254}$."
        validateName={validateTeamName}
      />
      <div className="drawer-footer">
        <Button
          variant="primary"
          onClick={onCreateNewTeam}
          isDisabled={!validateTeamName()}
        >
          Add team account
        </Button>
        <Button variant="link" onClick={() => props.setDrawerExpanded(false)}>
          Cancel
        </Button>
      </div>
    </>
  );

  const onTableModeChange: ToggleGroupItemProps['onChange'] = (
    _isSelected,
    event,
  ) => {
    const id = event.currentTarget.id;
    setTableMode(id as TableModeType);
  };

  const setItemSelected = (item, isSelecting = true) => {
    props.setSelectedTeams((prevSelected) => {
      const otherSelectedItems = prevSelected.filter(
        (r) => r.name !== item.name,
      );
      return isSelecting ? [...otherSelectedItems, item] : otherSelectedItems;
    });
  };

  // Logic for handling row-wise checkbox selection in <Td>
  const isItemSelected = (item) => props.selectedTeams.includes(item.name);

  const onSelectItem = (item, rowIndex: number, isSelecting: boolean) => {
    setItemSelected(item, isSelecting);
  };

  useEffect(() => {
    if (tableMode == 'All') {
      setTableItems(props.items);
    } else if (tableMode == 'Selected') {
      setTableItems(props.selectedTeams);
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

  if (props.isDrawerExpanded) {
    return (
      <ToggleDrawer
        isExpanded={props.isDrawerExpanded}
        setIsExpanded={props.setDrawerExpanded}
        drawerpanelContent={DrawerPanelContent}
      />
    );
  }

  return (
    <>
      <TextContent>
        <Text component={TextVariants.h1}>Add to team (optional)</Text>
      </TextContent>
      <PageSection>
        <Toolbar>
          <ToolbarContent>
            <DropdownCheckbox
              selectedItems={props.selectedTeams}
              deSelectAll={props.setSelectedTeams}
              allItemsList={props.items}
              itemsPerPageList={paginatedItems}
              onItemSelect={onSelectItem}
            />
            <FilterWithDropdown
              searchState={search}
              onChange={setSearch}
              dropdownItems={dropdownItems}
              searchInputText="Search, create team"
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
  isDrawerExpanded: boolean;
  setDrawerExpanded?: (boolean) => void;
  selectedTeams?: any[];
  setSelectedTeams?: (teams) => void;
}
