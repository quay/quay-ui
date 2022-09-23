import {
  Modal,
  ModalVariant,
  Button,
  Form,
  FormGroup,
  TextInput,
} from '@patternfly/react-core';
import './css/Organizations.scss';
import {createOrg} from 'src/resources/OrganizationResource';
import {isValidEmail} from 'src/libs/utils';
import {useState} from 'react';
import FormError from 'src/components/errors/FormError';
import {addDisplayError} from 'src/resources/ErrorHandling';
import {userRefreshOrgList} from 'src/hooks/UseRefreshPage';

export const CreateOrganizationModal = (
  props: CreateOrganizationModalProps,
): JSX.Element => {
  const [organizationName, setOrganizationName] = useState('');
  const [organizationEmail, setOrganizationEmail] = useState('');
  const [invalidEmailFlag, setInvalidEmailFlag] = useState(false);
  const [validOrgName, setValidOrgName] = useState(true);
  const [err, setErr] = useState<string>();
  const refresh = userRefreshOrgList();

  const handleNameInputChange = (value: any) => {
    const regex = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)$/;
    setValidOrgName(
      regex.test(organizationName) && organizationName.length < 256,
    );
    setOrganizationName(value);
  };

  const handleEmailInputChange = (value: any) => {
    setOrganizationEmail(value);
  };

  const createOrganizationHandler = async () => {
    try {
      const response = await createOrg(organizationName, organizationEmail);
      props.handleModalToggle();
      if (response === 'Created') {
        refresh();
      }
    } catch (err) {
      console.error(err);
      setErr(addDisplayError('Unable to create organization', err));
    }
  };

  const onInputBlur = () => {
    if (organizationEmail.length !== 0) {
      isValidEmail(organizationEmail)
        ? setInvalidEmailFlag(false)
        : setInvalidEmailFlag(true);
    } else {
      return;
    }
  };

  return (
    <Modal
      title="Create Organization"
      variant={ModalVariant.large}
      isOpen={props.isModalOpen}
      onClose={props.handleModalToggle}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          onClick={createOrganizationHandler}
          form="modal-with-form-form"
          isDisabled={invalidEmailFlag || !organizationName || !validOrgName}
        >
          Create
        </Button>,
        <Button key="cancel" variant="link" onClick={props.handleModalToggle}>
          Cancel
        </Button>,
      ]}
    >
      <FormError message={err} setErr={setErr} />
      <Form id="modal-with-form-form" isWidthLimited>
        <FormGroup
          isInline
          label="Organization Name"
          isRequired
          fieldId="modal-with-form-form-name"
          helperText="This will also be the namespace for your repositories. Must be alphanumeric, all lowercase, at least 2 characters long and at most 255 characters long"
          helperTextInvalid={
            'Must be alphanumeric, all lowercase, at least 2 characters long and at most 255 characters long'
          }
          validated={validOrgName ? 'default' : 'error'}
        >
          <TextInput
            isRequired
            type="text"
            id="modal-with-form-form-name"
            value={organizationName}
            onChange={handleNameInputChange}
            validated={validOrgName ? 'default' : 'error'}
          />
        </FormGroup>
        <FormGroup
          label="Organization Email"
          fieldId="modal-with-form-form-email"
          helperText="This address must be different from your account's email"
          helperTextInvalid={'Enter a valid email: email@provider.com'}
          validated={invalidEmailFlag ? 'error' : 'default'}
        >
          <TextInput
            type="email"
            id="modal-with-form-form-name"
            name="modal-with-form-form-name"
            value={organizationEmail}
            onChange={handleEmailInputChange}
            validated={invalidEmailFlag ? 'error' : 'default'}
            onBlur={onInputBlur}
          />
        </FormGroup>
        <br />
      </Form>
    </Modal>
  );
};

type CreateOrganizationModalProps = {
  isModalOpen: boolean;
  handleModalToggle?: () => void;
};
