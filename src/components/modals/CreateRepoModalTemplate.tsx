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
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import {useRecoilValue} from 'recoil';
import {UserOrgs} from 'src/atoms/UserState';
import {
  createNewRepository,
  IRepository,
} from 'src/resources/RepositoryResource';
import {useRef, useState} from 'react';
import ErrorBoundary from 'src/components/errors/ErrorBoundary';
import FormError from '../errors/FormError';
import {useRefreshUser} from 'src/hooks/UseRefreshUser';
import {ExclamationCircleIcon} from '@patternfly/react-icons';
import {addDisplayError} from 'src/resources/ErrorHandling';

enum visibilityType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

// Attempt to render modal content, fallback to error
// display if failure
export default function CreateRepositoryModalTemplate(
  props: CreateRepositoryModalTemplateProps,
) {
  return (
    <ErrorBoundary fallback={ErrorModal}>
      <CreateRepositoryModal {...props} />
    </ErrorBoundary>
  );
}

function ErrorModal(props: ErrorModalProps) {
  return (
    <Modal
      title="Loading Failure"
      variant={ModalVariant.large}
      isOpen={props.isOpen}
      onClose={props.toggle}
      actions={[
        <Button key="cancel" variant="link" onClick={props.toggle}>
          Cancel
        </Button>,
      ]}
    >
      <div>
        Error loading create repository form. Please close and try again.
      </div>
    </Modal>
  );
}

function CreateRepositoryModal(props: CreateRepositoryModalTemplateProps) {
  if (!props.isModalOpen) {
    return null;
  }
  const userOrgs = useRecoilValue(UserOrgs);
  const [err, setErr] = useState<string>();
  const refreshUser = useRefreshUser();

  const [currentOrganization, setCurrentOrganization] = useState({
    // For org scoped view, the name is set current org and for Repository list view,
    // the name is set to 1st value from the Namespace dropdown
    name: props.orgName !== null ? props.orgName : null,
    isDropdownOpen: false,
  });

  const [validationState, setValidationState] = useState({
    repoName: true,
    namespace: true,
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

  const validateInput = () => {
    const validNamespace = !!currentOrganization.name;
    const validRepo = !!newRepository.name;
    setValidationState({repoName: validRepo, namespace: validNamespace});
    return validNamespace && validRepo;
  };

  const createRepositoryHandler = async () => {
    if (!validateInput()) {
      return;
    }
    try {
      await createNewRepository(
        currentOrganization.name,
        newRepository.name,
        repoVisibility.toLowerCase(),
        newRepository.description,
        'image',
      );
      refreshUser();
      props.handleModalToggle();
    } catch (error: any) {
      console.error(error);
      setErr(addDisplayError('Unable to create repository', error));
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
      <FormError message={err} setErr={setErr} />
      <Form id="modal-with-form-form" maxWidth="750px">
        <Flex>
          <FlexItem>
            <FormGroup
              isInline
              label="Namespace"
              fieldId="modal-with-form-form-name"
              isRequired
              helperTextInvalid="Select a namespace"
              helperTextInvalidIcon={<ExclamationCircleIcon />}
              validated={validationState.namespace ? 'success' : 'error'}
            >
              <Flex>
                <FlexItem>
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
                    {userOrgs.map((orgs, idx) => (
                      <SelectOption key={idx} value={orgs.name}></SelectOption>
                    ))}
                  </Select>
                </FlexItem>
                <FlexItem> / </FlexItem>
              </Flex>
            </FormGroup>
          </FlexItem>
          <FlexItem>
            <FormGroup
              label="Repository name"
              isRequired
              fieldId="modal-with-form-form-name"
              helperTextInvalid="Enter a repository name"
              helperTextInvalidIcon={<ExclamationCircleIcon />}
              validated={validationState.repoName ? 'success' : 'error'}
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
          </FlexItem>
        </Flex>
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
}

interface CreateRepositoryModalTemplateProps {
  isModalOpen: boolean;
  handleModalToggle?: () => void;
  orgName?: string;
  updateListHandler: (value: IRepository) => void;
}

interface ErrorModalProps {
  isOpen: boolean;
  toggle?: () => void;
}
