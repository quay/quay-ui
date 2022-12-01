import {Toolbar, ToolbarContent} from '@patternfly/react-core';
import {DropdownCheckbox} from 'src/components/toolbar/DropdownCheckbox';
import {IRobot} from 'src/resources/RobotsResource';
import {useRecoilState} from 'recoil';
import {searchRobotAccountState} from 'src/atoms/RobotAccountState';
import {FilterInput} from 'src/components/toolbar/FilterInput';
import {ToolbarButton} from 'src/components/toolbar/ToolbarButton';
import {Kebab} from '../../components/toolbar/Kebab';
import React, {ReactElement} from 'react';
import {ToolbarPagination} from '../../components/toolbar/ToolbarPagination';
import {ExpandCollapseButton} from 'src/components/toolbar/ExpandCollapseButton';

export function RobotAccountsToolBar(props: RobotAccountsToolBarProps) {
  const [search, setSearch] = useRecoilState(searchRobotAccountState);

  return (
    <Toolbar>
      <ToolbarContent>
        <DropdownCheckbox
          selectedItems={props.selectedItems}
          deSelectAll={props.setSelectedRobotAccounts}
          allItemsList={props.allItemsList}
          itemsPerPageList={props.itemsPerPageList}
          onItemSelect={props.onItemSelect}
        />
        <FilterInput searchState={search} onChange={setSearch} />
        <ToolbarButton
          buttonValue={props.buttonText}
          Modal={props.pageModal}
          isModalOpen={props.isModalOpen}
          setModalOpen={props.setModalOpen}
        />
        <ExpandCollapseButton
          expandTable={props.expandTable}
          collapseTable={props.collapseTable}
        />
        <Kebab
          isKebabOpen={props.isKebabOpen}
          setKebabOpen={props.setKebabOpen}
          kebabItems={props.kebabItems}
        />
        <ToolbarPagination
          itemsList={props.allItemsList}
          perPage={props.perPage}
          page={props.page}
          setPage={props.setPage}
          setPerPage={props.setPerPage}
          total={props.total}
        />
      </ToolbarContent>
    </Toolbar>
  );
}

type RobotAccountsToolBarProps = {
  selectedItems: IRobot[];
  allItemsList: IRobot[];
  itemsPerPageList: IRobot[];
  setSelectedRobotAccounts: (selectedRobotAccounts) => void;
  onItemSelect: (Item, rowIndex, isSelecting) => void;
  buttonText: string;
  pageModal: object;
  isModalOpen: boolean;
  setModalOpen: (open) => void;
  isKebabOpen: boolean;
  setKebabOpen: (open) => void;
  kebabItems: ReactElement[];
  perPage: number;
  page: number;
  setPage: (pageNumber) => void;
  setPerPage: (perPageNumber) => void;
  total: number;
  expandTable: () => void;
  collapseTable: () => void;
};
