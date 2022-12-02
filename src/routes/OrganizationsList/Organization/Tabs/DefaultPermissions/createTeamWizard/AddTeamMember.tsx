import {PageSection, Spinner} from '@patternfly/react-core';

import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import {ITeamMember, useFetchMembers} from 'src/hooks/UseMembers';
import {IMember} from 'src/resources/MembersResource';
import {Link} from 'react-router-dom';
import AddTeamToolbar from './AddTeamToolbar';

const memberColNames = {
  teamMember: 'Team Member',
  account: 'Account',
};

export default function AddTeamMember(props: AddTeamMemberProps) {
  // const [tableItems, setTableItems] = useState([]);
  // const [search, setSearch] = useRecoilState(searchRepoState);

  const {
    teamMembers,
    robots,
    paginatedMembers,
    isLoading,
    error,
    page,
    setPage,
    perPage,
    setPerPage,
  } = useFetchMembers(props.orgName);

  // const [tableMemberData, setTableMemberData] = useState<IMember[]>([]);

  // useEffect(() => {
  //   if (members && tableMemberData.length === 0) {
  //     setTableMemberData(members);
  //   }
  // });

  const onSelectMember = (
    member: ITeamMember,
    rowIndex: number,
    isSelecting: boolean,
  ) => {
    props.setSelectedMembers((prevSelected) => {
      const otherSelectedMembers = prevSelected.filter(
        (m) => m.name !== member.name,
      );
      return isSelecting
        ? [...otherSelectedMembers, member]
        : otherSelectedMembers;
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <>Unable to load members list</>;
  }

  return (
    <>
      <PageSection>
        <AddTeamToolbar
          orgName={props.orgName}
          allItems={teamMembers}
          paginatedItems={paginatedMembers}
          selectedItems={props.selectedMembers}
          setSelectedMembers={props.setSelectedMembers}
          deSelectAll={() => props.setSelectedMembers([])}
          onItemSelect={onSelectMember}
          page={page}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          robots={robots}
        >
          <TableComposable aria-label="Selectable table">
            <Thead>
              <Tr>
                <Th />
                <Th>{memberColNames.teamMember}</Th>
                <Th>{memberColNames.account}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedMembers?.map((member, rowIndex) => (
                <Tr key={rowIndex}>
                  <Td
                    select={{
                      rowIndex,
                      onSelect: (_event, isSelecting) =>
                        onSelectMember(member, rowIndex, isSelecting),
                      isSelected: props.selectedMembers.some(
                        (p) => p.name === member.name,
                      ),
                    }}
                  />
                  <Td dataLabel={memberColNames.teamMember}>
                    <Link to="#">{member.name}</Link>
                  </Td>
                  <Td dataLabel={memberColNames.account}>
                    <Link to="#"> {member.account}</Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </TableComposable>
        </AddTeamToolbar>
      </PageSection>
    </>
  );
}

interface AddTeamMemberProps {
  orgName: string;
  selectedMembers: ITeamMember[];
  // setSelectedMembers: React.Dispatch<React.SetStateAction<ITeamMember[]>>;
  setSelectedMembers: (teams: any) => void;
}
