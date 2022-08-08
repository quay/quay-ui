import {setRepositoryVisibility} from 'src/resources/RepositoryResource';
import {Modal, ModalVariant, Button} from '@patternfly/react-core';
import {getUser} from 'src/resources/UserResource';
import {useRecoilState} from 'recoil';
import {UserState} from 'src/atoms/UserState';

export function ConfirmationModal(props: ConfirmationModalProps) {
  const [, setUserState] = useRecoilState(UserState);

  async function changeVisibility() {
    if (props.selectedItems.length > 0) {
      const visibility = props.makePublic ? 'public' : 'private';
      try {
        const response = await Promise.all(
          props.selectedItems.map((item) => {
            const ls = item.split('/', 2);
            setRepositoryVisibility(ls[0], ls[1], visibility);
          }),
        );
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleModalConfirm = async () => {
    await changeVisibility().then(async () => {
      const user = await getUser();
      setUserState(user);
      props.toggleModal();
      props.selectAllRepos(false);
    });
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
  selectAllRepos: (isSelecting) => void;
};
