import {Modal, ModalVariant} from '@patternfly/react-core';

export default function CreateRobotAccountModal(
  props: CreateRobotAccountModalProps,
) {
  if (!props.isModalOpen) {
    return null;
  }
  return (
    <Modal
      title="Create Robot Account"
      id="create-robot-account-modal"
      variant={ModalVariant.large}
      isOpen={props.isModalOpen}
      onClose={props.handleModalToggle}
    >
      Something here
    </Modal>
  );
}

interface CreateRobotAccountModalProps {
  isModalOpen: boolean;
  handleModalToggle?: () => void;
}
