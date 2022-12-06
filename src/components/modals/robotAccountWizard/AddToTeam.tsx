import {
  ExpandableRowContent,
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import {PageSection, PanelFooter} from '@patternfly/react-core';
import {RobotAccountColumnNames} from 'src/routes/RepositoriesList/ColumnNames';
import {Link} from 'react-router-dom';
import {ToolbarPagination} from 'src/components/toolbar/ToolbarPagination';
import {IRobot} from '../../../resources/RobotsResource';
import {useRecoilState} from 'recoil';
import {selectedRobotAccountsState} from '../../../atoms/RobotAccountState';

const ColumnNames = {
  name: 'Team',
  role: 'Role',
  members: 'Members',
  lastUpdated: 'Last Updated',
};

export default function AddToTeam(props: AddToTeamProps) {
  const [selectedItems, setSelectedItems] = useRecoilState(
    selectedRobotAccountsState,
  );

  const setItemSelected = (item, isSelecting = true) =>
    setSelectedItems((prevSelected) => {
      const otherSelectedRepoNames = prevSelected.filter(
        (r) => r !== item.name,
      );
      return isSelecting
        ? [...otherSelectedRepoNames, item.name]
        : otherSelectedRepoNames;
    });

  // Logic for handling row-wise checkbox selection in <Td>
  const isItemSelected = (item) => selectedItems.includes(item.name);

  const onSelectItem = (item, rowIndex: number, isSelecting: boolean) => {
    setItemSelected(item, isSelecting);
  };

  return (
    <>
      <PageSection>
        <TableComposable aria-label="Selectable table">
          <Thead>
            <Tr>
              <Th />
              <Th>{ColumnNames.name}</Th>
              <Th>{ColumnNames.role}</Th>
              <Th>{ColumnNames.members}</Th>
              <Th>{ColumnNames.lastUpdated}</Th>
            </Tr>
          </Thead>
          {props.teams.map((team, rowIndex) => {
            return (
              <Tbody key={team.name}>
                <Tr>
                  <Td
                    select={{
                      rowIndex,
                      onSelect: (_event, isSelecting) =>
                        onSelectItem(team, rowIndex, isSelecting),
                      isSelected: isItemSelected(team),
                    }}
                  />
                  <Td dataLabel={ColumnNames.name}>{team.name}</Td>
                  <Td dataLabel={ColumnNames.role}>{team.role}</Td>
                  <Td dataLabel={ColumnNames.members}>{team.members}</Td>
                  <Td dataLabel={ColumnNames.lastUpdated}>
                    {team.last_updated ? team.last_updated : 'Never'}
                  </Td>
                </Tr>
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

interface AddToTeamProps {
  teams: string[];
}
