import {
  ActionGroup,
  Button,
  Divider,
  DrawerActions,
  DrawerCloseButton,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  Form,
  FormGroup,
  Radio,
  Select,
  SelectGroup,
  SelectOption,
  Spinner,
} from '@patternfly/react-core';
import {DesktopIcon, UsersIcon} from '@patternfly/react-icons';
import {useState, Ref, useEffect} from 'react';
import EntitySearch from 'src/components/EntitySearch';
import {useCreateDefaultPermission} from 'src/hooks/UseDefaultPermissions';
import {useFetchRobotAccounts} from 'src/hooks/UseRobotAccounts';
import {useFetchTeams} from 'src/hooks/UseTeams';
import {Entity} from 'src/resources/UserResource';
import {DrawerContentType} from '../../../Organization';
import {CreateTeamWizard} from '../createTeamWizard/CreateTeamWizard';
import {repoPermissions} from '../DefaultPermissions';
import {CreateTeamModal} from './CreateTeamModal';
import React from 'react';

export default function CreatePermissionDrawer(
  props: CreatePermissionDrawerProps,
) {
  enum userType {
    ANYONE = 'Anyone',
    SPECIFIC_USER = 'Specific user',
  }

  const [createdBy, setCreatedBy] = useState(userType.SPECIFIC_USER);
  const [repositoryCreator, setRepositoryCreator] = useState<Entity>(null);
  const [appliedTo, setAppliedTo] = useState<Entity>(null);
  const [permission, setPermission] = useState<repoPermissions>(
    repoPermissions.WRITE,
  );
  const [permissionDropDown, setPermissionDropDown] = useState(false);
  const [error, setError] = useState<string>('');

  // Get robots
  const {robots} = useFetchRobotAccounts(props.orgName);
  // Get teams
  const {teams, loading} = useFetchTeams(props.orgName);

  const permissionRadioButtons = (
    <>
      <Radio
        isChecked={createdBy === userType.ANYONE}
        name={userType.ANYONE}
        onChange={() => setCreatedBy(userType.ANYONE)}
        label={userType.ANYONE}
        id={userType.ANYONE}
        value={userType.ANYONE}
      />
      <Radio
        isChecked={createdBy === userType.SPECIFIC_USER}
        name={userType.SPECIFIC_USER}
        onChange={() => setCreatedBy(userType.SPECIFIC_USER)}
        label={userType.SPECIFIC_USER}
        id={userType.SPECIFIC_USER}
        value={userType.SPECIFIC_USER}
      />
    </>
  );

  const handleCreateRobotAccount = () => {
    console.log('tba');
  };

  // TODO: https://www.patternfly.org/v4/components/select#view-more

  const creatorDefaultOptions = [
    <React.Fragment key="creator">
      <SelectGroup label="Robot accounts" key="robot-account-grp">
        {robots?.map((r) => (
          <SelectOption
            key={r.name}
            value={r.name}
            onClick={() => {
              setRepositoryCreator({
                is_robot: true,
                name: r.name,
                kind: 'user',
              });
            }}
          />
        ))}
        <Divider component="li" key={7} />

        <SelectOption
          key="create-robot-account"
          component="button"
          onClick={handleCreateRobotAccount}
          isPlaceholder
        >
          <DesktopIcon /> &nbsp; Create robot account
        </SelectOption>
      </SelectGroup>
    </React.Fragment>,
  ];

  const dropdownForCreator = (
    <EntitySearch
      org={props.orgName}
      onSelect={(e: Entity) => setRepositoryCreator(e)}
      onError={() => setError('Unable to look up users')}
      defaultOptions={creatorDefaultOptions}
      placeholderText="Search user/robot"
    />
  );

  const [isTeamModalOpen, setIsTeamModalOpen] = useState<boolean>(false);
  const [isTeamWizardOpen, setIsTeamWizardOpen] = useState<boolean>(false);

  const validateTeamName = (name: string) => {
    return /^[a-z][a-z0-9]+$/.test(name);
  };

  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  const createTeamModal = (
    <CreateTeamModal
      name={teamName}
      setName={setTeamName}
      description={teamDescription}
      setDescription={setTeamDescription}
      orgName={props.orgName}
      nameLabel="Provide a name for your new team:"
      descriptionLabel="Provide an optional description for your new team"
      helperText="Enter a description to provide extra information to your teammates about this team:"
      nameHelperText="Choose a name to inform your teammates about this team. Must match ^[a-z][a-z0-9]+$."
      isModalOpen={isTeamModalOpen}
      handleModalToggle={() => setIsTeamModalOpen(!isTeamModalOpen)}
      handleWizardToggle={() => setIsTeamWizardOpen(!isTeamWizardOpen)}
      validateName={validateTeamName}
    ></CreateTeamModal>
  );

  const createTeamWizard = (
    <CreateTeamWizard
      teamName={teamName}
      teamDescription={teamDescription}
      isTeamWizardOpen={isTeamWizardOpen}
      handleWizardToggle={() => setIsTeamWizardOpen(!isTeamWizardOpen)}
      orgName={props.orgName}
      setAppliedTo={setAppliedTo}
    ></CreateTeamWizard>
  );

  const appliedToDefaultOptions = [
    <React.Fragment key="appliedTo">
      <SelectGroup label="Teams" key="group3">
        {loading ? (
          <Spinner />
        ) : (
          teams?.map((t) => (
            <SelectOption
              key={t.name}
              value={t.name}
              onClick={() => {
                setAppliedTo({
                  is_robot: false,
                  name: t.name,
                  kind: 'team',
                });
              }}
            />
          ))
        )}
      </SelectGroup>
      <Divider component="li" key={4} />
      <SelectGroup label="Robot accounts" key="group4">
        {robots?.map((r) => {
          return (
            <SelectOption
              key={r.name}
              value={r.name}
              onClick={() => {
                console.log('child');
                setAppliedTo({
                  is_robot: true,
                  name: r.name,
                  kind: 'user',
                });
              }}
            />
          );
        })}
      </SelectGroup>
      <Divider component="li" key={5} />
      <SelectOption
        key="Create team1"
        component="button"
        onClick={() => setIsTeamModalOpen(!isTeamModalOpen)}
        isPlaceholder
        // value={teamName}
        value={{toString: () => appliedTo.name}}
      >
        <UsersIcon /> &nbsp; Create team
      </SelectOption>
      <SelectOption
        key="Create robot account2"
        component="button"
        onClick={handleCreateRobotAccount}
        isPlaceholder
        value="robo"
      >
        <DesktopIcon /> &nbsp; Create robot account
      </SelectOption>
    </React.Fragment>,
  ];

  const dropdownForAppliedTo = (
    <EntitySearch
      org={props.orgName}
      onSelect={(e) => {
        console.log('parent');
        setAppliedTo(e);
      }}
      // onSelect={setAppliedTo}
      onError={() => setError('Unable to look up teams')}
      defaultOptions={appliedToDefaultOptions}
      placeholderText="Search, invite or add robot/team"
    />
  );

  const optionsForPermission = Object.keys(repoPermissions).map((key) => (
    <DropdownItem
      key={repoPermissions[key]}
      value={repoPermissions[key]}
      onClick={() => {
        setPermission(repoPermissions[key]);
        setPermissionDropDown(!permissionDropDown);
      }}
    >
      {repoPermissions[key]}
    </DropdownItem>
  ));

  const dropdownForPermission = (
    <Dropdown
      toggle={
        <DropdownToggle
          id="toggle-id-6"
          onToggle={() => setPermissionDropDown(!permissionDropDown)}
        >
          {permission}
        </DropdownToggle>
      }
      isOpen={permissionDropDown}
      dropdownItems={optionsForPermission}
    />
  );
  const {createDefaultPermission} = useCreateDefaultPermission(props.orgName);

  const createDefaultPermissionHandler = async () => {
    if (createdBy === userType.SPECIFIC_USER) {
      await createDefaultPermission({
        repoCreator: repositoryCreator,
        appliedTo: appliedTo,
        newRole: permission.toLowerCase(),
      });
    } else if (createdBy === userType.ANYONE) {
      await createDefaultPermission({
        appliedTo: appliedTo,
        newRole: permission.toLowerCase(),
      });
    }
    setTeamName('');
    props.closeDrawer();
  };

  return (
    <>
      {isTeamModalOpen ? createTeamModal : null}
      {isTeamWizardOpen ? createTeamWizard : null}

      <DrawerPanelContent>
        <DrawerHead className="pf-c-title pf-m-xl">
          <h6
            tabIndex={props.drawerContent != DrawerContentType.None ? 0 : -1}
            ref={props.drawerRef}
          >
            Create default permission
          </h6>

          <DrawerActions>
            <DrawerCloseButton onClick={props.closeDrawer} />
          </DrawerActions>
        </DrawerHead>
        <DrawerPanelBody>
          <h3 className="pf-c-title pf-m-md">
            Applies when a repository is created by:
          </h3>
        </DrawerPanelBody>
        <DrawerPanelBody>
          <Form id="create-permission-form">
            <FormGroup fieldId="create-by-radio">
              {permissionRadioButtons}
            </FormGroup>
            {createdBy === userType.SPECIFIC_USER ? (
              <FormGroup
                fieldId="creator"
                label="Repository creator"
                isRequired
              >
                {dropdownForCreator}
              </FormGroup>
            ) : null}
            <FormGroup fieldId="applied-to" label="Applied to" isRequired>
              {dropdownForAppliedTo}
            </FormGroup>
            <FormGroup fieldId="permission" label="Permission" isRequired>
              {dropdownForPermission}
            </FormGroup>
            <ActionGroup>
              <Button
                isDisabled={
                  (repositoryCreator == null &&
                    createdBy === userType.SPECIFIC_USER) ||
                  appliedTo == null
                }
                onClick={() => {
                  createDefaultPermissionHandler();
                }}
                variant="primary"
              >
                Create default permission
              </Button>
            </ActionGroup>
          </Form>
        </DrawerPanelBody>
      </DrawerPanelContent>
    </>
  );
}

interface CreatePermissionDrawerProps {
  orgName: string;
  closeDrawer: () => void;
  drawerRef: Ref<HTMLDivElement>;
  drawerContent: DrawerContentType;
}
