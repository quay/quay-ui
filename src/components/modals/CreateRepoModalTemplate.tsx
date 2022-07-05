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
import {useRecoilValue} from 'recoil';
import {UserOrgs, UserState} from 'src/atoms/UserState';
import {
  createNewRepository,
  RepositoryCreationResponse,
} from 'src/resources/RepositoryResource';
import {useRef, useState} from 'react';
import {AxiosResponse} from 'axios';
import {RepositoryListProps} from 'src/routes/RepositoriesList/RepositoriesList';

enum visibilityType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export const CreateRepositoryModalTemplate = (
  props: CreateRepositoryModalTemplateProps,
): JSX.Element => {
  const {isModalOpen, handleModalToggle, orgNameProp, updateListHandler} =
    props;

  const userOrgs = useRecoilValue(UserOrgs);

  const [newRepository, setNewRepository] = useState({
    name: '',
    description: '',
  });

  const [currentOrganization, setCurrentOrganization] = useState({
    name: orgNameProp !== null ? orgNameProp : null,
    isDropdownOpen: false,
  });

  const [repoVisibility, setrepoVisibility] = useState(visibilityType.PUBLIC);

  const nameInputRef = useRef();

  const handleNameInputChange = (value) => {
    setNewRepository({...newRepository, name: value});
  };

  const handleRepoDescriptionChange = (value) => {
    setNewRepository({...newRepository, description: value});
  };

  // TODO (harish): Show user and list of orgs in the Namespace dropdown
  // see PROJQUAY-3900 comment for details

  const createRepositoryHandler = async () => {
    handleModalToggle();
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
      updateListHandler({
        name: repoCreationResponse.data.name,
        namespace: repoCreationResponse.data.namespace,
        path:
          repoCreationResponse.data.namespace +
          '/' +
          repoCreationResponse.data.name,
        isPublic: visibility,
        tags: 1,
        size: '1.1GB',
        pulls: 108,
        lastPull: 'TBA',
        lastModified: 'TBA',
      });
    }
  };

  const handleNamespaceSelection = (e, value) => {
    setCurrentOrganization((prevState) => ({
      name: value,
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  const planUpgradeAlert = () => (
    <Alert variant="warning" title="Plan upgrade needed" isInline>
      <p>
        In order to make this repository private under TBD, you will need to
        upgrade the namespace&apos;s plan.
        <br />
        <a href="#">Upgrade TBD plan</a>
      </p>
    </Alert>
  );

  return (
    <Modal
      title="Create repository"
      variant={ModalVariant.large}
      isOpen={isModalOpen}
      onClose={handleModalToggle}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          onClick={createRepositoryHandler}
          form="modal-with-form-form"
        >
          Create
        </Button>,
        <Button key="cancel" variant="link" onClick={handleModalToggle}>
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
              isDisabled={orgNameProp !== null}
              selections={currentOrganization.name}
            >
              {userOrgs.map((orgs, idx) => (
                <SelectOption key={idx} value={orgs.name}></SelectOption>
              ))}
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
          {repoVisibility === visibilityType.PRIVATE
            ? planUpgradeAlert()
            : null}
        </FormGroup>
      </Form>
    </Modal>
  );
};

type CreateRepositoryModalTemplateProps = {
  isModalOpen: boolean;
  handleModalToggle?: () => void;
  orgNameProp?: string;
  updateListHandler: (value: RepositoryListProps) => void;
};
