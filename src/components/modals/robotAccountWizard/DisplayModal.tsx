import {useState} from 'react';
import {Modal, ModalVariant, Button} from '@patternfly/react-core';

export default function DisplayModal(props: DisplayModalProps) {
  const handleModalToggle = () => {
    props.setIsModalOpen(!props.isModalOpen);
  };

  return (
    <Modal
      variant={ModalVariant.large}
      title={props.title}
      isOpen={props.isModalOpen}
      onClose={handleModalToggle}
      actions={[
        <Button key="close" variant="primary" onClick={handleModalToggle}>
          Close
        </Button>,
        <Button key="cancel" variant="link" onClick={handleModalToggle}>
          Cancel
        </Button>,
      ]}
    >
      {props.Component}
    </Modal>
  );
}

interface DisplayModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (boolean) => void;
  title: string;
  Component: any;
}
