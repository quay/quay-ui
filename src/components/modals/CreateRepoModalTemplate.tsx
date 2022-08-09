import {
  Modal,
  ModalVariant,
  Button,
  Form,
  FormGroup,
  TextInput,
  Radio,
  SelectVariant,
  Select,
  SelectOption,
  Grid,
  Alert,
  Divider,
} from '@patternfly/react-core';
import {useRecoilState, useRecoilValue} from 'recoil';
import {UserOrgs, UserState} from 'src/atoms/UserState';
import {
  createNewRepository,
  IRepository,
  RepositoryCreationResponse,
} from 'src/resources/RepositoryResource';
import {useRef, useState} from 'react';
import {AxiosResponse} from 'axios';
import {getUser} from 'src/resources/UserResource';

enum visibilityType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export const CreateRepositoryModalTemplate = (
  props: CreateRepositoryModalTemplateProps,
): JSX.Element => {
  const userOrgs = useRecoilValue(UserOrgs);
  const [userState, setUserState] = useRecoilState(UserState);

  const [currentOrganization, setCurrentOrganization] = useState({
    // For org scoped view, the name is set current org and for Repository list view,
    // the name is set to 1st value from the Namespace dropdown
    name: props.orgName !== null ? props.orgName : null,
    isDropdownOpen: false,
  });

  const [newRepository, setNewRepository] = useState({
    name: '',
    description: '',
  });

  const [repoVisibility, setrepoVisibility] = useState(visibilityType.PUBLIC);

  const nameInputRef = useRef();

  const handleNameInputChange = (value) => {
    setNewRepository({...newRepository, name: value});
  };

  const handleRepoDescriptionChange = (value) => {
    setNewRepository({...newRepository, description: value});
  };

  const orgSelectionList = (
    <>
      {userOrgs.map((orgs, idx) => (
        <SelectOption key={idx} value={orgs.name}></SelectOption>
      ))}
      ;
    </>
  );

  const createRepositoryHandler = async () => {
    props.handleModalToggle();
    let visibility;
    repoVisibility === visibilityType.PUBLIC
      ? (visibility = 'public')
      : (visibility = 'private');

    const repoCreationResponse: AxiosResponse<RepositoryCreationResponse> =
      await createNewRepository(
        currentOrganization.name,
        newRepository.name,
        visibility,
        newRepository.description,
        'image',
      );
    // update the repository list once the creation is succesful
    if (repoCreationResponse.status === 201) {
      const user = await getUser();
      setUserState(user);
    }
  };

  const handleNamespaceSelection = (e, value) => {
    setCurrentOrganization((prevState) => ({
      name: value,
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  return (
    <Modal
      title="Create repository"
      variant={ModalVariant.large}
      isOpen={props.isModalOpen}
      onClose={props.handleModalToggle}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          onClick={createRepositoryHandler}
          form="modal-with-form-form"
        >
          Create
        </Button>,
        <Button key="cancel" variant="link" onClick={props.handleModalToggle}>
          Cancel
        </Button>,
      ]}
    >
      <Form id="modal-with-form-form" maxWidth="750px">
        <Grid hasGutter md={4}>
          <FormGroup
            isInline
            label="Namespace"
            fieldId="modal-with-form-form-name"
          >
            <Select
              variant={SelectVariant.single}
              aria-label="Select Input"
              onToggle={() =>
                setCurrentOrganization((prevState) => ({
                  ...prevState,
                  isDropdownOpen: !prevState.isDropdownOpen,
                }))
              }
              onSelect={handleNamespaceSelection}
              isOpen={currentOrganization.isDropdownOpen}
              width="200px"
              isDisabled={props.orgName !== null}
              placeholderText={'Select namespace'}
              selections={currentOrganization.name}
            >
              <SelectOption
                key={userState.username}
                value={userState.username}
              ></SelectOption>
              <Divider component="li" key={'org-username-divider'} />
              {orgSelectionList}
            </Select>
          </FormGroup>
          <FormGroup
            label="Repository name"
            isRequired
            fieldId="modal-with-form-form-name"
            isStack
          >
            <TextInput
              isRequired
              type="text"
              id="modal-with-form-form-name"
              value={newRepository.name}
              onChange={handleNameInputChange}
              ref={nameInputRef}
            />
          </FormGroup>
        </Grid>
        <FormGroup
          label="Repository description"
          fieldId="modal-with-form-form-email"
        >
          <TextInput
            type="text"
            id="modal-with-form-form-name"
            name="modal-with-form-form-name"
            value={newRepository.description}
            onChange={handleRepoDescriptionChange}
            ref={nameInputRef}
          />
        </FormGroup>
        <FormGroup
          label="Repository visibility"
          fieldId="modal-with-form-form-email"
        >
          <Radio
            isChecked={repoVisibility === visibilityType.PUBLIC}
            name="Public"
            onChange={() => setrepoVisibility(visibilityType.PUBLIC)}
            label="Public"
            id={visibilityType.PUBLIC}
            value={visibilityType.PUBLIC}
            description="Anyone can see and pull from this repository. You choose who can push."
          />
          <br />
          <Radio
            isChecked={repoVisibility === visibilityType.PRIVATE}
            name="Private"
            onChange={() => setrepoVisibility(visibilityType.PRIVATE)}
            label="Private"
            id={visibilityType.PRIVATE}
            value={visibilityType.PRIVATE}
            description="You choose who can see,pull and push from/to this repository."
          />
        </FormGroup>
      </Form>
    </Modal>
  );
};

type CreateRepositoryModalTemplateProps = {
  isModalOpen: boolean;
  handleModalToggle?: () => void;
  orgName?: string;
  updateListHandler: (value: IRepository) => void;
};
