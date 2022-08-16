import {Dropdown, KebabToggle} from '@patternfly/react-core';
import * as React from 'react';
import {DropdownItemProps} from '@patternfly/react-core/dist/esm/components/Dropdown/DropdownItem';

export function Kebab(props: KebabProps) {
  return (
    <Dropdown
      onSelect={() => props.setKebabOpen(!props.isKebabOpen)}
      toggle={
        <KebabToggle
          onToggle={() => props.setKebabOpen(!props.isKebabOpen)}
          id="toggle-id-6"
        />
      }
      isOpen={props.isKebabOpen}
      isPlain
      dropdownItems={props.kebabItems}
    />
  );
}

type KebabProps = {
  isKebabOpen: boolean;
  setKebabOpen: (open) => void;
  kebabItems: React.FunctionComponent<DropdownItemProps>[];
};
