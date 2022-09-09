import {
  Pagination,
  ToolbarItem,
  PaginationVariant,
} from '@patternfly/react-core';

export function ToolbarPagination(props: ToolbarPaginationProps) {
  return (
    <ToolbarItem variant="pagination">
      <Pagination
        perPageComponent="button"
        itemCount={props.repositoryList.length}
        perPage={props.perPage}
        page={props.page}
        onSetPage={(_event, pageNumber) => props.setPage(pageNumber)}
        onPerPageSelect={(_event, perPageNumber) => {
          props.setPage(1);
          props.setPerPage(perPageNumber);
        }}
        widgetId="pagination-options-menu-top"
        variant={
          props.bottom ? PaginationVariant.bottom : PaginationVariant.top
        }
      />
    </ToolbarItem>
  );
}

type ToolbarPaginationProps = {
  repositoryList: any[];
  perPage: number;
  page: number;
  setPage: (pageNumber: number) => void;
  setPerPage: (perPageNumber: number) => void;
  bottom?: boolean;
};
