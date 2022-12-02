import {useQuery} from '@tanstack/react-query';
import {fetchRobotsForNamespace} from 'src/resources/RobotsResource';

export function useFetchRobotAccounts(orgName: string) {
  const {
    data: robots,
    isLoading,
    error,
  } = useQuery(
    ['robots'],
    ({signal}) => fetchRobotsForNamespace(orgName, false, signal),
    {
      placeholderData: [],
    },
  );

  return {
    error,
    loading: isLoading,
    robots,
  };
}
