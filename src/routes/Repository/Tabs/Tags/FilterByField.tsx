import {Select, SelectOption, SelectVariant} from '@patternfly/react-core';
import {useState} from 'react';

export function FilterByField() {
  // TODO: Hook up select functionality
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  return (
    <Select
      variant={SelectVariant.checkbox}
      aria-label="Select Filter Input"
      onToggle={() => setFilterOpen(!filterOpen)}
      onSelect={() => {
        console.log('selected');
      }}
      selections={selected}
      isOpen={filterOpen}
      placeholderText="Filter"
    >
      <SelectOption key={0} value="OS" />
      <SelectOption key={1} value="Size" />
    </Select>
  );
}
