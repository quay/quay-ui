import {
    TextInput,
    Toolbar,
    ToolbarContent,
    ToolbarItem,
    Select,
    SelectGroup,
    SelectOption,
    SelectVariant,
} from '@patternfly/react-core';
import * as React from 'react';
  
export function TagsToolbar() {

    // Toolbar Filter Dropdown
    const [filterOpen, setFilterOpen] = React.useState(false);
    const onSelect = () => {
        // TODO: Add filter logic
    };
    const options = [
        <SelectGroup label="Role" key="group1">
            <SelectOption key={0} value="OS" />
        </SelectGroup>,
    ];

    // Toolbar Search
    const [namespaceSearchInput, setNamespaceSearchInput] = React.useState(
        'Filter by Tag name',
    );
    const handleFilteredSearch = (value : any) => {
        setNamespaceSearchInput(value);
    };

    return (
        <Toolbar>
            <ToolbarContent>
                <ToolbarItem spacer={{ default: 'spacerNone' }}>
                    <Select
                        variant={SelectVariant.checkbox}
                        aria-label="Select Input"
                        onToggle={() => setFilterOpen(!filterOpen)}
                        onSelect={onSelect}
                        // selections={selected}
                        isOpen={filterOpen}
                        placeholderText="Filter"
                        // aria-labelledby={titleId}
                    >
                        {options}
                    </Select>
                </ToolbarItem>
                <ToolbarItem>
                    <TextInput
                        isRequired
                        type="search"
                        id="modal-with-form-form-name"
                        name="search input"
                        value={namespaceSearchInput}
                        onChange={handleFilteredSearch}
                    />
                </ToolbarItem>
            </ToolbarContent>
        </Toolbar>
    );
}

  
  