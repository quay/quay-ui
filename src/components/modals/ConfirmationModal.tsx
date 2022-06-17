import {setRepositoryVisibility} from 'src/resources/RepositoryResource';
import {Modal, ModalVariant, Button} from '@patternfly/react-core';

export function ConfirmationModal(props: ConfirmationModalProps) {
  const handleModalConfirm = () => {
    if (props.selectedItems.length > 0) {
      const visbility = props.makePublic ? 'public' : 'private';
      // TODO(sunanda): Handle repositories state change
      try {
        const response = props.selectedItems.map((item) => {
          const ls = item.split('/', 2);
          setRepositoryVisibility(ls[0], ls[1], visbility);
        });
      } catch (error) {
        console.log(error);
      }
    }
    props.toggleModal();
  };

  return (
    <Modal
      variant={ModalVariant.small}
      title={props.title}
      isOpen={props.modalOpen}
      onClose={props.toggleModal}
      actions={[
        <Button key="confirm" variant="primary" onClick={handleModalConfirm}>
          {props.buttonText}
        </Button>,
        <Button key="cancel" variant="link" onClick={props.toggleModal}>
          Cancel
        </Button>,
      ]}
    >
      {props.description}
    </Modal>
  );
}

type ConfirmationModalProps = {
  title: string;
  description: string;
  modalOpen: boolean;
  buttonText: string;
  selectedItems: string[];
  makePublic: boolean;
  toggleModal: () => void;
};
