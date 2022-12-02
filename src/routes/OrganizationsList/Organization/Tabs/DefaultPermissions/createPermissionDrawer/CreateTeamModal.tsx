import {
  Button,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  TextInput,
} from '@patternfly/react-core';
import {ExclamationCircleIcon} from '@patternfly/react-icons';
import {useEffect, useState} from 'react';
import {useCreateTeam} from 'src/hooks/UseTeams';

type validate = 'success' | 'error' | 'default';

export const CreateTeamModal = (props: CreateTeamModalProps): JSX.Element => {
  const [validatedName, setValidatedName] = useState<validate>('default');
  const [nameHelperText, setNameHelperText] = useState(props.nameHelperText);

  const handleNameChange = (name: string) => {
    props.setName(name);
    setNameHelperText('Validating...');
  };

  useEffect(() => {
    if (props.name === '') {
      return;
    }
    props.validateName(props.name)
      ? setValidatedName('success')
      : setValidatedName('error');

    setNameHelperText(props.nameHelperText);
  }, [props.name]);

  const {createTeam} = useCreateTeam(props.orgName);

  const onCreateTeam = async () => {
    await createTeam(props.name, props.description);
    props.handleWizardToggle();
    props.handleModalToggle();
  };

  return (
    <Modal
      title="Create team"
      variant={ModalVariant.medium}
      isOpen={props.isModalOpen}
      onClose={props.handleModalToggle}
      actions={[
        <Button
          id="create-team-confirm"
          key="Proceed"
          variant="primary"
          onClick={onCreateTeam}
          form="modal-with-form-form"
          isDisabled={validatedName !== 'success'}
        >
          Proceed
        </Button>,
        <Button
          id="create-team-cancel"
          key="cancel"
          variant="link"
          onClick={props.handleModalToggle}
        >
          Cancel
        </Button>,
      ]}
    >
      <Form>
        <FormGroup
          label={props.nameLabel}
          fieldId="form-name"
          isRequired
          helperText={nameHelperText}
          helperTextInvalid={nameHelperText}
          validated={validatedName}
          helperTextInvalidIcon={<ExclamationCircleIcon />}
        >
          <TextInput
            isRequired
            type="text"
            id="robot-wizard-form-name"
            name="form-name"
            value={props.name}
            onChange={handleNameChange}
            validated={validatedName}
          />
        </FormGroup>
        <FormGroup
          label={props.descriptionLabel}
          fieldId="form-description"
          helperText={props.helperText}
        >
          <TextInput
            type="text"
            id="robot-wizard-form-description"
            name="form-description"
            value={props.description}
            onChange={(descr: string) => props.setDescription(descr)}
          />
        </FormGroup>
      </Form>
    </Modal>
  );
};

interface CreateTeamModalProps {
  name: string;
  setName: (teamName) => void;
  description: string;
  setDescription: (descr: string) => void;
  orgName: string;
  nameLabel: string;
  descriptionLabel: string;
  helperText: string;
  nameHelperText: string;
  validateName: (string) => boolean;
  isModalOpen: boolean;
  handleModalToggle: () => void;
  handleWizardToggle: () => void;
}
