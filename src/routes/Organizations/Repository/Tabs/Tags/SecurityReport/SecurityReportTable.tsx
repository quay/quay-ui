import {useEffect} from 'react';
import {Vulnerability, Feature} from 'src/resources/TagResource';
import React from 'react';
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ExpandableRowContent,
} from '@patternfly/react-table';
import {SecurityReportMetadataTable} from './SecurityReportMetadataTable';
import {PageSection, PageSectionVariants, Title} from '@patternfly/react-core';
import {useRecoilState} from 'recoil';
import {
  filteredVulnListState,
  VulnerabilityListItem,
  vulnListState,
} from 'src/atoms/VulnerabilityReportState';
import {SecurityReportFilter} from './SecurityReportFilter';
import sha1 from 'js-sha1';

const columnNames = {
  advisory: 'Advisory',
  severity: 'Severity',
  package: 'Package',
  currentVersion: 'Current Version',
  fixedInVersion: 'Fixed in Version',
};

function TableTitle() {
  return <Title headingLevel={'h1'}> Vulnerabilities </Title>;
}

function TableHead() {
  return (
    <Thead>
      <Tr>
        <Th />
        <Th>{columnNames.advisory}</Th>
        <Th>{columnNames.severity}</Th>
        <Th>{columnNames.package}</Th>
        <Th>{columnNames.currentVersion}</Th>
        <Th>{columnNames.fixedInVersion}</Th>
      </Tr>
    </Thead>
  );
}

export default function SecurityReportTable({features}: SecurityDetailsProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [vulnList, setVulnList] = useRecoilState(vulnListState);
  const [filteredVulnList, setFilteredVulnList] = useRecoilState(
    filteredVulnListState,
  );

  const [expandedVulnKeys, setExpandedVulnKeys] = React.useState<string[]>([]);

  const generateUniqueKey = (vulnerability: VulnerabilityListItem) => {
    let hashInput = vulnerability.Advisory + vulnerability.Description;

    if (vulnerability.Metadata) {
      hashInput += vulnerability.Metadata.RepoName;
    }
    const key = sha1(hashInput);
    console.log(`input: ${hashInput}, key: ${key}`);
    return key;
  };

  const setRepoExpanded = (key: string, isExpanding = true) =>
    setExpandedVulnKeys((prevExpanded) => {
      const otherExpandedKeys = prevExpanded.filter((k) => k !== key);
      return isExpanding ? [...otherExpandedKeys, key] : otherExpandedKeys;
    });

  const isRepoExpanded = (key: string) => expandedVulnKeys.includes(key);

  useEffect(() => {
    const vulnList: VulnerabilityListItem[] = [];
    features.map((feature: Feature) => {
      feature.Vulnerabilities.map((vulnerability: Vulnerability) => {
        vulnList.push({
          PackageName: feature.Name,
          CurrentVersion: feature.Version,
          Description: vulnerability.Description,
          NamespaceName: vulnerability.NamespaceName,
          Advisory: vulnerability.Name,
          Severity: vulnerability.Severity,
          FixedInVersion: vulnerability.FixedBy,
          Metadata: vulnerability.Metadata,
        } as VulnerabilityListItem);
      });
    });
    setVulnList(vulnList);
    setFilteredVulnList(vulnList);
  }, [features]);

  return (
    <PageSection variant={PageSectionVariants.light}>
      <TableTitle />
      <SecurityReportFilter />
      <TableComposable aria-label="Expandable table" variant={'compact'}>
        <TableHead />
        {filteredVulnList ? (
          filteredVulnList.map(
            (vulnerability: VulnerabilityListItem, rowIndex) => {
              const uniqueKey = generateUniqueKey(vulnerability);
              return (
                <Tbody key={uniqueKey} isExpanded={isRepoExpanded(uniqueKey)}>
                  <Tr>
                    <Td
                      expand={{
                        rowIndex,
                        isExpanded: isRepoExpanded(uniqueKey),
                        onToggle: () =>
                          setRepoExpanded(
                            uniqueKey,
                            !isRepoExpanded(uniqueKey),
                          ),
                      }}
                    />

                    <Td dataLabel={columnNames.advisory}>
                      {vulnerability.Advisory}
                    </Td>
                    <Td dataLabel={columnNames.severity}>
                      {vulnerability.Severity}
                    </Td>
                    <Td dataLabel={columnNames.package}>
                      {vulnerability.PackageName}
                    </Td>
                    <Td dataLabel={columnNames.currentVersion}>
                      {vulnerability.CurrentVersion}
                    </Td>
                    <Td dataLabel={columnNames.fixedInVersion}>
                      {vulnerability.FixedInVersion}
                    </Td>
                  </Tr>

                  <Tr isExpanded={isRepoExpanded(uniqueKey)}>
                    <Td />
                    <Td
                      dataLabel="Repo detail 1"
                      colSpan={5}
                      cellPadding="span"
                    >
                      <ExpandableRowContent>
                        <SecurityReportMetadataTable
                          vulnerability={vulnerability}
                        />
                      </ExpandableRowContent>
                    </Td>
                  </Tr>
                </Tbody>
              );
            },
          )
        ) : (
          <tbody>
            <tr>
              <td> Loading </td>
            </tr>
          </tbody>
        )}
      </TableComposable>
    </PageSection>
  );
}

export interface SecurityDetailsProps {
  features: Feature[];
}
