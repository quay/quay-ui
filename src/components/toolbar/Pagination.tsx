import {Pagination} from '@patternfly/react-core';

export function ToolbarPagination(props: ToolbarPaginationProps) {
  return (
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
    />
  );
}

type ToolbarPaginationProps = {
  repositoryList: any[];
  perPage: number;
  page: number;
  setPage: (pageNumber) => void;
  setPerPage: (perPageNumber) => void;
};
