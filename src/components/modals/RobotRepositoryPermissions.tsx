import {FormGroup, TextInput} from '@patternfly/react-core';
import React, {useState} from 'react';
import AddToRepository from './robotAccountWizard/AddToRepository';
import {IRepository} from 'src/resources/RepositoryResource';
import {IRobot} from 'src/resources/RobotsResource';
import {useRobotPermissions} from 'src/hooks/useRobotPermissions';
import {addDisplayError} from 'src/resources/ErrorHandling';
import {useRepositories} from 'src/hooks/UseRepositories';

export default function RobotRepositoryPermissions(
  props: RobotRepositoryPermissionsProps,
) {
  // Fetching repos
  const {repos: repos, totalResults: repoCount} = useRepositories(
    props.namespace,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string[]>();

  const {robotPermissions, page, perPage, setPage, setPerPage} =
    useRobotPermissions({
      orgName: props.namespace,
      robName: props.robotAccount.name,
      onSuccess: () => {
        setLoading(false);
      },
      onError: (err) => {
        setErr([addDisplayError('Unable to fetch robot accounts', err)]);
        setLoading(false);
      },
    });

  return (
    <>
      <FormGroup
        label="Provide a name for your robot account:"
        fieldId="robot-name"
        isRequired
        disabled
      >
        <TextInput
          value={props.robotAccount.name}
          type="text"
          aria-label="robot-name-value"
          isDisabled
          className="fit-content"
        />
      </FormGroup>
      <br />
      <FormGroup
        label="Description"
        fieldId="robot-description"
        disabled
        className="fit-content"
      >
        <TextInput
          value={props.robotAccount.description}
          type="text"
          aria-label="robot-description"
          isDisabled
        />
      </FormGroup>
      <br />
      <AddToRepository
        namespace={props.namespace}
        dropdownItems={props.RepoPermissionDropdownItems}
        repos={repos}
        selectedRepos={props.selectedRepos}
        setSelectedRepos={props.setSelectedRepos}
        selectedRepoPerms={props.selectedRepoPerms}
        setSelectedRepoPerms={props.setSelectedRepoPerms}
        robotPermissions={robotPermissions}
        wizardStep={false}
        robotName={props.robotAccount.name}
        fetchingRobotPerms={loading}
      />
    </>
  );
}

interface RobotRepositoryPermissionsProps {
  robotAccount: IRobot;
  namespace: string;
  RepoPermissionDropdownItems: any[];
  repos: IRepository[];
  selectedRepos: any[];
  setSelectedRepos: (repos) => void;
  selectedRepoPerms: any[];
  setSelectedRepoPerms: (repoPerm) => void;
}
