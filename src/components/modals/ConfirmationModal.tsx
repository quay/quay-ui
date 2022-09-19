import {setRepositoryVisibility} from 'src/resources/RepositoryResource';
import {Modal, ModalVariant, Button} from '@patternfly/react-core';
import {useState} from 'react';
import FormError from 'src/components/errors/FormError';
import {addDisplayError} from 'src/resources/ErrorHandling';
import {useRefreshRepoList} from 'src/hooks/UseRefreshPage';

export function ConfirmationModal(props: ConfirmationModalProps) {
  const [err, setErr] = useState<string>();
  const refresh = useRefreshRepoList();

  const changeVisibility = async () => {
    const visibility = props.makePublic ? 'public' : 'private';
    try {
      // TODO: Could replace this with a 'bulkSetRepoVisibility'
      // function in RepositoryResource in the future
      await Promise.all(
        props.selectedItems.map((item) => {
          const ls = item.split('/', 2);
          return setRepositoryVisibility(ls[0], ls[1], visibility);
        }),
      );
      refresh();
      props.toggleModal();
      props.selectAllRepos(false);
    } catch (error: any) {
      console.error(error);
      setErr(addDisplayError('Unable to change visibility', error));
    }
  };

  const handleModalConfirm = async () => {
    // This modal should never render if no items have been selected,
    // that should be handled by the parent component. Leaving this check
    // in anyway.
    if (props.selectedItems.length > 0) {
      await changeVisibility();
    } else {
      setErr('No items selected');
    }
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
      <FormError message={err} setErr={setErr} />
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
  selectAllRepos: (isSelecting) => void;
};
