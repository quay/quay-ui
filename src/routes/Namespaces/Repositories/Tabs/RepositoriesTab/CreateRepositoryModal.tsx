import * as React from 'react';
import {
  Modal,
  ModalVariant,
  Button,
  Form,
  FormGroup,
  TextInput,
} from '@patternfly/react-core';

export const CreateRepositoryModal = (
  props: CreateRepositoryModalProps,
): JSX.Element => {
  const { isModalOpen, handleModalToggle, quayEndPoint } = props;

  const [namespaceName, setNamespaceName] = React.useState('');
  const [namespaceEmail, setNamespaceEmail] = React.useState('')

  const [repoVisibility, setrepoVisibility] = React.useState('');


  const nameInputRef = React.useRef();

  const handleNameInputChange = (value) => {
    setNamespaceName(value);
  };

  const handleEmailInputChange = (value) => {
    setNamespaceEmail(value);
  };


  const createRepositoryHandler = async () => {
    handleModalToggle(); // check if this is needed
    await fetch(`${quayEndPoint.QUAY_HOSTNAME}/api/v1/organization/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${quayEndPoint.QUAY_OAUTH_TOKEN}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({ name: namespaceName, email: namespaceEmail }),
    }).then;

    // await consoleFetch(`${SECRET_SERVICE_URL}/api/v1/namespaces/${namespace}/secrets`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(getNewPartialSecret('destination', namespace)),
    // });
  };

  // const openNamespaceModal = () => {

  // }

  return (
    <Modal
      title="Create New Repository"
      variant={ModalVariant.medium}
      isOpen={isModalOpen}
      onClose={handleModalToggle}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          onClick={createRepositoryHandler}
          form="modal-with-form-form"
        >
          Create Repository
        </Button>,
      ]}
    >
      <Form id="modal-with-form-form" isWidthLimited>
        <FormGroup
          isInline
          label="Namespace Name"
          isRequired
          fieldId="modal-with-form-form-name"
          helperText="This will also be the namespace for your repositories. Must be alphanumeric, all lowercase, at least 2 characters long and at most 255 characters long"
          // className='text-input-width'
        >
          <TextInput
            isRequired
            type="text"
            id="modal-with-form-form-name"
            value={namespaceName}
            onChange={handleNameInputChange}
            ref={nameInputRef}
          />
        </FormGroup>
        <FormGroup
          label="Repository description"
          isRequired
          fieldId="modal-with-form-form-email"
          // helperText="This address must be different from your account's email"
          // className='text-input-width'
        >
          <TextInput
            type="text"
            id="modal-with-form-form-name"
            name="modal-with-form-form-name"
            value={namespaceEmail}
            onChange={handleEmailInputChange}
            ref={nameInputRef}
          />
        </FormGroup>
        {/* <FormGroup>
        <Radio
          isChecked={this.state.check1}
          name="Public"
          onChange={this.handleChange}
          label="Controlled radio"
          id="radio-controlled"
          value="check1"
        />
                <Radio
          isChecked={this.state.check1}
          name="Private"
          onChange={this.handleChange}
          label="Controlled radio"
          id="radio-controlled"
          value="check1"
        />
        </FormGroup> */}
        <br />
      </Form>

    </Modal>
  );
};

type CreateRepositoryModalProps = {
  isModalOpen: boolean;
  handleModalToggle?: () => void;
  quayEndPoint: {
    QUAY_OAUTH_TOKEN: string;
    QUAY_HOSTNAME: string;
  };
};
