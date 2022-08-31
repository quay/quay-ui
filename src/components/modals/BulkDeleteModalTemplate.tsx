import {
  Button,
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

export const BulkDeleteModalTemplate = <T,>(
  props: BulkDeleteModalTemplateProps<T>,
): JSX.Element => {
  const [itemsMarkedForDelete, setItemsMarkedForDelete] = useState<T[]>(
    props.selectedItems,
  );

  const colNames = Object.keys(props.mapOfColNamesToTableData);

  const [confirmDeletionInput, setConfirmDeletionInput] = useState<string>('');

  const [searchInput, setSearchInput] = useState<string>('');

  const [paginationForBulkDeletion, setPaginationForBulkDeletion] = useState({
    page: 1,
    perPage: 10,
  });

  const onSearch = (value: string) => {
    setSearchInput(value);
    if (value === '') {
      setItemsMarkedForDelete(props.selectedItems);
    } else {
      /* Note: This search filter assumes that the search is always based on the 1st column,
         hence we do "colNames[0]" */
      const filteredTableRow = props.selectedItems.filter((item) =>
        item[props.mapOfColNamesToTableData[colNames[0]].label].match(value),
      );
      setItemsMarkedForDelete(filteredTableRow);
    }
  };

  const bulkDelete = async () => {
    // TODO:(harish) Ask UX for Alert msg in case text entered is invalid
    if (confirmDeletionInput === 'confirm') {
      await props.handleBulkDeletion(props.selectedItems);
    }
  };

  useEffect(() => {
    setItemsMarkedForDelete(props.selectedItems);
  }, []);

  /* Function that transforms a given cell value with the transformation function if present
  else returns the default cell value */
  const applyTransformFuncIfGiven = (item, name) =>
    props.mapOfColNamesToTableData[name].transformFunc
      ? props.mapOfColNamesToTableData[name].transformFunc(item)
      : item[props.mapOfColNamesToTableData[name].label];

  return (
    <Modal
      title={`Permanently delete ${props.resourceName}?`}
      titleIconVariant="warning"
      aria-label={`Permanently delete ${props.resourceName}?`}
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
      <span>
        This action deletes all {props.resourceName} and cannot be recovered.
      </span>
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
              {colNames.map((name, idx) => (
                <Th key={idx}>{name}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {itemsMarkedForDelete.map((item, idx) => (
              <Tr key={idx}>
                {colNames.map((name, index) => (
                  <Td
                    key={index}
                    dataLabel={item[props.mapOfColNamesToTableData[name].label]}
                  >
                    {applyTransformFuncIfGiven(item, name)}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
        <Toolbar>
          <ToolbarItem>
            <Pagination
              perPageComponent="button"
              itemCount={props.selectedItems.length}
              perPage={paginationForBulkDeletion.perPage}
              page={paginationForBulkDeletion.page}
              onSetPage={(e: any, page: number) => {
                setPaginationForBulkDeletion((old) => ({...old, page}));
              }}
              onPerPageSelect={(e: any, perPage: number) => {
                setPaginationForBulkDeletion((old) => ({...old, perPage}));
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

type BulkDeleteModalTemplateProps<T> = {
  mapOfColNamesToTableData: {
    [key: string]: {label: string; transformFunc?: (value) => any};
  };
  isModalOpen: boolean;
  handleModalToggle?: () => void;
  handleBulkDeletion: (items: T[]) => void;
  selectedItems: T[];
  resourceName: string;
};
