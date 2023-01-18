import {
  ActionGroup,
  Button,
  DrawerActions,
  DrawerCloseButton,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownSeparator,
  DropdownToggle,
  Form,
  FormGroup,
  Radio,
  Select,
  SelectGroup,
  SelectOption,
  SelectVariant,
} from '@patternfly/react-core';
import {DesktopIcon, UsersIcon} from '@patternfly/react-icons';
import {useQuery} from '@tanstack/react-query';
import {useState, Ref, useEffect} from 'react';
import {useEntities} from 'src/hooks/UseEntities';
import {fetchRobotsForDefaultPermissionDropdown} from 'src/resources/DefaultPermissionResource';
import {fetchRobotsForNamespace} from 'src/resources/RobotsResource';
import {DrawerContentType} from '../../Organization';
import {repoPermissions} from './DefaultPermissions';

export default function CreatePermissionDrawer(
  props: CreatePermissionDrawerProps,
) {
  enum userType {
    ANYONE = 'Anyone',
    SPECIFIC_USER = 'Specific user',
  }

  const {
    entities,
    isError: errorFetchingEntities,
    searchTerm,
    setSearchTerm,
    setEntities,
  } = useEntities(props.orgName);

  const [robotAccnt, setRobotAccnt] = useState<string[]>([]);

  const [createdBy, setCreatedBy] = useState(userType.SPECIFIC_USER);
  const [repositoryCreator, setRepositoryCreator] = useState({
    creator: '',
    isDropdownOpen: false,
  });

  const [appliedTo, setAppliedTo] = useState({
    group: '',
    isDropdownOpen: false,
  });

  const [permission, setPermission] = useState({
    permType: repoPermissions.WRITE,
    isDropdownOpen: false,
  });

  const handleSpecificUserSelection = () => {
    setCreatedBy(userType.SPECIFIC_USER);
  };

  const handleAnyUserSelection = () => {
    setCreatedBy(userType.ANYONE);
  };

  useEffect(() => {
    // const {data} = useQuery(['robotAccnt', props.orgName], ({signal}) =>
    //   fetchRobotsForNamespace(props.orgName, false, signal),
    // );

    const fetchData = async () => {
      await fetchRobotsForNamespace(props.orgName, false).then((response) => {
        console.log('response', response);
        setRobotAccnt((prev) => [...prev, response.name]);
      });

      // if (data) {
      //   data.then (robot =>           setRobotAccnt((prev) => [...prev, robot.name]))
      // }
    };
    if (!searchTerm && repositoryCreator.isDropdownOpen) {
      fetchData();
    }
  }, [searchTerm]);

  const permissionRadioButtons = (
    <>
      <Radio
        isChecked={createdBy === userType.ANYONE}
        name={userType.ANYONE}
        onChange={handleAnyUserSelection}
        label={userType.ANYONE}
        id={userType.ANYONE}
        value={userType.ANYONE}
      />
      <Radio
        isChecked={createdBy === userType.SPECIFIC_USER}
        name={userType.SPECIFIC_USER}
        onChange={handleSpecificUserSelection}
        label={userType.SPECIFIC_USER}
        id={userType.SPECIFIC_USER}
        value={userType.SPECIFIC_USER}
      />
    </>
  );

  const handleCreateRobotAccount = () => {
    console.log('tba');
  };

  // https://www.patternfly.org/v4/components/select#view-more
  const optionsForCreator = [
    <DropdownGroup label="Robot accounts" key="creator">
      <DropdownItem key="creator1">Robo 1</DropdownItem>
      <DropdownItem key="creator2">Robo 2</DropdownItem>
    </DropdownGroup>,
    <DropdownSeparator key="separator1" />,
    <DropdownItem
      key="group 2 action"
      component="button"
      icon={<DesktopIcon />}
      autoFocus
      onClick={handleCreateRobotAccount}
    >
      Create robot account
    </DropdownItem>,
  ];

  const optionsForAppliedTo = [
    <DropdownGroup label="Teams" key="appliedTo">
      <DropdownItem key="appliedTo1">Team 1</DropdownItem>
      <DropdownItem key="appliedTo2">Team 2</DropdownItem>
    </DropdownGroup>,
    <DropdownSeparator key="separator2" />,
    <DropdownGroup label="Robot accounts" key="RobotAccounts">
      <DropdownItem key="RobotAccounts1">Robo 1</DropdownItem>
      <DropdownItem key="RobotAccounts2">Robo 2</DropdownItem>
    </DropdownGroup>,
    <DropdownSeparator key="separator3" />,
    <DropdownGroup key="usersIcon">
      <DropdownItem
        key="group 2 action"
        component="button"
        icon={<UsersIcon />}
        autoFocus
      >
        Create team
      </DropdownItem>
      <DropdownItem
        key="desktopIcon"
        component="button"
        icon={<DesktopIcon />}
        autoFocus
      >
        Create robot account
      </DropdownItem>
    </DropdownGroup>,
  ];

  const optionsForPermission = Object.keys(repoPermissions).map((key) => (
    <DropdownItem
      key={repoPermissions[key]}
      onClick={() =>
        setDefaultPermission({
          id: permission.id,
          newRole: repoPermissions[key],
        })
      }
    >
      {repoPermissions[key]}
    </DropdownItem>
  ));

  const handleRepoCreatorDropdown = () => {
    // const robotAccnts = await fetchRobotsForDefaultPermissionDropdown(
    //   props.orgName,
    // );

    // console.log('entities before', entities);
    // if (robotAccnts.length > 0 && searchTerm === null) {
    //   for (const item of robotAccnts) {
    //     setEntities((prev) => [
    //       ...prev,
    //       {
    //         name: item.name,
    //         is_robot: true,
    //       },
    //     ]);
    //   }
    // }
    // console.log('entities after', entities);
    setRepositoryCreator((prev) => ({
      ...prev,
      isDropdownOpen: !prev.isDropdownOpen,
    }));
  };

  const createRobotAccntModalDropDownItem = [
    <DropdownSeparator key="separator1" />,
  ];

  const dropdownForCreator = (
    <Select
      isOpen={repositoryCreator.isDropdownOpen}
      // selections={searchTerm}
      onSelect={(e, value) => {
        setSearchTerm(value as string);
        console.log('selected:', value);
        // setRepositoryCreator((prev) => ({
        //   creator: value as string,
        //   isDropdownOpen: !prev.isDropdownOpen,
        // }));
      }}
      onToggle={() => {
        console.log('toggled');
        setRepositoryCreator((prev) => ({
          ...prev,
          isDropdownOpen: !prev.isDropdownOpen,
        }));
      }}
      variant={SelectVariant.typeahead}
      typeAheadAriaLabel="Search user/robot"
      onTypeaheadInputChanged={(value) => {
        setSearchTerm(value);
        // handleRepoCreatorDropdown();
      }}
      // shouldResetOnSelect={true}
      onClear={() => {
        setSearchTerm('');
      }}
      isGrouped
    >
      <SelectGroup key="group1">
        {entities
          // .filter((entitity) => entitity?.is_robot)
          .map((e) => (
            <SelectOption key={e.name} value={e.name} />
          ))}
      </SelectGroup>
      {!searchTerm && repositoryCreator.isDropdownOpen && (
        <SelectGroup label="Robot accounts" key="group2">
          {robotAccnt?.map((e) => (
            <SelectOption key={e} value={e} />
          ))}
          <SelectOption
            key="Create robot account"
            value="Create robot account"
            component="button"
            onClick={handleCreateRobotAccount}
            isFocused={true}
          >
            <DesktopIcon /> &nbsp; Create robot account
          </SelectOption>
        </SelectGroup>
      )}
    </Select>
  );

  {
    /* <Dropdown
      onSelect={handleRepoCreatorDropdown}
      toggle={
        <DropdownToggle onToggle={handleRepoCreatorDropdown} id="toggle-id-6">
          Search user/robot
        </DropdownToggle>
      }
      isOpen={repositoryCreator.isDropdownOpen}
      dropdownItems={optionsForCreator}
    /> */
  }

  const handleAppliedToDropdown = () => {
    setAppliedTo((prev) => ({
      ...prev,
      isDropdownOpen: !prev.isDropdownOpen,
    }));
  };

  const dropdownForAppliedTo = (
    <Dropdown
      onSelect={handleAppliedToDropdown}
      toggle={
        <DropdownToggle onToggle={handleAppliedToDropdown} id="toggle-id-6">
          Search robot account/team
        </DropdownToggle>
      }
      isOpen={appliedTo.isDropdownOpen}
      dropdownItems={optionsForAppliedTo}
    />
  );

  const handlePermissionDropdown = () => {
    setPermission((prev) => ({
      ...prev,
      isDropdownOpen: !prev.isDropdownOpen,
    }));
  };

  const dropdownForPermission = (
    <Dropdown
      onSelect={handlePermissionDropdown}
      toggle={
        <DropdownToggle onToggle={handlePermissionDropdown} id="toggle-id-6">
          Write
        </DropdownToggle>
      }
      isOpen={permission.isDropdownOpen}
      dropdownItems={optionsForPermission}
    />
  );

  const createDefaultPermission = () => {
    console.log('tba');
  };

  return (
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
            <FormGroup fieldId="creator" label="Repository creator" isRequired>
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
              isDisabled={false}
              onClick={() => {
                createDefaultPermission();
              }}
              variant="primary"
            >
              Create default permission
            </Button>
          </ActionGroup>
        </Form>
      </DrawerPanelBody>
    </DrawerPanelContent>
  );
}

interface CreatePermissionDrawerProps {
  // isExpanded?: boolean;
  // setIsExpanded: (value: boolean) => void;
  orgName: string;
  closeDrawer: () => void;
  drawerRef: Ref<HTMLDivElement>;
  drawerContent: DrawerContentType;
}
