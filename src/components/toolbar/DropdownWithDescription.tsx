import {useState} from 'react';
import {Dropdown, DropdownItem, DropdownToggle} from '@patternfly/react-core';
import * as React from 'react';

export function DropdownWithDescription(props: DropdownWithDescriptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownToggle, setDropdownToggle] = useState(props.selectedVal);

  const dropdownOnSelect = (name) => {
    setDropdownToggle(name);
    props.onSelect(name, props.repo);
    setIsOpen(false);
  };

  return (
    <Dropdown
      onSelect={() => setIsOpen(false)}
      toggle={
        <DropdownToggle
          id="toggle-descriptions"
          onToggle={(isOpen) => setIsOpen(isOpen)}
        >
          {dropdownToggle}
        </DropdownToggle>
      }
      isOpen={isOpen}
      dropdownItems={props.dropdownItems.map((item) => (
        <DropdownItem
          key={item.name}
          description={item.description}
          onClick={() => dropdownOnSelect(item.name)}
        >
          {item.name}
        </DropdownItem>
      ))}
    />
  );
}

interface DropdownWithDescriptionProps {
  dropdownItems: any[];
  selectedVal: string;
  onSelect?: (item, repo) => void;
  repo: Record<string, unknown>;
}
