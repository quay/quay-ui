import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {SearchState} from 'src/components/toolbar/SearchTypes';
import {
  deleteDefaultPermission,
  fetchDefaultPermissions,
  updateDefaultPermission,
} from 'src/resources/OrganizationResource';
import {
  permissionColumnNames,
  repoPermissions,
} from 'src/routes/OrganizationsList/Organization/Tabs/DefaultPermissions/DefaultPermissions';

export interface IDefaultPermission {
  createdBy: string;
  appliedTo: string;
  permission: string;
  id?: string;
}

interface IPrototype {
  activating_user: {
    name: string;
  };
  delegate: {
    name: string;
  };
  role: string;
  id: string;
}

export function useFetchDefaultPermissions(org: string) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState<SearchState>({
    query: '',
    field: permissionColumnNames.repoCreatedBy,
  });

  const {
    data: permissions,
    isError: errorLoadingPermissions,
    isLoading: loadingPermissions,
    isPlaceholderData,
  } = useQuery<IPrototype[]>(
    ['defaultpermissions', org],
    () => fetchDefaultPermissions(org),
    {
      placeholderData: [],
    },
  );

  const defaultPermissions: IDefaultPermission[] = [];
  permissions.map((perm) => {
    defaultPermissions.push({
      createdBy: perm.activating_user
        ? perm.activating_user.name
        : 'organization default',
      appliedTo: perm.delegate.name,
      permission: perm.role,
      id: perm.id,
    });
  });

  const filteredPermissions =
    search.query !== ''
      ? defaultPermissions?.filter((permission) =>
          permission.createdBy.includes(search.query),
        )
      : defaultPermissions;

  const paginatedPermissions = filteredPermissions?.slice(
    page * perPage - perPage,
    page * perPage - perPage + perPage,
  );

  return {
    loading: loadingPermissions || isPlaceholderData,
    error: errorLoadingPermissions,
    defaultPermissions: defaultPermissions,
    paginatedPermissions: paginatedPermissions,

    page,
    setPage,
    perPage,
    setPerPage,

    search,
    setSearch,
  };
}

export function useUpdateDefaultPermission(org: string) {
  const queryClient = useQueryClient();
  const {
    mutate: setDefaultPermission,
    isError: errorSetDefaultPermission,
    isSuccess: successSetDefaultPermission,
    reset: resetSetDefaultPermission,
  } = useMutation(
    async ({id, newRole}: {id: string; newRole: string}) => {
      return updateDefaultPermission(org, id, newRole);
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['defaultpermissions']);
      },
    },
  );
  return {
    setDefaultPermission,
    errorSetDefaultPermission,
    successSetDefaultPermission,
    resetSetDefaultPermission,
  };
}

export function useDeleteDefaultPermission(org: string) {
  const queryClient = useQueryClient();
  const {
    mutate: removeDefaultPermission,
    isError: errorDeleteDefaultPermission,
    isSuccess: successDeleteDefaultPermission,
    reset: resetDeleteDefaultPermission,
  } = useMutation(
    async ({id}: {id: string}) => {
      return deleteDefaultPermission(org, id);
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['defaultpermissions']);
      },
    },
  );
  return {
    removeDefaultPermission,
    errorDeleteDefaultPermission,
    successDeleteDefaultPermission,
    resetDeleteDefaultPermission,
  };
}
