import {useState} from 'react';
import {TextInput, ToolbarItem} from '@patternfly/react-core';

export function FilterBar() {
  const [searchInput, setSearchInput] = useState('Filter by name');

  return (
    <ToolbarItem>
      <TextInput
        isRequired
        type="search"
        id="modal-with-form-form-name"
        name="search input"
        placeholder={searchInput}
      />
    </ToolbarItem>
  );
}
