import {TextInput} from '@patternfly/react-core';
import {useRecoilState} from 'recoil';
import {filterState, paginationState} from 'src/atoms/TagListState';

export function FilterByText() {
  const [filter, setFilter] = useRecoilState(filterState);
  const [pagination, setPagination] = useRecoilState(paginationState);

  const filterTags = (value: string) => {
    setFilter(value);
    setPagination({page: 1, perPage: 25});
  };

  return (
    <TextInput
      isRequired
      type="search"
      id="modal-with-form-form-name"
      name="search input"
      placeholder="Filter by Tag name"
      value={filter}
      onChange={filterTags}
    />
  );
}
