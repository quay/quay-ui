import {Modal, ModalVariant, Wizard} from '@patternfly/react-core';
import {useState} from 'react';
import NameAndDescription from './robotAccountWizard/NameAndDescription';
import {useRobotAccounts} from 'src/hooks/useRobotAccounts';

import Footer from './robotAccountWizard/Footer';
import AddToTeam from './robotAccountWizard/AddToTeam';
import {addDisplayError} from 'src/resources/ErrorHandling';
import {useQuery} from '@tanstack/react-query';
import {fetchOrg} from 'src/resources/OrganizationResource';
import {useQueryClient} from '@tanstack/react-query';

export default function CreateRobotAccountModal(
  props: CreateRobotAccountModalProps,
) {
  if (!props.isModalOpen) {
    return null;
  }

  const {createNewRobot} = useRobotAccounts(props.namespace);
  const [robotName, setRobotName] = useState('');
  const [robotDescription, setrobotDescription] = useState('');
  const [err, setErr] = useState<string>();
  const [teams, setTeams] = useState([]);
  const queryClient = useQueryClient();

  // Fetching teams
  useQuery(
    ['organization', props.namespace],
    () => {
      fetchOrg(props.namespace).then((response) => {
        setTeams(Object['values'](response?.teams));
        return response;
      });
      return [];
    },
    {
      placeholderData: () => {
        return queryClient.getQueryData(['organization', props.namespace]);
      },
    },
  );

  const onSubmit = async () => {
    try {
      await createNewRobot({
        namespace: props.namespace,
        robotname: robotName,
        description: robotDescription,
        isUser: false,
      });
      props.handleModalToggle();
    } catch (error) {
      console.error(error);
      setErr(addDisplayError('Unable to create repository', error));
    }
  };

  const steps = [
    {
      name: 'Robot name and description',
      component: (
        <NameAndDescription
          robotName={robotName}
          setRobotName={setRobotName}
          robotDescription={robotDescription}
          setrobotDescription={setrobotDescription}
        />
      ),
    },
    {
      name: 'Add to team (optional)',
      component: <AddToTeam items={teams} namespace={props.namespace} />,
    },
    {name: 'Add to repository (optional)', component: <p>Step 3</p>},
    {name: 'Default permissions (optional)', component: <p>Step 4</p>},
    {name: 'Review and Finish', component: <p>Review Step</p>},
  ];

  return (
    <Modal
      id="create-robot-account-modal"
      aria-label="CreateRobotAccount"
      variant={ModalVariant.large}
      isOpen={props.isModalOpen}
      onClose={props.handleModalToggle}
      showClose={false}
      hasNoBodyWrapper
    >
      <Wizard
        titleId="robot-account-wizard-label"
        descriptionId="robot-account-wizard-description"
        title="Create robot account (organization/namespace)"
        description="Robot Accounts are named tokens that can be granted permissions on multiple repositories under this organization."
        steps={steps}
        onClose={props.handleModalToggle}
        height={600}
        footer={<Footer onSubmit={onSubmit} />}
      />
    </Modal>
  );
}

interface CreateRobotAccountModalProps {
  isModalOpen: boolean;
  handleModalToggle?: () => void;
  namespace: string;
}
