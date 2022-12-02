import {
  Alert,
  AlertActionCloseButton,
  AlertGroup,
  Dropdown,
  DropdownItem,
  DropdownToggle,
} from '@patternfly/react-core';
import {useState} from 'react';
import Conditional from 'src/components/empty/Conditional';
import {
  IDefaultPermission,
  useUpdateDefaultPermission,
} from 'src/hooks/UseDefaultPermissions';
import {repoPermissions} from './DefaultPermissions';

export default function DefaultPermissionsDropDown({
  org,
  permission,
}: DefaultPermissionsDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    setDefaultPermission,
    successSetDefaultPermission: success,
    errorSetDefaultPermission: error,
    resetSetDefaultPermission,
  } = useUpdateDefaultPermission(org);

  return (
    <>
      <Conditional if={error}>
        <AlertGroup isToast isLiveRegion>
          <Alert
            variant="danger"
            title={`Unable to update permissions for creator: ${permission.createdBy}`}
            actionClose={
              <AlertActionCloseButton onClose={resetSetDefaultPermission} />
            }
          />
        </AlertGroup>
      </Conditional>
      <Conditional if={success}>
        <AlertGroup isToast isLiveRegion>
          <Alert
            variant="success"
            title={`Permission updated successfully for creator: ${permission.createdBy}`}
            actionClose={
              <AlertActionCloseButton onClose={resetSetDefaultPermission} />
            }
          />
        </AlertGroup>
      </Conditional>
      <Dropdown
        onSelect={() => setIsOpen(false)}
        toggle={
          <DropdownToggle onToggle={() => setIsOpen(!isOpen)}>
            {permission.permission}
          </DropdownToggle>
        }
        isOpen={isOpen}
        dropdownItems={Object.keys(repoPermissions).map((key) => (
          <DropdownItem
            key={repoPermissions[key]}
            onClick={() =>
              setDefaultPermission({
                id: permission.id,
                newRole: repoPermissions[key],
              })
            }
          >
            {repoPermissions[key]}
          </DropdownItem>
        ))}
      />
    </>
  );
}

interface DefaultPermissionsDropdownProps {
  org: string;
  permission: IDefaultPermission;
}
