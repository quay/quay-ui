import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {fetchEntities} from 'src/resources/UserResource';

export function useEntities(org: string) {
  const [searchTerm, setSearchTerm] = useState<string>();
  const {data: entities, isError} = useQuery(
    ['fetchentities', org, searchTerm],
    () => fetchEntities(org, searchTerm),
    {
      placeholderData: [],
      enabled: searchTerm != null && searchTerm != '',
    },
  );

  return {
    entities: !isError ? entities : [],
    isError: isError,
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
  };
}
