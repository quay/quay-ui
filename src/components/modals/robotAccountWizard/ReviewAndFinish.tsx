import {
  TextContent,
  Text,
  TextVariants,
  TextInput,
  FormGroup,
  Form,
  DropdownItem,
} from '@patternfly/react-core';
import React from 'react';

export default function ReviewAndFinish(props: ReviewAndFinishProps) {
  return (
    <>
      <TextContent>
        <Text component={TextVariants.h1}>Review and finish</Text>
      </TextContent>
      <Form>
        <FormGroup
          label="Provide a name for your robot account:"
          fieldId="robot-name"
          isRequired
          disabled
        >
          <TextInput
            value={props.robotName}
            type="text"
            aria-label="robot-name-value"
            isDisabled
            className="fit-content"
          />
        </FormGroup>
        <FormGroup
          label="Provide an optional description for your robot account:"
          fieldId="robot-description"
          isRequired
          disabled
          className="fit-content"
        >
          <TextInput
            value={props.robotDescription}
            type="text"
            aria-label="robot-description"
            isDisabled
          />
        </FormGroup>
      </Form>
    </>
  );
}

interface ReviewAndFinishProps {
  robotName: string;
  robotDescription: string;
}
