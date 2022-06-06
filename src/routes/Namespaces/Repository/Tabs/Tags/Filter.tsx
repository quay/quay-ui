import {
    Dropdown,
    DropdownItem,
    KebabToggle,
    TextInput,
    Toolbar,
    ToolbarContent,
    ToolbarItem,
    Select,
    SelectOption,
    SelectVariant,
    Pagination,
} from '@patternfly/react-core';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { filterState, paginationState } from 'src/atoms/TagListState';


export function TagsToolbar(props: ToolBarProps) {
    const [filter, setFilter] = useRecoilState(filterState);
    const [pagination, setPagination] = useRecoilState(paginationState);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selected, setSelected] = useState([]);

    const filterTags = (value: string) => {
        setFilter(value)
        setPagination({ page: 1, perPage: 25, })
    }

    const kebabItems = [
        <DropdownItem key="delete">Delete</DropdownItem>,
    ];
    const [isKebabOpen, setKebabOpen] = useState(false);

    return (
        <Toolbar>
            <ToolbarContent>
                <ToolbarItem spacer={{ default: 'spacerNone' }}>
                    {/* Need to hook up the functionality of this select */}
                    <Select
                        variant={SelectVariant.checkbox}
                        aria-label="Select Filter Input"
                        onToggle={() => setFilterOpen(!filterOpen)}
                        onSelect={() => { }}
                        selections={selected}
                        isOpen={filterOpen}
                        placeholderText="Filter"
                    >
                        <SelectOption key={0} value="OS" />
                        <SelectOption key={1} value="Size" />
                    </Select>
                </ToolbarItem>
                <ToolbarItem>
                    <TextInput
                        isRequired
                        type="search"
                        id="modal-with-form-form-name"
                        name="search input"
                        placeholder="Filter by Tag name"
                        value={filter}
                        onChange={filterTags}
                    />
                </ToolbarItem>
                <ToolbarItem>
                    <Dropdown
                        onSelect={()=>setKebabOpen(!isKebabOpen)}
                        toggle={<KebabToggle onToggle={()=>setKebabOpen(!isKebabOpen)} id="toggle-id-6" />}
                        isOpen={isKebabOpen}
                        isPlain
                        dropdownItems={kebabItems}
                    />
                </ToolbarItem>
                <ToolbarItem alignment={{ default: "alignRight" }}>
                    <Pagination
                        perPageComponent="button"
                        itemCount={props.tagCount}
                        perPage={pagination.perPage}
                        page={pagination.page}
                        onSetPage={(e: any, page: number) => { setPagination((old) => ({ ...old, page })) }}
                        onPerPageSelect={(e: any, perPage: number) => { setPagination((old) => ({ ...old, perPage })) }}
                        widgetId="pagination-options-menu-top"
                    />
                </ToolbarItem>
            </ToolbarContent>
        </Toolbar>
    );
}

type ToolBarProps = {
    tagCount: number;
}
