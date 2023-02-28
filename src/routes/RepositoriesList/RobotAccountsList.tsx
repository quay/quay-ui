import {
  DropdownItem,
  PageSection,
  PageSectionVariants,
  PanelFooter,
  Spinner,
  TextContent,
  Text,
  TextVariants,
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
import RobotAccountKebab from './RobotAccountKebab';
import {useDeleteRobotAccounts} from 'src/hooks/UseDeleteRobotAccount';
import {BulkDeleteModalTemplate} from 'src/components/modals/BulkDeleteModalTemplate';
import {addDisplayError, BulkOperationError} from 'src/resources/ErrorHandling';
import ErrorModal from 'src/components/errors/ErrorModal';
import Empty from 'src/components/empty/Empty';
import {CubesIcon} from '@patternfly/react-icons';
import {ToolbarButton} from 'src/components/toolbar/ToolbarButton';
import {formatDate} from 'src/libs/utils';
import TeamView from 'src/components/modals/robotAccountWizard/TeamView';
import DisplayModal from 'src/components/modals/robotAccountWizard/DisplayModal';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchOrg} from 'src/resources/OrganizationResource';

export default function RobotAccountsList(props: RobotAccountsListProps) {
  const search = useRecoilValue(searchRobotAccountState);
  const [isCreateRobotModalOpen, setCreateRobotModalOpen] = useState(false);
  const [isKebabOpen, setKebabOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isTableExpanded, setTableExpanded] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTeamsModalOpen, setTeamsModalOpen] = useState<boolean>(false);
  const [teamsViewItems, setTeamsViewItems] = useState([]);
  const [teams, setTeams] = useState([]);
  const [err, setErr] = useState<string[]>();

  const {robotAccountsForOrg, page, perPage, setPage, setPerPage} =
    useRobotAccounts({
      name: props.orgName,
      onSuccess: () => {
        setLoading(false);
      },
      onError: (err) => {
        setErr([addDisplayError('Unable to fetch robot accounts', err)]);
        setLoading(false);
      },
    });

  const queryClient = useQueryClient();

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

  // Fetching teams
  useQuery(
    ['organization', props.orgName, 'teams'],
    () => {
      fetchOrg(props.orgName).then((response) => {
        setTeams(Object['values'](response?.teams));
        return response?.teams;
      });
      return [];
    },
    {
      placeholderData: () => {
        return queryClient.getQueryData(['organization', props.orgName]);
      },
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

  const {deleteRobotAccounts} = useDeleteRobotAccounts({
    namespace: props.orgName,
    onSuccess: () => {
      setSelectedRobotAccounts([]);
      setDeleteModalOpen(!isDeleteModalOpen);
    },
    onError: (err) => {
      if (err instanceof BulkOperationError) {
        const errMessages = [];
        err.getErrors().forEach((error, robot) => {
          errMessages.push(
            addDisplayError(
              `Failed to delete robot account ${robot}`,
              error.error,
            ),
          );
        });
        setErr(errMessages);
      } else {
        setErr([addDisplayError('Failed to delete robot account', err)]);
      }
      setSelectedRobotAccounts([]);
      setDeleteModalOpen(!isDeleteModalOpen);
    },
  });

  const setRobotAccountsSelected = (robotAccount: IRobot, isSelecting = true) =>
    setSelectedRobotAccounts((prevSelected) => {
      const otherSelectedRobotNames = prevSelected.filter(
        (r) => r !== robotAccount.name,
      );
      return isSelecting
        ? [...otherSelectedRobotNames, robotAccount.name]
        : otherSelectedRobotNames;
    });

  const isRobotAccountSelectable = (robot) => robot.name !== ''; // Arbitrary logic for this example

  const onSelectRobot = (
    robotAccount: IRobot,
    rowIndex: number,
    isSelecting: boolean,
  ) => {
    setRobotAccountsSelected(robotAccount, isSelecting);
  };

  const fetchTeamsModal = (items) => {
    const filteredItems = teams.filter((team) =>
      items.some((item) => team.name === item.name),
    );
    setTeamsModalOpen(true);
    setTeamsViewItems(filteredItems);
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
      return (
        <Link to="#" onClick={() => fetchTeamsModal(list)}>
          1 team
        </Link>
      );
    } else if (len == 1 && !teams) {
      return <Link to="#">1 repository</Link>;
    } else if (teams) {
      return (
        <Link to="#" onClick={() => fetchTeamsModal(list)}>
          {len.toString() + ' ' + placeholder}
        </Link>
      );
    }
    return <Link to="#">{len.toString() + ' ' + placeholder}</Link>;
  };

  const mapOfColNamesToTableData = {
    RobotAccount: {
      label: 'name',
      transformFunc: (item: string) => {
        return `${item}`;
      },
    },
  };

  const handleBulkDeleteModalToggle = () => {
    setKebabOpen(!isKebabOpen);
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const bulkDeleteRobotAccounts = async () => {
    await deleteRobotAccounts(selectedRobotAccounts);
  };

  const bulkDeleteRobotAccountModal = (
    <BulkDeleteModalTemplate
      mapOfColNamesToTableData={mapOfColNamesToTableData}
      handleModalToggle={handleBulkDeleteModalToggle}
      handleBulkDeletion={bulkDeleteRobotAccounts}
      isModalOpen={isDeleteModalOpen}
      selectedItems={selectedRobotAccounts}
      resourceName={'robot accounts'}
    />
  );

  const kebabItems: ReactElement[] = [
    <DropdownItem
      key="delete-item"
      className="red-color"
      onClick={handleBulkDeleteModalToggle}
    >
      Delete
    </DropdownItem>,
  ];

  const createRobotModal = (
    <CreateRobotAccountModal
      isModalOpen={isCreateRobotModalOpen}
      handleModalToggle={() => setCreateRobotModalOpen(!isCreateRobotModalOpen)}
      namespace={props.orgName}
      teams={teams}
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

  if (!loading && !robotAccountsForOrg?.length) {
    return (
      <Empty
        title="There are no viewable robot accounts for this repository"
        icon={CubesIcon}
        body="Either no robot accounts exist yet or you may not have permission to view any. If you have the permissions, you may create robot accounts in this repository."
        button={
          <ToolbarButton
            id=""
            buttonValue="Create robot account"
            Modal={createRobotModal}
            isModalOpen={isCreateRobotModalOpen}
            setModalOpen={setCreateRobotModalOpen}
          />
        }
      />
    );
  }

  if (paginatedRobotAccountList.length == 0) {
    return (
      <TableComposable aria-label="Empty state table" borders={false}>
        <Tbody>
          <Tr>
            <Td colSpan={8} textCenter={true}>
              <Spinner diameter="50px" />
            </Td>
          </Tr>
          <Tr>
            <Td colSpan={8} textCenter={true}>
              <TextContent>
                <Text component={TextVariants.h3}>Loading</Text>
              </TextContent>
            </Td>
          </Tr>
        </Tbody>
      </TableComposable>
    );
  }
  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <ErrorModal
          title="Robot Account deletion failed"
          error={err}
          setError={setErr}
        />
        <RobotAccountsToolBar
          selectedItems={selectedRobotAccounts}
          allItemsList={filteredRobotAccounts}
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
          deleteModal={bulkDeleteRobotAccountModal}
          deleteKebabIsOpen={isDeleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          perPage={perPage}
          page={page}
          setPage={setPage}
          setPerPage={setPerPage}
          total={filteredRobotAccounts.length}
          expandTable={expandTable}
          collapseTable={collapseTable}
        />

        <DisplayModal
          isModalOpen={isTeamsModalOpen}
          setIsModalOpen={setTeamsModalOpen}
          title="Teams"
          Component={
            <TeamView
              items={teamsViewItems}
              showCheckbox={false}
              showToggleGroup={false}
              searchInputText="Search for team"
              filterWithDropdown={false}
            />
          }
        ></DisplayModal>

        <TableComposable aria-label="Expandable table" variant={undefined}>
          <Thead>
            <Tr>
              <Th />
              <Th />
              <Th modifier="wrap">
                {RobotAccountColumnNames.robotAccountName}
              </Th>
              <Th modifier="wrap">{RobotAccountColumnNames.teams}</Th>
              <Th modifier="wrap">{RobotAccountColumnNames.repositories}</Th>
              <Th modifier="wrap">{RobotAccountColumnNames.lastAccessed}</Th>
              <Th modifier="wrap">{RobotAccountColumnNames.created}</Th>
              <Th />
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
                    {getLength(robotAccount.teams, true)}
                  </Td>
                  <Td dataLabel={RobotAccountColumnNames.repositories}>
                    {getLength(robotAccount.repositories, false)}
                  </Td>
                  <Td dataLabel={RobotAccountColumnNames.lastAccessed}>
                    {robotAccount.last_accessed
                      ? robotAccount.last_accessed
                      : 'Never'}
                  </Td>
                  <Td dataLabel={RobotAccountColumnNames.created}>
                    {formatDate(robotAccount.created)}
                  </Td>
                  <Td data-label="kebab">
                    <RobotAccountKebab
                      robotAccount={robotAccount}
                      namespace={props.orgName}
                      setError={setErr}
                    />
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
