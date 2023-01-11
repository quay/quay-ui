import {
  DropdownItem,
  PageSection,
  PageSectionVariants,
  PanelFooter,
} from '@patternfly/react-core';
import {
  TableComposable,
  ExpandableRowContent,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import {Link} from 'react-router-dom';
import {RobotAccountColumnNames} from './ColumnNames';

import {RobotAccountsToolBar} from 'src/routes/RepositoriesList/RobotAccountsToolBar';
import CreateRobotAccountModal from 'src/components/modals/CreateRobotAccountModal';
import {IRobot} from 'src/resources/RobotsResource';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  searchRobotAccountState,
  selectedRobotAccountsState,
} from 'src/atoms/RobotAccountState';
import {useRobotAccounts} from 'src/hooks/useRobotAccounts';
import {ReactElement, useState} from 'react';
import {ToolbarPagination} from 'src/components/toolbar/ToolbarPagination';

export default function RobotAccountsList(props: RobotAccountsListProps) {
  const {robotAccountsForOrg, page, perPage, setPage, setPerPage} =
    useRobotAccounts(props.orgName);
  const search = useRecoilValue(searchRobotAccountState);
  const [isCreateRobotModalOpen, setCreateRobotModalOpen] = useState(false);
  const [isKebabOpen, setKebabOpen] = useState(false);
  const [isTableExpanded, setTableExpanded] = useState(false);

  const robotAccountsList: IRobot[] = robotAccountsForOrg?.map(
    (robotAccount) => {
      return {
        name: robotAccount.name,
        teams: robotAccount.teams,
        repositories: robotAccount.repositories,
        last_accessed: robotAccount.last_accessed,
        created: robotAccount.created,
        description: robotAccount.description,
      } as IRobot;
    },
  );

  const filteredRobotAccounts =
    search.query !== ''
      ? robotAccountsList.filter((robotAccount) => {
          const RobotAccountname = robotAccount.name;
          return RobotAccountname.includes(search.query);
        })
      : robotAccountsList;

  const paginatedRobotAccountList = filteredRobotAccounts?.slice(
    page * perPage - perPage,
    page * perPage - perPage + perPage,
  );

  // Expandable Row Logic
  const [expandedRobotNames, setExpandedRobotNames] = useState<string[]>([]);
  const setRobotExpanded = (robot: IRobot, isExpanding = true) =>
    setExpandedRobotNames((prevExpanded) => {
      const otherExpandedRepoNames = prevExpanded.filter(
        (r) => r !== robot.name,
      );
      return isExpanding
        ? [...otherExpandedRepoNames, robot.name]
        : otherExpandedRepoNames;
    });
  const isRobotExpanded = (robot) => expandedRobotNames.includes(robot.name);

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

  const kebabItems: ReactElement[] = [
    <DropdownItem key="kebab-item">Action Item</DropdownItem>,
  ];

  const createRobotModal = (
    <CreateRobotAccountModal
      isModalOpen={isCreateRobotModalOpen}
      handleModalToggle={() => setCreateRobotModalOpen(!isCreateRobotModalOpen)}
      namespace={props.orgName}
    />
  );

  const collapseTable = () => {
    setTableExpanded(!isTableExpanded);
    setExpandedRobotNames([]);
  };

  const expandTable = () => {
    if (isTableExpanded) {
      return;
    }
    setTableExpanded(!isTableExpanded);
    paginatedRobotAccountList.map((robotAccount, index) => {
      setRobotExpanded(robotAccount);
    });
  };

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <RobotAccountsToolBar
          selectedItems={selectedRobotAccounts}
          allItemsList={robotAccountsForOrg}
          setSelectedRobotAccounts={setSelectedRobotAccounts}
          itemsPerPageList={paginatedRobotAccountList}
          onItemSelect={onSelectRobot}
          buttonText="Create robot account"
          pageModal={createRobotModal}
          isModalOpen={isCreateRobotModalOpen}
          setModalOpen={setCreateRobotModalOpen}
          isKebabOpen={isKebabOpen}
          setKebabOpen={setKebabOpen}
          kebabItems={kebabItems}
          perPage={perPage}
          page={page}
          setPage={setPage}
          setPerPage={setPerPage}
          total={filteredRobotAccounts.length}
          expandTable={expandTable}
          collapseTable={collapseTable}
        />

        <TableComposable aria-label="Expandable table" variant={undefined}>
          <Thead>
            <Tr>
              <Th width={10} />
              <Th width={10} />
              <Th width={15}>{RobotAccountColumnNames.robotAccountName}</Th>
              <Th width={15}>{RobotAccountColumnNames.teams}</Th>
              <Th width={15}>{RobotAccountColumnNames.repositories}</Th>
              <Th width={15}>{RobotAccountColumnNames.lastAccessed}</Th>
              <Th width={15}>{RobotAccountColumnNames.created}</Th>
            </Tr>
          </Thead>
          {paginatedRobotAccountList.map((robotAccount, rowIndex) => {
            return (
              <Tbody
                key={robotAccount.name}
                isExpanded={isRobotExpanded(robotAccount)}
              >
                <Tr>
                  <Td
                    expand={
                      robotAccount.description
                        ? {
                            rowIndex,
                            isExpanded: isRobotExpanded(robotAccount),
                            onToggle: () =>
                              setRobotExpanded(
                                robotAccount,
                                !isRobotExpanded(robotAccount),
                              ),
                            // expandId: 'expandable-robot-account',
                          }
                        : undefined
                    }
                  />

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
                {robotAccount.description ? (
                  <Tr isExpanded={isRobotExpanded(robotAccount)}>
                    <Td
                      dataLabel="Robot Account description"
                      noPadding={false}
                      colSpan={7}
                    >
                      <ExpandableRowContent>
                        {robotAccount.description}
                      </ExpandableRowContent>
                    </Td>
                  </Tr>
                ) : null}
              </Tbody>
            );
          })}
        </TableComposable>
        <PanelFooter>
          <ToolbarPagination
            itemsList={filteredRobotAccounts}
            perPage={perPage}
            page={page}
            setPage={setPage}
            setPerPage={setPerPage}
            bottom={true}
            total={filteredRobotAccounts.length}
          />
        </PanelFooter>
      </PageSection>
    </>
  );
}

interface RobotAccountsListProps {
  orgName: string;
}
