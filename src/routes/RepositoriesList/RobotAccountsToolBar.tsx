import {Toolbar, ToolbarContent, ToolbarItem} from '@patternfly/react-core';
import {DropdownCheckbox} from 'src/components/toolbar/DropdownCheckbox';
import {IRobot} from 'src/resources/RobotsResource';

export function RobotAccountsToolBar(props: RobotAccountsToolBarProps) {
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
};
