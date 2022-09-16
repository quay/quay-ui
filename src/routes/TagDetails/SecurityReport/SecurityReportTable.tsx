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
import {
  PageSection,
  PageSectionVariants,
  Spinner,
  Title,
} from '@patternfly/react-core';
import {useRecoilState} from 'recoil';
import {
  filteredVulnListState,
  VulnerabilityListItem,
  vulnListState,
} from 'src/atoms/VulnerabilityReportState';
import {SecurityReportFilter} from './SecurityReportFilter';
import sha1 from 'js-sha1';
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
  ExternalLinkAltIcon,
} from '@patternfly/react-icons';
import {getSeverityColor} from 'src/libs/utils';

import './SecurityReportTable.css';

const columnNames = {
  advisory: 'Advisory',
  severity: 'Severity',
  package: 'Package',
  currentVersion: 'Current Version',
  fixedInVersion: 'Fixed in Version',
};

function getVulnerabilityLink(vulnerability: VulnerabilityListItem) {
  if (!vulnerability.Link) {
    return '';
  }

  // by default return the first link
  return vulnerability.Link.split(' ')[0];
}

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
    let hashInput =
      vulnerability.PackageName +
      vulnerability.Advisory +
      vulnerability.Description +
      vulnerability.Severity;

    if (vulnerability.Metadata) {
      hashInput += vulnerability.Metadata.RepoName;
    }

    return sha1(hashInput);
  };

  const setRepoExpanded = (key: string, isExpanding = true) =>
    setExpandedVulnKeys((prevExpanded) => {
      const otherExpandedKeys = prevExpanded.filter((k) => k !== key);
      return isExpanding ? [...otherExpandedKeys, key] : otherExpandedKeys;
    });

  const isRepoExpanded = (key: string) => expandedVulnKeys.includes(key);

  useEffect(() => {
    if (features) {
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
            Link: vulnerability.Link,
          } as VulnerabilityListItem);
        });
      });
      setVulnList(vulnList);
      setFilteredVulnList(vulnList);
    }
  }, [features]);

  return (
    <PageSection variant={PageSectionVariants.light}>
      <TableTitle />
      <SecurityReportFilter />
      <TableComposable aria-label="Expandable table">
        <TableHead />
        {filteredVulnList.length !== 0 ? (
          filteredVulnList.map(
            (vulnerability: VulnerabilityListItem, rowIndex) => {
              const uniqueKey = generateUniqueKey(vulnerability);
              return (
                <Tbody key={uniqueKey} isExpanded={isRepoExpanded(uniqueKey)}>
                  <Tr className="security-table-row">
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
                      <>
                        {vulnerability.Advisory}
                        {vulnerability.Link ? (
                          <a
                            href={getVulnerabilityLink(vulnerability)}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <ExternalLinkAltIcon style={{marginLeft: '5px'}} />
                          </a>
                        ) : null}
                      </>
                    </Td>
                    <Td dataLabel={columnNames.severity}>
                      <ExclamationTriangleIcon
                        color={getSeverityColor(vulnerability.Severity)}
                        style={{
                          marginRight: '5px',
                        }}
                      />
                      <span>{vulnerability.Severity}</span>
                    </Td>
                    <Td dataLabel={columnNames.package}>
                      {vulnerability.PackageName}
                    </Td>
                    <Td dataLabel={columnNames.currentVersion}>
                      {vulnerability.CurrentVersion}
                    </Td>
                    <Td dataLabel={columnNames.fixedInVersion}>
                      {vulnerability.FixedInVersion ? (
                        <>
                          <ArrowRightIcon
                            color={'green'}
                            style={{marginRight: '5px'}}
                          />
                          <span>{vulnerability.FixedInVersion}</span>
                        </>
                      ) : (
                        '(None)'
                      )}
                    </Td>
                  </Tr>

                  <Tr isExpanded={isRepoExpanded(uniqueKey)}>
                    <Td
                      dataLabel="Security Metadata"
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
          <Tbody>
            <Tr>
              <Td>{!features ? <Spinner size="lg" /> : <div></div>}</Td>
            </Tr>
          </Tbody>
        )}
      </TableComposable>
    </PageSection>
  );
}

export interface SecurityDetailsProps {
  features: Feature[];
}
