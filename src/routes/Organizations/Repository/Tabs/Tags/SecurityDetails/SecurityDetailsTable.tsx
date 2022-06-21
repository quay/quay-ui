import {useState} from 'react';
import {Data, Vulnerability, Feature} from 'src/resources/TagResource';
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
import {SecurityDetailsMetadata} from './SecurityDetailsMetadata';
import {cyrb53} from 'src/libs/utils.js';
import {
  Checkbox,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  PageSection,
  PageSectionVariants,
  TextInput,
  Title,
} from '@patternfly/react-core';

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

function TableFilter() {
  return (
    <Flex className="pf-u-mt-md">
      <FlexItem>
        <TextInput
          isRequired
          type="text"
          id="filter-vulnerabilities-input"
          name="filter-vulnerabilities-input"
          placeholder="Filter Vulnerabilities..."
          value={''}
          onChange={console.log}
        />
      </FlexItem>
      <FlexItem>
        <Checkbox
          label="Only show fixable"
          aria-label="fixable"
          id="fixable-checkbox"
        />
      </FlexItem>
    </Flex>
  );
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

export default function SecurityDetailsTable(props: SecurityDetailsProps) {
  const [expandedRepoNames, setExpandedRepoNames] = React.useState<string[]>(
    [],
  );

  const generateUniqueKey = (vulnerability: Vulnerability) => {
    let hashInput = vulnerability.Name + vulnerability.Description;

    if (vulnerability.Metadata) {
      hashInput += vulnerability.Metadata.RepoName;
    }
    return cyrb53(hashInput);
  };

  const setRepoExpanded = (vulnerability: Vulnerability, isExpanding = true) =>
    setExpandedRepoNames((prevExpanded) => {
      const otherExpandedRepoNames = prevExpanded.filter(
        (r) => r !== vulnerability.Name,
      );
      return isExpanding
        ? [...otherExpandedRepoNames, vulnerability.Name]
        : otherExpandedRepoNames;
    });

  const isRepoExpanded = (vulnerability: Vulnerability) =>
    expandedRepoNames.includes(vulnerability.Name);

  return (
    <PageSection variant={PageSectionVariants.light}>
      <TableTitle />
      <TableFilter />
      <TableComposable aria-label="Expandable table" variant={'compact'}>
        <TableHead />
        {props.features ? (
          props.features.map((feature, rowIndex) => {
            const packageName = feature.Name;
            const packageVersion = feature.Version;
            return feature.Vulnerabilities.map((vulnerability) => {
              return (
                <Tbody
                  key={generateUniqueKey(vulnerability)}
                  isExpanded={isRepoExpanded(vulnerability)}
                >
                  <Tr>
                    <Td
                      expand={{
                        rowIndex,
                        isExpanded: isRepoExpanded(vulnerability),
                        onToggle: () =>
                          setRepoExpanded(
                            vulnerability,
                            !isRepoExpanded(vulnerability),
                          ),
                      }}
                    />
                    <Td dataLabel={columnNames.advisory}>
                      {vulnerability.Name}
                    </Td>
                    <Td dataLabel={columnNames.severity}>
                      {vulnerability.Severity}
                    </Td>
                    <Td dataLabel={columnNames.package}>{packageName}</Td>
                    <Td dataLabel={columnNames.currentVersion}>
                      {packageVersion}
                    </Td>
                    <Td dataLabel={columnNames.fixedInVersion}>
                      {vulnerability.FixedBy}
                    </Td>
                  </Tr>

                  <Tr isExpanded={isRepoExpanded(vulnerability)}>
                    <Td />
                    <Td
                      dataLabel="Repo detail 1"
                      colSpan={5}
                      cellPadding="span"
                    >
                      <ExpandableRowContent>
                        <SecurityDetailsMetadata
                          vulnerability={vulnerability}
                        />
                      </ExpandableRowContent>
                    </Td>
                  </Tr>
                </Tbody>
              );
            });
          })
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
