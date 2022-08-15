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

  const onToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const onFocus = () => {
    const element = document.getElementById('toolbar-dropdown-checkbox');
    element.focus();
  };

  const onSelect = () => {
    setIsOpen(false);
    onFocus();
  };

  const dropdownItems = [
    <DropdownItem key="select-none"></DropdownItem>,
    // TODO: Implement below items
    // <DropdownItem key="select-page-items">Select page(5 items)</DropdownItem>,
    // <DropdownItem key="select-all-items">Select all(50 items)</DropdownItem>,
  ];

  return (
    <ToolbarItem variant="bulk-select">
      <Dropdown
        onSelect={onSelect}
        toggle={
          <DropdownToggle
            splitButtonItems={[
              <DropdownToggleCheckbox
                id="split-button-text-checkbox"
                key="split-checkbox"
                aria-label="Select all"
              >
                {props.selectedItems.length != 0
                  ? props.selectedItems.length + ' selected'
                  : ''}
              </DropdownToggleCheckbox>,
            ]}
            onToggle={onToggle}
            id="toolbar-dropdown-checkbox"
          />
        }
        isOpen={isOpen}
        dropdownItems={dropdownItems}
      />
    </ToolbarItem>
  );
}

type DropdownCheckboxProps = {
  selectedItems: any[];
};
