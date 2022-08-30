import {
  DropdownItem,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import {ReactElement, useState} from 'react';
import {useRecoilState} from 'recoil';
import {filterState, selectedTagsState} from 'src/atoms/TagListState';
import {Tag} from 'src/resources/TagResource';
import {DeleteModal} from './DeleteModal';
import {ToolbarPagination} from 'src/components/toolbar/Pagination';
import {FilterBar} from 'src/components/toolbar/FilterBar';
import {Kebab} from 'src/components/toolbar/Kebab';
import {DropdownFilter} from 'src/components/toolbar/DropdownFilter';
import {DropdownCheckbox} from 'src/components/toolbar/DropdownCheckbox';

export function TagsToolbar(props: ToolBarProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
  const [filterTags, setFilter] = useRecoilState(filterState);

  const [isKebabOpen, setKebabOpen] = useState(false);
  const kebabItems: ReactElement[] = [
    <DropdownItem
      key="delete"
      onClick={() => {
        setKebabOpen(!isKebabOpen);
        setIsModalOpen(!isModalOpen);
      }}
      isDisabled={selectedTags.length <= 0}
    >
      Delete
    </DropdownItem>,
  ];

  return (
    <Toolbar>
      <ToolbarContent>
        <DropdownCheckbox
          selectedItems={selectedTags}
          deSelectAll={setSelectedTags}
          allItemsList={props.TagList}
          itemsPerPageList={props.paginatedTags}
          onItemSelect={props.selectTag}
        />

        <DropdownFilter />
        <FilterBar
          placeholderText="Filter by Tag name"
          value={filterTags}
          onChange={setFilter}
        />

        <ToolbarItem>
          {selectedTags?.length !== 0 ? (
            <Kebab
              isKebabOpen={isKebabOpen}
              setKebabOpen={setKebabOpen}
              kebabItems={kebabItems}
            />
          ) : null}
        </ToolbarItem>

        <ToolbarPagination
          repositoryList={props.paginatedTags}
          perPage={props.perPage}
          page={props.page}
          setPage={props.setPage}
          setPerPage={props.setPerPage}
        />
      </ToolbarContent>
      <DeleteModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        org={props.organization}
        repo={props.repository}
        loadTags={props.loadTags}
      />
    </Toolbar>
  );
}

type ToolBarProps = {
  organization: string;
  repository: string;
  tagCount: number;
  loadTags: () => void;
  TagList: Tag[];
  paginatedTags: Tag[];
  perPage: number;
  page: number;
  setPage: (pageNumber) => void;
  setPerPage: (perPageNumber) => void;
  selectTag: (tag: Tag, rowIndex?: number, isSelecting?: boolean) => void;
};
