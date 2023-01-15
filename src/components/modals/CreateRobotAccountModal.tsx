import {
  Modal,
  ModalVariant,
  Text,
  TextContent,
  TextVariants,
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
import {useRecoilState} from 'recoil';
import {
  selectedReposState,
  selectedReposPermissionState,
} from 'src/atoms/RepositoryState';
import {selectedTeamsState} from 'src/atoms/TeamState';
import {selectedRobotDefaultPermission} from 'src/atoms/RobotAccountState';
import {useRepositories} from 'src/hooks/UseRepositories';

export default function CreateRobotAccountModal(
  props: CreateRobotAccountModalProps,
) {
  if (!props.isModalOpen) {
    return null;
  }

  const {
    createNewRobot,
    updateRepoPermsForRobot,
    updateTeamsForRobot,
    addDefaultPermsForRobot,
  } = useRobotAccounts(props.namespace);

  // Fetching repos
  const {repos: repos, totalResults: repoCount} = useRepositories(
    props.namespace,
  );

  const [robotName, setRobotName] = useState('');
  const [robotDescription, setrobotDescription] = useState('');
  const [err, setErr] = useState<string>();
  const [teams, setTeams] = useState([]);
  const [selectedRepoPerms, setSelectedRepoPerms] = useRecoilState(
    selectedReposPermissionState,
  );
  const [selectedTeams, setSelectedTeams] = useRecoilState(selectedTeamsState);
  const [selectedRepos, setSelectedRepos] = useRecoilState(selectedReposState);
  const [robotDefaultPerm, setRobotdefaultPerm] = useRecoilState(
    selectedRobotDefaultPermission,
  );
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
      })
        .then(() => {
          const reposToUpdate = filteredRepos();
          if (reposToUpdate) {
            Promise.allSettled(
              reposToUpdate.map((repo) =>
                updateRepoPermsForRobot({
                  namespace: props.namespace,
                  robotname: robotName,
                  reponame: repo.name,
                  permission: repo.permission,
                  isUser: false,
                }),
              ),
            );
          }
        })
        .then(() => {
          if (selectedTeams) {
            Promise.allSettled(
              selectedTeams.map((team) =>
                updateTeamsForRobot({
                  namespace: props.namespace,
                  teamname: team.name,
                  robotname: robotName,
                }),
              ),
            );
          }
        })
        .then(() => {
          if (robotDefaultPerm) {
            addDefaultPermsForRobot({
              namespace: props.namespace,
              robotname: robotName,
              permission: robotDefaultPerm,
            });
          }
        });
      props.handleModalToggle();
    } catch (error) {
      console.error(error);
      setErr(addDisplayError('Unable to create robot', error));
    }
  };

  // addDefaultPermsForRobotMutator
  const validateRobotName = () => {
    return /^[a-z][a-z0-9_]{1,254}$/.test(robotName);
  };

  const RepoPermissionDropdownItems = [
    {
      name: 'None',
      description: 'No permissions on the repository',
    },
    {
      name: 'Read',
      description: 'Can view and pull from the repository',
    },
    {
      name: 'Write',
      description: 'Can view, pull, and push to the repository',
    },
    {
      name: 'Admin',
      description: 'Full admin access to the organization',
    },
  ];

  const filteredRepos = () => {
    return selectedRepoPerms.filter((repo) =>
      selectedRepos.includes(repo.name),
    );
  };

  const steps = [
    {
      name: 'Robot name and description',
      component: (
        <>
          <TextContent>
            <Text component={TextVariants.h1}>
              Provide robot account name and description
            </Text>
          </TextContent>
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
        </>
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
          selectedTeams={selectedTeams}
          setSelectedTeams={setSelectedTeams}
        />
      ),
    },
    {
      name: 'Add to repository (optional)',
      component: (
        <AddToRepository
          namespace={props.namespace}
          dropdownItems={RepoPermissionDropdownItems}
          repos={repos}
          selectedRepos={selectedRepos}
          setSelectedRepos={setSelectedRepos}
          selectedRepoPerms={selectedRepoPerms}
          setSelectedRepoPerms={setSelectedRepoPerms}
        />
      ),
    },
    {
      name: 'Default permissions (optional)',
      component: (
        <DefaultPermissions
          robotName={robotName}
          repoPermissions={RepoPermissionDropdownItems}
          robotDefaultPerm={robotDefaultPerm}
          setRobotdefaultPerm={setRobotdefaultPerm}
        />
      ),
    },
    {
      name: 'Review and Finish',
      component: (
        <ReviewAndFinish
          robotName={robotName}
          robotDescription={robotDescription}
          selectedTeams={selectedTeams}
          selectedRepos={filteredRepos()}
          robotdefaultPerm={robotDefaultPerm}
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
