import {Toolbar, ToolbarContent, ToolbarItem} from '@patternfly/react-core';
import {useState} from 'react';
import {useRecoilState} from 'recoil';
import {selectedTagsState} from 'src/atoms/TagListState';
import {Tag} from 'src/resources/TagResource';
import {DeleteModal} from './DeleteModal';
import {FilterByText} from './FilterByText';
import {KebabDropdown} from './KebabDropdown';
import {Pagination} from './Pagination';
import {ToolbarPagination} from '../../../components/toolbar/Pagination';

export function TagsToolbar(props: ToolBarProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
  return (
    <Toolbar>
      <ToolbarContent>
        <ToolbarItem>
          <FilterByText />
        </ToolbarItem>

        <ToolbarItem>
          <KebabDropdown
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isActive={selectedTags.length > 0}
          />
        </ToolbarItem>

        <ToolbarPagination
          repositoryList={props.TagList}
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
  perPage: number;
  page: number;
  setPage: (pageNumber) => void;
  setPerPage: (perPageNumber) => void;
};
