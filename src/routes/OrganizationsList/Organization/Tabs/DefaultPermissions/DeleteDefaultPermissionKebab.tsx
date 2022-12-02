import {
  Alert,
  AlertActionCloseButton,
  AlertGroup,
  Dropdown,
  DropdownItem,
  KebabToggle,
} from '@patternfly/react-core';
import {useState} from 'react';
import Conditional from 'src/components/empty/Conditional';
import {
  IDefaultPermission,
  useDeleteDefaultPermission,
} from 'src/hooks/UseDefaultPermissions';

export default function DeleteDefaultPermissionKebab({
  org,
  permission,
}: DefaultPermissionsDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    removeDefaultPermission,
    errorDeleteDefaultPermission: error,
    successDeleteDefaultPermission: success,
    resetDeleteDefaultPermission: reset,
  } = useDeleteDefaultPermission(org);

  const onSelect = () => {
    setIsOpen(false);
    const element = document.getElementById(
      `${permission.createdBy}-toggle-kebab`,
    );
    element.focus();
  };

  return (
    <>
      <Conditional if={error}>
        <AlertGroup isToast isLiveRegion>
          <Alert
            variant="danger"
            title={`Unable to delete permissions for ${permission.createdBy}`}
            actionClose={<AlertActionCloseButton onClose={reset} />}
          />
        </AlertGroup>
      </Conditional>
      <Conditional if={success}>
        <AlertGroup isToast isLiveRegion>
          <Alert
            variant="success"
            title={`Permission created by ${permission.createdBy} successfully deleted`}
            actionClose={<AlertActionCloseButton onClose={reset} />}
          />
        </AlertGroup>
      </Conditional>
      <Dropdown
        onSelect={onSelect}
        toggle={
          <KebabToggle
            id={`${permission.createdBy}-toggle-kebab`}
            onToggle={() => {
              setIsOpen(!isOpen);
            }}
          />
        }
        isOpen={isOpen}
        dropdownItems={[
          <DropdownItem
            key="delete"
            onClick={() => removeDefaultPermission({id: permission.id})}
          >
            Delete Permission
          </DropdownItem>,
        ]}
        isPlain
      />
    </>
  );
}

interface DefaultPermissionsDropdownProps {
  org: string;
  permission: IDefaultPermission;
}
