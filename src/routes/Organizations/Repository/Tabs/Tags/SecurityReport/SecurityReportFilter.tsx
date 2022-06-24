import React, {useState} from 'react';
import {useRecoilState} from 'recoil';
import {
  filteredVulnListState,
  VulnerabilityListItem,
  vulnFilterState,
  vulnListState,
} from '../../../../../../atoms/VulnurabilityReportState';
import {Checkbox, Flex, FlexItem, SearchInput} from '@patternfly/react-core';

export function SecurityReportFilter() {
  const [isFixedOnlyChecked, setIsFixedOnlyChecked] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [vulnList, setVulnList] = useRecoilState(vulnListState);
  const [filteredVulnList, setFilteredVulnList] = useRecoilState(
    filteredVulnListState,
  );

  const filterVulnList = (searchTerm: string, fixedOnlyChecked: boolean) => {
    const newList = vulnList.filter((item: VulnerabilityListItem) => {
      return (
        item.PackageName.includes(searchTerm) &&
        (!fixedOnlyChecked || item.FixedInVersion)
      );
    });
    console.log(`newList ${newList.length}`);
    return newList;
  };

  const onSearchTermChanged = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setFilteredVulnList(filterVulnList(newSearchTerm, isFixedOnlyChecked));
  };

  const onShowOnlyFixableChanged = (checked: boolean) => {
    setIsFixedOnlyChecked(checked);
    setFilteredVulnList(filterVulnList(searchTerm, checked));
  };

  return (
    <Flex className="pf-u-mt-md">
      <FlexItem>
        <SearchInput
          placeholder="Filter Vulnerabilities..."
          value={searchTerm}
          onChange={onSearchTermChanged}
          onClear={(evt) => console.log(evt)}
        />
      </FlexItem>
      <FlexItem>
        <Checkbox
          label="Only show fixable"
          aria-label="fixable"
          id="fixable-checkbox"
          isChecked={isFixedOnlyChecked}
          onChange={onShowOnlyFixableChanged}
        />
      </FlexItem>
    </Flex>
  );
}
