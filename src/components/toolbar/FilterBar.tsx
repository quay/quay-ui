import {TextInput, ToolbarItem} from '@patternfly/react-core';

export function FilterBar(props: FilterBarProps) {
  return (
    <ToolbarItem>
      <TextInput
        isRequired
        type="search"
        id="toolbar-text-input"
        name="search input"
        placeholder={props.placeholderText}
        value={props.value}
        onChange={props.onChange}
      />
    </ToolbarItem>
  );
}

type FilterBarProps = {
  placeholderText: string;
  value: string;
  onChange: (value) => void;
};
