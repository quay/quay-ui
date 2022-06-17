import {useState} from 'react';
import {useRecoilState} from 'recoil';
import {
  Toolbar as PatternFlyToolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import {selectedTagsState} from 'src/atoms/TagListState';
import {DeleteModal} from './DeleteModal';
import {FilterByField} from './FilterByField';
import {FilterByText} from './FilterByText';
import {KebabDropdown} from './KebabDropdown';
import {Pagination} from './Pagination';

export function Toolbar(props: ToolBarProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
  return (
    <>
      <DeleteModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        org={props.organization}
        repo={props.repository}
        loadTags={props.loadTags}
      />
      <PatternFlyToolbar>
        <ToolbarContent>
          <ToolbarItem spacer={{default: 'spacerNone'}}>
            <FilterByField />
          </ToolbarItem>
          <ToolbarItem>
            <FilterByText />
          </ToolbarItem>
          {selectedTags.length > 0 ? (
            <ToolbarItem>
              <KebabDropdown
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </ToolbarItem>
          ) : null}
          <ToolbarItem alignment={{default: 'alignRight'}}>
            <Pagination itemCount={props.tagCount} />
          </ToolbarItem>
        </ToolbarContent>
      </PatternFlyToolbar>
    </>
  );
}

type ToolBarProps = {
  organization: string;
  repository: string;
  tagCount: number;
  loadTags: () => void;
};
