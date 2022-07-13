import {
  Button,
  Form,
  Modal,
  ModalVariant,
  PageSection,
  PageSectionVariants,
  Pagination,
  TextInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from '@patternfly/react-core';
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import {useEffect, useState} from 'react';
import {IRepository} from 'src/resources/RepositoryResource';

export const DeleteRepositoryModal = (
  props: DeleteRepositoryModalProps,
): JSX.Element => {
  const [reposToBeDeleted, setReposToBeDeleted] = useState<IRepository[]>([]);

  const [confirmDeletionInput, setConfirmDeletionInput] = useState<string>('');

  const [searchInput, setSearchInput] = useState<string>('');

  const [paginationForRepoDeletion, setPaginationForRepoDeletion] = useState({
    page: 1,
    perPage: 10,
  });

  const columnNames = {
    repository: 'Repository',
    visibility: 'Visibility',
    size: 'Size',
  };

  const onSearch = (value: string) => {
    console.log('search', value);
    setSearchInput(value);
    // ToDO filter table rows based on search
  };

  const bulkDelete = () => {
    if (confirmDeletionInput === 'confirm') {
      props.handleRepoDeletion(reposToBeDeleted);
    }
    // TODO:(harish) Ask UX for Alert msg in case text entered is invalid
  };

  useEffect(() => {
    setReposToBeDeleted(
      props.repositoryList.filter((repo) =>
        props.selectedItems.some(
          (selected) => repo.namespace + '/' + repo.name === selected,
        ),
      ),
    );
  }, []);

  return (
    <Modal
      title="Permanently delete repositories?"
      titleIconVariant="warning"
      aria-label="Permanently delete repositories"
      variant={ModalVariant.medium}
      isOpen={props.isModalOpen}
      onClose={props.handleModalToggle}
      actions={[
        <Button
          key="delete"
          variant="danger"
          onClick={bulkDelete}
          form="modal-with-form-form"
          isDisabled={confirmDeletionInput !== 'confirm'}
        >
          Delete
        </Button>,
        <Button key="cancel" variant="link" onClick={props.handleModalToggle}>
          Cancel
        </Button>,
      ]}
    >
      <span>This action deletes all repositories and cannot be recovered.</span>
      <PageSection variant={PageSectionVariants.light}>
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>
              <TextInput
                isRequired
                type="search"
                id="modal-with-form-form-name"
                name="search input"
                placeholder="Search"
                iconVariant="search"
                value={searchInput}
                onChange={onSearch}
              />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
        <TableComposable aria-label="Simple table" variant="compact">
          <Thead>
            <Tr>
              <Th>{columnNames.repository}</Th>
              <Th>{columnNames.visibility}</Th>
              <Th>{columnNames.size}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reposToBeDeleted.map((repo) => (
              <Tr key={repo.name}>
                <Td dataLabel={columnNames.repository}>{repo.name}</Td>
                <Td dataLabel={columnNames.visibility}>
                  {repo.is_public ? 'public' : 'private'}
                </Td>
                <Td dataLabel={columnNames.size}>dummy</Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
        <Toolbar>
          <ToolbarItem>
            <Pagination
              perPageComponent="button"
              itemCount={props.selectedItems.length}
              perPage={paginationForRepoDeletion.perPage}
              page={paginationForRepoDeletion.page}
              onSetPage={(e: any, page: number) => {
                setPaginationForRepoDeletion((old) => ({...old, page}));
              }}
              onPerPageSelect={(e: any, perPage: number) => {
                setPaginationForRepoDeletion((old) => ({...old, perPage}));
              }}
              widgetId="pagination-options-menu-bottom"
            />
          </ToolbarItem>
        </Toolbar>

        <p>
          {' '}
          Confirm deletion by typing <b>&quot;confirm&quot;</b> below:{' '}
        </p>
        <TextInput
          value={confirmDeletionInput}
          type="text"
          onChange={(value) => setConfirmDeletionInput(value)}
          aria-label="text input example"
        />
      </PageSection>
    </Modal>
  );
};

type DeleteRepositoryModalProps = {
  isModalOpen: boolean;
  handleModalToggle?: () => void;
  handleRepoDeletion: (repos: IRepository[]) => void;
  selectedItems: string[];
  repositoryList: IRepository[];
};
