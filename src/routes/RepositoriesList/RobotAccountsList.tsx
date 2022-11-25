import {PageSection, PageSectionVariants} from '@patternfly/react-core';
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import {RobotAccountColumnNames} from './ColumnNames';
import {RepositoryToolBar} from 'src/routes/RepositoriesList/RepositoryToolBar';

export default function RobotAccountsList() {
  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        {/*<RepositoryToolBar>*/}

        {/*</RepositoryToolBar>*/}
        <TableComposable aria-label="Selectable table">
          <Thead>
            <Tr>
              <Th />
              <Th>{RobotAccountColumnNames.robotAccountName}</Th>
              <Th>{RobotAccountColumnNames.teams}</Th>
              <Th>{RobotAccountColumnNames.repositories}</Th>
              <Th>{RobotAccountColumnNames.created}</Th>
            </Tr>
          </Thead>
          <Tbody data-testid="robot-account-list-table"></Tbody>
        </TableComposable>
      </PageSection>
    </>
  );
}
