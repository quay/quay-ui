import {useState} from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownToggleCheckbox,
  DropdownItem,
  ToolbarItem,
} from '@patternfly/react-core';

export function DropdownCheckbox(props: DropdownCheckboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onChecked = (checked: boolean) => {
    // If items selected and checkbox is clicked to de-select the items
    if (!checked && props.selectedItems.length > 0) {
      props.setItemAsSelected([]);
    }
  };

  return (
    <ToolbarItem variant="bulk-select">
      <Dropdown
        toggle={
          <DropdownToggle
            splitButtonItems={[
              <DropdownToggleCheckbox
                id="split-button-text-checkbox"
                key="split-checkbox"
                aria-label="Select all"
                isChecked={props.selectedItems.length > 0 ? true : false}
                onChange={onChecked}
              >
                {props.selectedItems.length != 0
                  ? props.selectedItems.length + ' selected'
                  : ''}
              </DropdownToggleCheckbox>,
            ]}
            id="toolbar-dropdown-checkbox"
          />
        }
        isOpen={isOpen}
      />
    </ToolbarItem>
  );
}

type DropdownCheckboxProps = {
  selectedItems: any[];
  setItemAsSelected: (selectedList) => void;
};
