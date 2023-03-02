import {Dropdown, DropdownItem, KebabToggle} from '@patternfly/react-core';
import {IRobot} from 'src/resources/RobotsResource';
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

  const onClick = () => {
    props.setSelectedRobotAccount([props.robotAccount.name]);
    props.setDeleteModalOpen(true);
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
            onClick={() => onClick()}
            className="red-color"
            id={`${props.robotAccount.name}-btn`}
          >
            {props.deleteKebabIsOpen ? props.deleteModal() : null}
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
  deleteModal: () => object;
  deleteKebabIsOpen: boolean;
  setDeleteModalOpen: (open) => void;
  setSelectedRobotAccount: (robotAccount) => void;
}
