import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {
  addMemberToTeamAPI,
  fetchMembersForOrg,
  IMember,
} from 'src/resources/MembersResource';
import {fetchRobotsForNamespace} from 'src/resources/RobotsResource';

export enum AccountType {
  member = 'Team member',
  robot = 'Robot account',
  invited = 'Invited',
}
export interface ITeamMember {
  name: string;
  account: AccountType;
}

export function useFetchMembers(orgName: string) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const {
    data: members,
    isLoading: isLoadingMembers,
    isError: errorLoadingMembers,
  } = useQuery(
    ['members', orgName],
    ({signal}) => fetchMembersForOrg(orgName, signal),
    {
      placeholderData: [],
    },
  );

  const {
    data: robots,
    isLoading: isLoadingRobots,
    isError: errorLoadingRobots,
  } = useQuery(
    ['robots', orgName],
    ({signal}) => fetchRobotsForNamespace(orgName, false, signal),
    {
      placeholderData: [],
    },
  );

  const teamMembers: ITeamMember[] = [];
  members?.map((member) =>
    teamMembers.push({
      name: member.name,
      account: AccountType.member,
    }),
  );
  robots?.map((robot) =>
    teamMembers.push({
      name: robot.name,
      account: AccountType.robot,
    }),
  );

  const paginatedMembers = teamMembers?.slice(
    page * perPage - perPage,
    page * perPage - perPage + perPage,
  );

  return {
    teamMembers,
    robots,
    paginatedMembers: paginatedMembers,
    isLoading: isLoadingMembers || isLoadingRobots,

    error: errorLoadingMembers || errorLoadingRobots,

    page,
    setPage,
    perPage,
    setPerPage,
  };
}

export function useAddMembersToTeam(org: string) {
  const queryClient = useQueryClient();
  const {
    mutate: addMemberToTeam,
    isError: errorAddingMemberToTeam,
    isSuccess: successAddingMemberToTeam,
    reset: resetAddingMemberToTeam,
  } = useMutation(
    async ({team, member}: {team: string; member: string}) => {
      return addMemberToTeamAPI(org, team, member);
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['members']);
      },
    },
  );
  return {
    addMemberToTeam,
    errorAddingMemberToTeam,
    successAddingMemberToTeam,
    resetAddingMemberToTeam,
  };
}
