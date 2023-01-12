import {useMutation, useQueryClient} from '@tanstack/react-query';
import {bulkDeleteRobotAccounts, IRobot} from 'src/resources/RobotsResource';

export function useDeleteRobotAccounts(namespace: string) {
  const queryClient = useQueryClient();

  const deleteRobotAccountsMutator = useMutation(
    async (robotacounts: IRobot[]) => {
      await bulkDeleteRobotAccounts(namespace, robotacounts);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['Namespace', namespace, 'robots']);
      },
    },
  );

  return {
    // Mutations
    deleteRobotAccounts: async (robotacounts: IRobot[]) =>
      deleteRobotAccountsMutator.mutate(robotacounts),
  };
}
