import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {IAvatar} from 'src/resources/OrganizationResource';
import {
  createTeamForOrg,
  fetchTeamsForNamespace,
} from 'src/resources/TeamResource';

interface ITeams {
  name: string;
  description: string;
  role: string;
  avatar: IAvatar;
  can_view: boolean;
  repo_count: number;
  member_count: number;
  is_synced: boolean;
}

export function useFetchTeams(orgName: string) {
  const {data, isLoading, isPlaceholderData, error} = useQuery(
    ['teams'],
    ({signal}) => fetchTeamsForNamespace(orgName, signal),
    {
      placeholderData: {},
    },
  );

  const teams: ITeams[] = Object.values(data);

  return {
    error,
    loading: isLoading,
    teams,
  };
}

export function useCreateTeam(orgName) {
  const queryClient = useQueryClient();

  const createTeamMutator = useMutation(
    async ({
      teamName,
      description,
    }: {
      teamName: string;
      description: string;
    }) => {
      return createTeamForOrg(orgName, teamName, description);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['teams']);
      },
    },
  );

  return {
    createTeam: async (teamName: string, description: string) =>
      createTeamMutator.mutate({teamName, description}),
  };
}
