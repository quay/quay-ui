import {
  Button,
  Form,
  HelperText,
  HelperTextItem,
  Modal,
  ModalVariant,
  TextInput,
} from '@patternfly/react-core';
import * as React from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {UserState} from 'src/atoms/UserState';
import {getUser} from 'src/resources/UserResource';

export const DeleteRepositoryModal = (
  props: DeleteRepositoryModalProps,
): JSX.Element => {
  const {isModalOpen, handleModalToggle, handleRepoDeletion} = props;

  const [repoToBeDeleted, setRepoToBeDeleted] = React.useState('');

  const loggedInUser = useRecoilValue(UserState);

  return (
    <Modal
      title="Delete repositories"
      variant={ModalVariant.small}
      isOpen={isModalOpen}
      onClose={handleModalToggle}
      actions={[
        <Button
          key="delete"
          variant="danger"
          onClick={handleRepoDeletion}
          form="modal-with-form-form"
        >
          Delete
        </Button>,
        <Button key="cancel" variant="link" onClick={handleModalToggle}>
          Cancel
        </Button>,
      ]}
    >
      <Form id="modal-with-form-form">
        <HelperText>
          <HelperTextItem>This action cannot be undone.</HelperTextItem>
        </HelperText>
        <p>
          {' '}
          Confirm deletion by typing{' '}
          <b>{`${loggedInUser.username}/${repoToBeDeleted}`} </b>below:{' '}
        </p>
        <TextInput
          value={repoToBeDeleted}
          type="text"
          onChange={(value) => setRepoToBeDeleted(value)}
          aria-label="text input example"
        />
      </Form>
    </Modal>
  );
};

type DeleteRepositoryModalProps = {
  isModalOpen: boolean;
  handleModalToggle?: () => void;
  handleRepoDeletion: () => void;
};
