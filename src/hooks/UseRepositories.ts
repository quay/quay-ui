import {useState} from 'react';
import {
  fetchAllRepos,
  fetchRepositoriesForNamespace,
} from 'src/resources/RepositoryResource';
import {useQuery} from '@tanstack/react-query';
import {useCurrentUser} from './UseCurrentUser';
import {SearchState} from 'src/components/toolbar/SearchTypes';
import {RepositoryListColumnNames as ColumnNames} from 'src/routes/RepositoriesList/ColumnNames';

export function useRepositories(organization?: string) {
  const {user} = useCurrentUser();

  // Keep state of current search in this hook
  const [page, setPage] = useState(1);
  const [nextPageToken, setNextPageToken] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState<SearchState>({
    field: ColumnNames.name,
    query: '',
  });
  const [currentOrganization, setCurrentOrganization] = useState(organization);

  const setNextPageParams = (nextPageToken) => {
    setNextPageToken(nextPageToken || '');
    setPage(page + 1);
  };

  const listOfOrgNames: string[] = currentOrganization
    ? [currentOrganization]
    : user?.organizations.map((org) => org.name).concat(user.username);

  const {
    data,
    isLoading: loading,
    isPlaceholderData,
    error,
  } = useQuery({
    queryKey: ['organization', organization || 'all', 'repositories', page],
    keepPreviousData: true,
    placeholderData: [],
    queryFn: ({signal}) => {
      return currentOrganization
        ? fetchRepositoriesForNamespace(
            currentOrganization,
            signal,
            nextPageToken,
          )
        : fetchAllRepos(listOfOrgNames, true, signal, nextPageToken);
    },
    onSuccess: async (result) => {
      const newList = result;
      if (!Array.isArray(result)) {
        const newList = repos.concat(result?.result);
        if (result?.next_page) {
          setNextPageParams(result?.next_page);
        }
        setRepos(newList);
        return newList;
      } else {
        const newList = result.reduce(
          (allRepos, result) => allRepos.concat(result.result),
          [],
        );
      }
      setRepos(newList);
      return newList;
    },
  });

  return {
    // Data
    repos: repos,

    // Fetching State
    loading: loading || isPlaceholderData || !listOfOrgNames,
    error,

    // Search Query State
    search,
    setSearch,
    page,
    setPage,
    perPage,
    setPerPage,
    organization,
    setCurrentOrganization,

    // Useful Metadata
    totalResults: repos.length,
  };
}
