import {Dropdown, DropdownItem, KebabToggle} from '@patternfly/react-core';
import {IRobot} from 'src/resources/RobotsResource';
import {useDeleteRobotAccounts} from 'src/hooks/UseDeleteRobotAccount';
import {useState} from 'react';

export default function RobotAccountKebab(props: RobotAccountKebabProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSelect = () => {
    setIsOpen(false);
    const element = document.getElementById(
      `${props.robotAccount.name}-toggle-kebab`,
    );
    element.focus();
  };

  const {deleteRobotAccounts} = useDeleteRobotAccounts({
    namespace: props.namespace,
    onSuccess: () => {
      setIsOpen(false);
    },
    onError: (err) => {
      props.setError(err);
    },
  });
  const deleteRobotAccount = async () => {
    await deleteRobotAccounts([props.robotAccount.name]);
  };

  return (
    <>
      <Dropdown
        onSelect={onSelect}
        toggle={
          <KebabToggle
            id={`${props.robotAccount.name}-toggle-kebab`}
            onToggle={() => {
              setIsOpen(!isOpen);
            }}
          />
        }
        isOpen={isOpen}
        dropdownItems={[
          <DropdownItem
            key="delete"
            onClick={() => deleteRobotAccount()}
            className="red-color"
            id={`${props.robotAccount.name}-btn`}
          >
            Delete
          </DropdownItem>,
        ]}
        isPlain
      />
    </>
  );
}

interface RobotAccountKebabProps {
  namespace: string;
  robotAccount: IRobot;
  setError: (err) => void;
}
