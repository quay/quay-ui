import {Toolbar, ToolbarContent, ToolbarItem} from '@patternfly/react-core';
import {useRecoilState} from 'recoil';
import {DropdownCheckbox} from './DropdownCheckbox';
import {DropdownFilter} from './DropdownFilter';
import {FilterBar} from './FilterBar';
import {ToolbarButton} from './ToolbarButton';
import {Kebab} from './Kebab';
import {ConfirmationModal} from '../modals/ConfirmationModal';
import {ToolbarPagination} from './Pagination';
import {filterRepoState} from 'src/atoms/RepositoryState';

export function RepositoryToolBar(props: RepositoryToolBarProps) {
  const [filterRepo, setRepoFilter] = useRecoilState(filterRepoState);
  const filterRepos = (value: string) => {
    setRepoFilter(value);
  };

  const fetchConfirmationModalText = () => {
    if (props.selectedRepoNames.length == 1) {
      return props.selectedRepoNames[0];
    }
    return props.selectedRepoNames.length;
  };

  const fetchMakePublicDescription = () => {
    if (props.selectedRepoNames.length == 0) {
      return 'Please select one/more repositories to change visibility.';
    }
    return (
      'Update ' +
      fetchConfirmationModalText() +
      ' repositories visibility to be public so they are visible to all user, and may be pulled by all users.'
    );
  };

  const fetchMakePrivateDescription = () => {
    if (props.selectedRepoNames.length == 0) {
      return 'Please select one/more repositories to change visibility.';
    }
    return (
      'Update ' +
      fetchConfirmationModalText() +
      ' repositories visibility to be private so they are only visible to certain users, and only may be pulled by certain users.'
    );
  };

  return (
    <Toolbar>
      <ToolbarContent>
        <DropdownCheckbox selectedItems={props.selectedRepoNames} />
        <DropdownFilter />
        <FilterBar
          placeholderText="Filter by repo name"
          value={filterRepo}
          onChange={filterRepos}
        />
        <ToolbarButton
          buttonValue="Create Repository"
          Modal={props.createRepoModal}
          isModalOpen={props.isCreateRepoModalOpen}
          setModalOpen={props.setCreateRepoModalOpen}
        />
        <ToolbarItem>
          {props.selectedRepoNames.length !== 0 ? (
            <Kebab
              isKebabOpen={props.isKebabOpen}
              setKebabOpen={props.setKebabOpen}
              kebabItems={props.kebabItems}
            />
          ) : null}
          {props.deleteKebabIsOpen ? props.deleteModal : null}
        </ToolbarItem>
        <ToolbarPagination
          repositoryList={props.repositoryList}
          perPage={props.perPage}
          page={props.page}
          setPage={props.setPage}
          setPerPage={props.setPerPage}
        />
      </ToolbarContent>
      <ConfirmationModal
        title="Make repositories public"
        description={fetchMakePublicDescription()}
        modalOpen={props.makePublicModalOpen}
        selectedItems={props.selectedRepoNames}
        toggleModal={props.toggleMakePublicClick}
        buttonText="Make public"
        makePublic={true}
        selectAllRepos={props.selectAllRepos}
      />
      <ConfirmationModal
        title="Make repositories private"
        description={fetchMakePrivateDescription()}
        modalOpen={props.makePrivateModalOpen}
        toggleModal={props.toggleMakePrivateClick}
        buttonText="Make private"
        selectedItems={props.selectedRepoNames}
        makePublic={false}
        selectAllRepos={props.selectAllRepos}
      />
    </Toolbar>
  );
}

type RepositoryToolBarProps = {
  currentOrg: string;
  createRepoModal: object;
  isCreateRepoModalOpen: boolean;
  setCreateRepoModalOpen: (open) => void;
  isKebabOpen: boolean;
  setKebabOpen: (open) => void;
  kebabItems: any[];
  selectedRepoNames: any[];
  deleteModal: object;
  deleteKebabIsOpen: boolean;
  makePublicModalOpen: boolean;
  toggleMakePublicClick: () => void;
  makePrivateModalOpen: boolean;
  toggleMakePrivateClick: () => void;
  selectAllRepos: () => void;
  repositoryList: any[];
  perPage: number;
  page: number;
  setPage: (pageNumber) => void;
  setPerPage: (perPageNumber) => void;
};
