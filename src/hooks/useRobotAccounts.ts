import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchRobotsForNamespace} from 'src/resources/RobotsResource';

export function useRobotAccounts(name: string) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [repositoryName, setRepositoryName] = useState(name);

  const {
    data: robotAccountsForRepo,
    isLoading: loading,
    error,
  } = useQuery(['organization', repositoryName, 'robots'], () =>
    fetchRobotsForNamespace(repositoryName),
  );

  return {
    robotAccountsForRepo: robotAccountsForRepo,
    loading: loading,
    error,
    setPage,
    setPerPage,
    page,
    perPage,
    setRepositoryName,
    repositoryName,
  };
}
