import {useState} from 'react';
import {
  Dropdown,
  DropdownGroup,
  DropdownToggle,
  DropdownItem,
  ToolbarItem,
} from '@patternfly/react-core';

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
    <DropdownItem key="col-name">Visibility</DropdownItem>,
  ];

  return (
    <ToolbarItem spacer={{default: 'spacerNone'}}>
      <Dropdown
        onSelect={onSelect}
        toggle={
          <DropdownToggle
            id="toolbar-dropdown-filter"
            onToggle={() => setIsOpen(isOpen)}
            icon={<i className="fa fa-filter"></i>}
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
