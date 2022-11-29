import {PageSection, PageSectionVariants} from '@patternfly/react-core';
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import {Link} from 'react-router-dom';
import {RobotAccountColumnNames} from './ColumnNames';

import {RobotAccountsToolBar} from 'src/routes/RepositoriesList/RobotAccountsToolBar';
import {IRobot} from 'src/resources/RobotsResource';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  searchRobotAccountState,
  selectedRobotAccountsState,
} from 'src/atoms/RobotAccountState';
import {useRobotAccounts} from 'src/hooks/useRobotAccounts';

export default function RobotAccountsList(props: RobotAccountsListProps) {
  const {robotAccountsForRepo} = useRobotAccounts(props.repositoryName);
  const search = useRecoilValue(searchRobotAccountState);

  const robotAccountsList: IRobot[] = robotAccountsForRepo.map(
    (robotAccount) => {
      return {
        name: robotAccount.name,
        teams: robotAccount.teams,
        repositories: robotAccount.repositories,
        last_accessed: robotAccount.last_accessed,
        created: robotAccount.created,
      } as IRobot;
    },
  );

  const paginatedRobotAccountList =
    search.query !== ''
      ? robotAccountsList.filter((robotAccount) => {
          const RobotAccountname = robotAccount.name;
          return RobotAccountname.includes(search.query);
        })
      : robotAccountsList;

  // Logic for handling row-wise checkbox selection in <Td>
  const isRobotAccountSelected = (rob: IRobot) =>
    selectedRobotAccounts.includes(rob.name);

  const [selectedRobotAccounts, setSelectedRobotAccounts] = useRecoilState(
    selectedRobotAccountsState,
  );

  const setRobotAccountsSelected = (robotAccount: IRobot, isSelecting = true) =>
    setSelectedRobotAccounts((prevSelected) => {
      const otherSelectedRepoNames = prevSelected.filter(
        (r) => r !== robotAccount.name,
      );
      return isSelecting
        ? [...otherSelectedRepoNames, robotAccount.name]
        : otherSelectedRepoNames;
    });

  const isRobotAccountSelectable = (robot) => robot.name !== ''; // Arbitrary logic for this example

  const onSelectRobot = (
    robotAccount: IRobot,
    rowIndex: number,
    isSelecting: boolean,
  ) => {
    setRobotAccountsSelected(robotAccount, isSelecting);
  };

  const getLength = (list, teams) => {
    const len = list.length;
    let placeholder = 'teams';

    if (!teams) {
      placeholder = 'repositories';
    }

    if (len == 0) {
      return 'No ' + placeholder;
    } else if (len == 1 && teams) {
      return '1 team';
    } else if (len == 1 && !teams) {
      return '1 repository';
    }
    return len.toString() + ' ' + placeholder;
  };

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <RobotAccountsToolBar
          selectedItems={selectedRobotAccounts}
          allItemsList={robotAccountsForRepo}
          setSelectedRobotAccounts={setSelectedRobotAccounts}
          itemsPerPageList={paginatedRobotAccountList}
          onItemSelect={onSelectRobot}
        />

        <TableComposable aria-label="Selectable table">
          <Thead>
            <Tr>
              <Th />
              <Th>{RobotAccountColumnNames.robotAccountName}</Th>
              <Th>{RobotAccountColumnNames.teams}</Th>
              <Th>{RobotAccountColumnNames.repositories}</Th>
              <Th>{RobotAccountColumnNames.lastAccessed}</Th>
              <Th>{RobotAccountColumnNames.created}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {robotAccountsForRepo.map((robotAccount, rowIndex) => (
              <Tr key={rowIndex}>
                <Td
                  select={{
                    rowIndex,
                    onSelect: (_event, isSelecting) =>
                      onSelectRobot(robotAccount, rowIndex, isSelecting),
                    isSelected: isRobotAccountSelected(robotAccount),
                    disable: !isRobotAccountSelectable(robotAccount),
                  }}
                />
                <Td dataLabel={RobotAccountColumnNames.robotAccountName}>
                  <Link to="#">{robotAccount.name}</Link>
                </Td>
                <Td dataLabel={RobotAccountColumnNames.teams}>
                  <Link to="#">{getLength(robotAccount.teams, true)}</Link>
                </Td>
                <Td dataLabel={RobotAccountColumnNames.repositories}>
                  <Link to="#">
                    {getLength(robotAccount.repositories, false)}
                  </Link>
                </Td>
                <Td dataLabel={RobotAccountColumnNames.lastAccessed}>
                  {robotAccount.last_accessed
                    ? robotAccount.last_accessed
                    : 'Never'}
                </Td>
                <Td dataLabel={RobotAccountColumnNames.created}>
                  {robotAccount.created}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </PageSection>
    </>
  );
}

interface RobotAccountsListProps {
  repositoryName: string;
}
