import {
  Text,
  TextContent,
  TextVariants,
  Form,
  FormGroup,
  TextInput,
} from '@patternfly/react-core';
import {ITeamMember} from 'src/hooks/UseMembers';

export default function Review(props: ReviewProps) {
  return (
    <>
      <Form>
        <FormGroup label="Team name" fieldId="team-name" isRequired disabled>
          <TextInput
            value={props.teamName}
            type="text"
            aria-label="team-name-value"
            isDisabled
            className="fit-content"
          />
        </FormGroup>
        <FormGroup
          label="Description"
          fieldId="team-description"
          disabled
          className="fit-content"
        >
          <TextInput
            value={props.description}
            type="text"
            aria-label="team-description"
            isDisabled
          />
        </FormGroup>
        <FormGroup
          label="Repositories"
          fieldId="team-repositories"
          isRequired
          disabled
          className="fit-content"
        >
          <TextInput
            value={'repo'}
            type="text"
            aria-label="team-repositories"
            isDisabled
          />
        </FormGroup>
        <FormGroup
          label="Members"
          fieldId="team-members"
          isRequired
          disabled
          className="fit-content"
        >
          <TextInput
            value={props.selectedMembers?.map((item) => item.name).join(', ')}
            type="text"
            aria-label="team-members"
            isDisabled
          />
        </FormGroup>
      </Form>
    </>
  );
}

interface ReviewProps {
  orgName?: string;
  teamName: string;
  description: string;
  selectedMembers: ITeamMember[];
}
