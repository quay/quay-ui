import {
  Divider,
  SelectGroup,
  SelectOption,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import {DesktopIcon} from '@patternfly/react-icons';
import React from 'react';
import {useState} from 'react';
import EntitySearch from 'src/components/EntitySearch';
import AllSelectedToggleButton from 'src/components/toolbar/AllSelectedToggleButton';
import {DropdownCheckbox} from 'src/components/toolbar/DropdownCheckbox';
import {ToolbarPagination} from 'src/components/toolbar/ToolbarPagination';
import {AccountType, ITeamMember} from 'src/hooks/UseMembers';
import {IRobot} from 'src/resources/RobotsResource';

export default function AddTeamToolbar(props: AddTeamToolbarProps) {
  type TableModeType = 'All' | 'Selected';
  const [tableMode, setTableMode] = useState<TableModeType>('All');
  const [error, setError] = useState<string>('');

  const createRobotaccnt = () => {
    console.log('create rbt accnt modal');
  };

  const searchRobotAccntOptions = [
    <React.Fragment key="searchRobot">
      <SelectGroup label="Robot accounts" key="group4">
        {props?.robots.map((r) => {
          return (
            <SelectOption
              key={r.name}
              value={r.name}
              onClick={() =>
                props.setSelectedMembers({
                  selectedMembers: {
                    name: r.name,
                    account: AccountType.robot,
                  },
                })
              }
            />
          );
        })}
      </SelectGroup>
      <Divider component="li" key={5} />
      <SelectOption
        key="Create robot account2"
        component="button"
        onClick={createRobotaccnt}
        isPlaceholder
      >
        <DesktopIcon /> &nbsp; Create robot account
      </SelectOption>
    </React.Fragment>,
  ];

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
          <ToolbarItem variant="search-filter">
            <EntitySearch
              org={props.orgName}
              onSelect={() => {
                createRobotaccnt();
              }}
              onError={() => setError('Unable to look up robot accounts')}
              defaultOptions={searchRobotAccntOptions}
              placeholderText="Search, add, invite members"
            />
          </ToolbarItem>
          <AllSelectedToggleButton
            selectedItems={props.selectedItems}
            allItemsList={props.allItems}
            itemsPerPageList={props.paginatedItems}
          />
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
      {/* <PanelFooter>
            <ToolbarPagination
              itemsList={filteredItems}
              perPage={perPage}
              page={page}
              setPage={setPage}
              setPerPage={setPerPage}
              bottom={true}
              total={filteredItems.length}
            />
          </PanelFooter> */}
    </>
  );
}

interface AddTeamToolbarProps {
  selectedItems: ITeamMember[];
  // setSelectedMembers: React.Dispatch<React.SetStateAction<ITeamMember[]>>;
  setSelectedMembers: (teams: any) => void;
  deSelectAll: () => void;
  allItems: ITeamMember[];
  paginatedItems: ITeamMember[];
  onItemSelect: (
    item: ITeamMember,
    rowIndex: number,
    isSelecting: boolean,
  ) => void;
  page: number;
  setPage: (page: number) => void;
  perPage: number;
  setPerPage: (perPage: number) => void;
  children?: React.ReactNode;
  orgName?: string;
  robots: IRobot[];
}
