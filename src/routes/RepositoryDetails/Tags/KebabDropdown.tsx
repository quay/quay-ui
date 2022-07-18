import {Dropdown, DropdownItem, KebabToggle} from '@patternfly/react-core';
import {useState} from 'react';

export function KebabDropdown(props: KebabDropdownProps) {
  const [isKebabOpen, setKebabOpen] = useState(false);
  return (
    <Dropdown
      onSelect={() => setKebabOpen(!isKebabOpen)}
      toggle={
        <KebabToggle
          onToggle={() => setKebabOpen(!isKebabOpen)}
          id="toggle-id-6"
        />
      }
      isOpen={isKebabOpen}
      isPlain
      dropdownItems={[
        <DropdownItem
          key="delete"
          onClick={() => {
            props.setIsModalOpen(!props.isModalOpen);
          }}
          isDisabled={!props.isActive}
        >
          Delete
        </DropdownItem>,
      ]}
    />
  );
}

type KebabDropdownProps = {
  isModalOpen: boolean;
  isActive: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
};
