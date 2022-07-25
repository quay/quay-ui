import React, {useState} from 'react';
import {useRecoilState} from 'recoil';
import {Flex, FlexItem, SearchInput} from '@patternfly/react-core';
import {
  filteredPackagesListState,
  PackagesListItem,
  packagesListState,
} from 'src/atoms/PackagesState';

export function PackagesFilter() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [packagesList] = useRecoilState(packagesListState);
  const [, setFilteredVulnList] = useRecoilState(filteredPackagesListState);

  const filterPackagesList = (searchTerm: string) => {
    return packagesList.filter((item: PackagesListItem) => {
      const searchStr = item.PackageName + item.CurrentVersion;
      return searchStr.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const onSearchTermChanged = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setFilteredVulnList(filterPackagesList(newSearchTerm));
  };

  return (
    <Flex className="pf-u-mt-md">
      <FlexItem>
        <SearchInput
          placeholder="Filter Packages..."
          value={searchTerm}
          onChange={onSearchTermChanged}
          onClear={() => onSearchTermChanged('')}
        />
      </FlexItem>
    </Flex>
  );
}
