import {useState} from 'react';
import {Dropdown, DropdownToggle} from '@patternfly/react-core';
import * as React from 'react';

export function DropdownWithDescription(props: DropdownWithDescriptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownToggle, setDropdownToggle] = useState('None');

  const onToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const onFocus = () => {
    const element = document.getElementById('toggle-descriptions');
    element.focus();
  };

  const onSelect = (event) => {
    setIsOpen(false);
    onFocus();
    setDropdownToggle(event.target.innerText);
  };

  return (
    <Dropdown
      onSelect={onSelect}
      toggle={
        <DropdownToggle id="toggle-descriptions" onToggle={onToggle}>
          {dropdownToggle}
        </DropdownToggle>
      }
      isOpen={isOpen}
      dropdownItems={props.dropdownItems}
    />
  );
}

interface DropdownWithDescriptionProps {
  dropdownItems: any[];
}
