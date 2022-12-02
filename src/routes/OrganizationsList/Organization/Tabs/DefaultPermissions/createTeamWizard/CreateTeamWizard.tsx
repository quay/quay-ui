import {
  Modal,
  ModalVariant,
  TextContent,
  Text,
  TextVariants,
  Wizard,
  AlertGroup,
  Alert,
  AlertActionCloseButton,
} from '@patternfly/react-core';
import {useState} from 'react';
import AddToRepository from 'src/components/modals/wizard/AddToRepository';
import NameAndDescription from 'src/routes/OrganizationsList/Organization/Tabs/DefaultPermissions/createTeamWizard/NameAndDescription';
import {ITeamMember, useAddMembersToTeam} from 'src/hooks/UseMembers';
import AddTeamMember from './AddTeamMember';
import ReviewAndFinishFooter from './ReviewAndFinishFooter';
import Review from './ReviewTeam';
import Conditional from 'src/components/empty/Conditional';

export const CreateTeamWizard = (props: CreateTeamWizardProps): JSX.Element => {
  const [selectedMembers, setSelectedMembers] = useState<ITeamMember[]>([]);

  const [selectedRepos, setSeletectedRepos] = useState<[]>();

  const {
    addMemberToTeam,
    errorAddingMemberToTeam: error,
    successAddingMemberToTeam: success,
    resetAddingMemberToTeam: reset,
  } = useAddMembersToTeam(props.orgName);

  const onSubmitTeamWizard = async () => {
    console.log('selectedMembers', selectedMembers);
    props.setAppliedTo({
      is_robot: false,
      name: props.teamName,
      kind: 'team',
    });
    if (selectedRepos?.length > 0) {
      // copy over add to repo api call from robot accounts wizard
    }
    if (selectedMembers?.length > 0) {
      selectedMembers.map(async (mem) => {
        await addMemberToTeam({team: props.teamName, member: mem.name});
      });
    }
    props.handleWizardToggle();
  };

  const steps = [
    {
      name: 'Name & Description',
      component: (
        <>
          <TextContent>
            <Text component={TextVariants.h1}>Team name and description</Text>
          </TextContent>
          <NameAndDescription
            name={props.teamName}
            description={props.teamDescription}
            nameLabel="Team name for your new team:"
            descriptionLabel="Team description for your new team:"
          />
        </>
      ),
    },
    {
      name: 'Add to repository',
      component: (
        <>
          <TextContent>
            <Text component={TextVariants.h1}>Add to repository</Text>
          </TextContent>
          <AddToRepository />
        </>
      ),
    },
    {
      name: 'Add team member (optional)',
      component: (
        <>
          <TextContent>
            <Text component={TextVariants.h1}>Add team member (optional)</Text>
          </TextContent>
          <AddTeamMember
            orgName={props.orgName}
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
          />
        </>
      ),
    },
    {
      name: 'Review and Finish',
      component: (
        <>
          <TextContent>
            <Text component={TextVariants.h1}>Review</Text>
          </TextContent>
          <Review
            orgName={props.orgName}
            teamName={props.teamName}
            description={props.teamDescription}
            selectedMembers={selectedMembers}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Conditional if={error}>
        <AlertGroup isToast isLiveRegion>
          <Alert
            variant="danger"
            title={`Unable to add member to ${props.teamName} team`}
            actionClose={<AlertActionCloseButton onClose={reset} />}
          />
        </AlertGroup>
      </Conditional>
      <Conditional if={success}>
        <AlertGroup isToast isLiveRegion>
          <Alert
            variant="success"
            title={`Sucessfully added member to ${props.teamName} team`}
            actionClose={<AlertActionCloseButton onClose={reset} />}
          />
        </AlertGroup>
      </Conditional>
      <Modal
        id="create-team-modal"
        aria-label="CreateTeam"
        variant={ModalVariant.large}
        isOpen={props.isTeamWizardOpen}
        onClose={props.handleWizardToggle}
        showClose={false}
        hasNoBodyWrapper
      >
        <Wizard
          titleId="create-team-wizard-label"
          descriptionId="create-team-wizard-description"
          title="Create team"
          description=""
          steps={steps}
          onClose={props.handleWizardToggle}
          height={600}
          width={1170}
          footer={
            <ReviewAndFinishFooter
              onSubmit={onSubmitTeamWizard}
              canSubmit={props.teamName !== ''}
            />
          }
        />
      </Modal>
    </>
  );
};

interface CreateTeamWizardProps {
  teamName: string;
  teamDescription: string;
  isTeamWizardOpen: boolean;
  handleWizardToggle?: () => void;
  orgName: string;
  setAppliedTo: (string) => void;
}
