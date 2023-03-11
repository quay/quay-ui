import {fetchRobotPermissionsForNamespace} from 'src/resources/RobotsResource';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';

export function useRobotPermissions({orgName, robName, onSuccess, onError}) {
  const [namespace, setNamespace] = useState(orgName);
  const [robotName, setRobotName] = useState(robName);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const {
    data: robotPermissions,
    isLoading: loading,
    error,
  } = useQuery(
    ['Namespace', namespace, 'robot', robotName, 'permissions'],
    ({signal}) =>
      fetchRobotPermissionsForNamespace(namespace, robotName, false, signal),
    {
      placeholderData: [],
      onSuccess: () => {
        onSuccess();
      },
      onError: (err) => {
        onError(err);
      },
    },
  );
  return {
    robotPermissions: robotPermissions,
    loading: loading,
    error,
    setPage,
    setPerPage,
    page,
    perPage,
    setNamespace,
    namespace,
    setRobotName,
  };
}
