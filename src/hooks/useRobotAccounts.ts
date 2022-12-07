import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {fetchRobotsForNamespace} from 'src/resources/RobotsResource';
import {createNewRobotForNamespace} from 'src/resources/RobotsResource';

export function useRobotAccounts(name: string) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [namespace, setNamespace] = useState(name);
  console.log('namespace', namespace);

  const {
    data: robotAccountsForOrg,
    isLoading: loading,
    error,
  } = useQuery(
    ['Namespace', namespace, 'robots'],
    () => fetchRobotsForNamespace(namespace),
    {
      placeholderData: [],
    },
  );

  const queryClient = useQueryClient();

  const createRobotAccountMutator = useMutation(
    async ({
      namespace,
      robotname,
      description,
      isUser,
    }: createNewRobotForNamespaceParams) => {
      return createNewRobotForNamespace(
        namespace,
        robotname,
        description,
        isUser,
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['Namespace', namespace, 'robots']);
      },
    },
  );

  return {
    robotAccountsForOrg: robotAccountsForOrg,
    loading: loading,
    error,
    setPage,
    setPerPage,
    page,
    perPage,
    setNamespace,
    namespace,
    createNewRobot: async (params: createNewRobotForNamespaceParams) =>
      createRobotAccountMutator.mutate(params),
  };
}

interface createNewRobotForNamespaceParams {
  namespace: string;
  robotname: string;
  description: string;
  isUser?: boolean;
}
