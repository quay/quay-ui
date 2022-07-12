import {Pagination as PatternFlyPagination} from '@patternfly/react-core';
import {useRecoilState} from 'recoil';
import {paginationState} from 'src/atoms/TagListState';

export function Pagination(props: PaginationProps) {
  const [pagination, setPagination] = useRecoilState(paginationState);
  return (
    <PatternFlyPagination
      data-testid="pagination"
      perPageComponent="button"
      itemCount={props.itemCount}
      perPage={pagination.perPage}
      page={pagination.page}
      onSetPage={(e: any, page: number) => {
        setPagination((old) => ({...old, page}));
      }}
      onPerPageSelect={(e: any, perPage: number) => {
        setPagination((old) => ({...old, perPage}));
      }}
      widgetId="pagination-options-menu-top"
    />
  );
}

type PaginationProps = {
  itemCount: number;
};
