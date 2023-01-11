import {
  DropdownItem,
  Modal,
  ModalVariant,
  Wizard,
} from '@patternfly/react-core';
import React, {useState} from 'react';
import NameAndDescription from './robotAccountWizard/NameAndDescription';
import {useRobotAccounts} from 'src/hooks/useRobotAccounts';

import Footer from './robotAccountWizard/Footer';
import AddToTeam from './robotAccountWizard/AddToTeam';
import AddToRepository from './robotAccountWizard/AddToRepository';
import {addDisplayError} from 'src/resources/ErrorHandling';
import {useQuery} from '@tanstack/react-query';
import {fetchOrg} from 'src/resources/OrganizationResource';
import {useQueryClient} from '@tanstack/react-query';
import DefaultPermissions from './robotAccountWizard/DefaultPermissions';
import ReviewAndFinish from './robotAccountWizard/ReviewAndFinish';

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
  const [isDrawerExpanded, setDrawerExpanded] = useState(false);
  const queryClient = useQueryClient();

  // Fetching teams
  useQuery(
    ['organization', props.namespace, 'teams'],
    () => {
      fetchOrg(props.namespace).then((response) => {
        setTeams(Object['values'](response?.teams));
        return response?.teams;
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
      setErr(addDisplayError('Unable to create robot', error));
    }
  };

  const validateRobotName = () => {
    return /^[a-z][a-z0-9_]{1,254}$/.test(robotName);
  };

  const RepoPermissionDropdownItems = [
    <DropdownItem
      key="None"
      component="button"
      description="No permissions on the repository"
    >
      None
    </DropdownItem>,
    <DropdownItem
      key="Read"
      component="button"
      description="Can view and pull from the repository"
    >
      Read
    </DropdownItem>,
    <DropdownItem
      key="Write"
      component="button"
      description="Can view, pull and push to the repository"
    >
      Write
    </DropdownItem>,
    <DropdownItem
      key="Admin"
      component="button"
      description="Full admin access, pull and push to the repository"
    >
      Admin
    </DropdownItem>,
  ];

  const steps = [
    {
      name: 'Robot name and description',
      component: (
        <NameAndDescription
          name={robotName}
          setName={setRobotName}
          description={robotDescription}
          setDescription={setrobotDescription}
          nameLabel="Provide a name for your robot account:"
          descriptionLabel="Provide an optional description for your new robot:"
          helperText="Enter a description to provide extra information to your teammates about this robot account. Max length: 255"
          nameHelperText="Choose a name to inform your teammates about this robot account. Must match ^[a-z][a-z0-9_]{1,254}$."
          validateName={validateRobotName}
        />
      ),
    },
    {
      name: 'Add to team (optional)',
      component: (
        <AddToTeam
          items={teams}
          namespace={props.namespace}
          isDrawerExpanded={isDrawerExpanded}
          setDrawerExpanded={setDrawerExpanded}
        />
      ),
    },
    {
      name: 'Add to repository (optional)',
      component: (
        <AddToRepository
          namespace={props.namespace}
          dropdownItems={RepoPermissionDropdownItems}
        />
      ),
    },
    {
      name: 'Default permissions (optional)',
      component: (
        <DefaultPermissions
          robotName={robotName}
          repoPermissions={RepoPermissionDropdownItems}
        />
      ),
    },
    {
      name: 'Review and Finish',
      component: (
        <ReviewAndFinish
          robotName={robotName}
          robotDescription={robotDescription}
        />
      ),
    },
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
        width={1170}
        footer={
          <Footer
            onSubmit={onSubmit}
            isDrawerExpanded={isDrawerExpanded}
            isDataValid={validateRobotName}
          />
        }
        hasNoBodyPadding={isDrawerExpanded ? true : false}
      />
    </Modal>
  );
}

interface CreateRobotAccountModalProps {
  isModalOpen: boolean;
  handleModalToggle?: () => void;
  namespace: string;
}
