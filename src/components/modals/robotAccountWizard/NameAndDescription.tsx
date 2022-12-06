import {Form, FormGroup, TextInput} from '@patternfly/react-core';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import {useEffect, useState} from 'react';

const NameHelperText =
  'Choose a name to inform your teammates about this robot account. Must match ^[a-z][a-z0-9_]{1,254}$.';
type validate = 'success' | 'error' | 'default';

export default function NameAndDescription(props: NameAndDescriptionProps) {
  const [validatedName, setValidatedName] = useState<validate>('default');
  const [nameHelperText, setNameHelperText] = useState(NameHelperText);

  const handleNameChange = (robotName: string) => {
    props.setRobotName(robotName);
    setNameHelperText('Validating...');
  };

  useEffect(() => {
    if (props.robotName == '') {
      setValidatedName('default');
      setNameHelperText(NameHelperText);
      return;
    }
    if (/^[a-z][a-z0-9_]{1,254}$/.test(props.robotName)) {
      setValidatedName('success');
    } else {
      setValidatedName('error');
    }
    setNameHelperText(NameHelperText);
  }, [props.robotName]);

  return (
    <Form>
      <FormGroup
        label="Provide a name for your robot account:"
        fieldId="robot-form-name"
        isRequired
        helperText={nameHelperText}
        helperTextInvalid={nameHelperText}
        validated={validatedName}
        helperTextInvalidIcon={<ExclamationCircleIcon />}
      >
        <TextInput
          isRequired
          type="text"
          id="robot-form-name"
          name="robot-form-name"
          value={props.robotName}
          onChange={handleNameChange}
          validated={validatedName}
        />
      </FormGroup>
      <FormGroup
        label="Provide an optional description for your new robot:"
        fieldId="robot-form-description"
        helperText="Enter a description to provice extra information to your teammates about this robot account."
      >
        <TextInput
          type="text"
          id="robot-form-description"
          name="robot-form-description"
          value={props.robotDescription}
          onChange={(robotDescription: string) =>
            props.setrobotDescription(robotDescription)
          }
        />
      </FormGroup>
    </Form>
  );
}

interface NameAndDescriptionProps {
  robotName: string;
  setRobotName: (robotName) => void;
  robotDescription: string;
  setrobotDescription: (robotDescription) => void;
}
