import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  TextVariants,
  PanelFooter,
  Dropdown,
  Spinner,
} from '@patternfly/react-core';
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import {useState} from 'react';
import {ToolbarPagination} from 'src/components/toolbar/ToolbarPagination';
import {
  IDefaultPermission,
  useFetchDefaultPermissions,
} from 'src/hooks/UseDefaultPermissions';
import DefaultPermissionsDropDown from './UpdateDefaultPermissionsDropDown';
import DefaultPermissionsToolbar from './DefaultPermissionsToolbar';
import DeleteDefaultPermissionKebab from './DeleteDefaultPermissionKebab';

export const permissionColumnNames = {
  repoCreatedBy: 'Repository Created By',
  permAppliedTo: 'Permission Applied To',
  permission: 'Permission',
};

export enum repoPermissions {
  ADMIN = 'Admin',
  READ = 'Read',
  WRITE = 'Write',
}

export default function DefaultPermissions(props: DefaultPermissionsProps) {
  const {
    loading,
    error,
    defaultPermissions,
    paginatedPermissions,
    page,
    setPage,
    perPage,
    setPerPage,
    search,
    setSearch,
  } = useFetchDefaultPermissions(props.orgName);

  const [selectedPermissions, setSelectedPermissions] =
    useState<IDefaultPermission[]>(defaultPermissions);

  const onSelectPermission = (
    permission: IDefaultPermission,
    rowIndex: number,
    isSelecting: boolean,
  ) => {
    setSelectedPermissions((prevSelected) => {
      const otherSelectedPermissions = prevSelected.filter(
        (p) => p.createdBy !== permission.createdBy,
      );
      return isSelecting
        ? [...otherSelectedPermissions, permission]
        : otherSelectedPermissions;
    });
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <>Unable to load default permissions list</>;
  }

  return (
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component={TextVariants.p}>
          The Default permissions panel defines permissions that should be
          granted automatically to a repository when it is created, in addition
          to the default of the repository&apos;s creator. Permissions are
          assigned based on the user who created the repository.
        </Text>
        <Text component={TextVariants.p}>
          Note: Permissions added here do not automatically get added to
          existing repositories.
        </Text>
      </TextContent>
      <DefaultPermissionsToolbar
        selectedItems={selectedPermissions}
        deSelectAll={() => setSelectedPermissions([])}
        allItems={defaultPermissions}
        paginatedItems={paginatedPermissions}
        onItemSelect={onSelectPermission}
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        search={search}
        setSearch={setSearch}
        searchOptions={[permissionColumnNames.repoCreatedBy]}
        setDrawerContent={props.setDrawerContent}
      >
        <TableComposable aria-label="Selectable table">
          <Thead>
            <Tr>
              <Th />
              <Th>{permissionColumnNames.repoCreatedBy}</Th>
              <Th>{permissionColumnNames.permAppliedTo}</Th>
              <Th>{permissionColumnNames.permission}</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {paginatedPermissions?.map((permission, rowIndex) => (
              <Tr key={rowIndex}>
                <Td
                  select={{
                    rowIndex,
                    onSelect: (_event, isSelecting) =>
                      onSelectPermission(permission, rowIndex, isSelecting),
                    isSelected: selectedPermissions.some(
                      (p) => p.createdBy === permission.createdBy,
                    ),
                  }}
                />
                <Td dataLabel={permissionColumnNames.repoCreatedBy}>
                  {permission.createdBy}
                </Td>
                <Td dataLabel={permissionColumnNames.permAppliedTo}>
                  {permission.appliedTo}
                </Td>
                <Td dataLabel={permissionColumnNames.permission}>
                  <DefaultPermissionsDropDown
                    org={props.orgName}
                    permission={permission}
                  />
                </Td>
                <Td data-label="kebab">
                  <DeleteDefaultPermissionKebab
                    org={props.orgName}
                    permission={permission}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </DefaultPermissionsToolbar>
    </PageSection>
  );
}

interface DefaultPermissionsProps {
  setDrawerContent: (any) => void;
  orgName: string;
}
