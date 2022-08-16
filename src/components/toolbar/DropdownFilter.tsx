import {useState} from 'react';
import {
  Dropdown,
  DropdownGroup,
  DropdownToggle,
  DropdownItem,
  ToolbarItem,
} from '@patternfly/react-core';
import {FilterIcon} from '@patternfly/react-icons';

export function DropdownFilter() {
  const [isOpen, setIsOpen] = useState(false);

  const onFocus = () => {
    const element = document.getElementById('toolbar-dropdown-filter');
    element.focus();
  };

  const onSelect = () => {
    setIsOpen(false);
    onFocus();
  };

  const dropdownItems = [
    <DropdownItem key="col-name">Name</DropdownItem>,
    <DropdownItem key="col-visibility">Visibility</DropdownItem>,
  ];

  return (
    <ToolbarItem spacer={{default: 'spacerNone'}}>
      <Dropdown
        onSelect={onSelect}
        toggle={
          <DropdownToggle
            id="toolbar-dropdown-filter"
            onToggle={() => setIsOpen(isOpen)}
            icon={<FilterIcon />}
          >
            Name
          </DropdownToggle>
        }
        isOpen={isOpen}
        dropdownItems={dropdownItems}
      />
    </ToolbarItem>
  );
}
