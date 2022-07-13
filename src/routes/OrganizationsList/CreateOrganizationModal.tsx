import {
  Modal,
  ModalVariant,
  Button,
  Form,
  FormGroup,
  Text,
  TextInput,
  TextVariants,
  Slider,
  Popover,
} from '@patternfly/react-core';
import './css/Organizations.scss';
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import {createOrg} from 'src/resources/OrganisationResource';
import {useRecoilState} from 'recoil';
import {UserState} from 'src/atoms/UserState';
import {getUser} from 'src/resources/UserResource';
import {isValidEmail} from 'src/libs/utils';
import {useState} from 'react';

export const CreateOrganizationModal = (
  props: CreateOrganizationModalProps,
): JSX.Element => {
  const [organizationName, setOrganizationName] = useState('');
  const [organizationEmail, setOrganizationEmail] = useState('');
  const [repoCount, setRepoCount] = useState(0);
  const [repoCost, setRepoCost] = useState(0);
  const [, setUserState] = useRecoilState(UserState);
  const [invalidEmailFlag, setInvalidEmailFlag] = useState(false);

  const reposWithCost = [
    {value: 0, label: '0', cost: 0},
    {value: 1, label: '10', cost: 30},
    {value: 2, label: '20', cost: 60},
    {value: 3, label: '50', cost: 125},
    {value: 4, label: '125', cost: 250},
    {value: 5, label: '250', cost: 450},
    {value: 6, label: '500', cost: 850},
    {value: 7, label: '1000', cost: 1600},
    {value: 8, label: '2000', cost: 2100},
  ];

  const handleNameInputChange = (value: any) => {
    setOrganizationName(value);
  };

  const handleEmailInputChange = (value: any) => {
    setOrganizationEmail(value);
  };

  const handleRepoCountChange = (value: number) => {
    setRepoCount(parseInt(reposWithCost[value].label));
    setRepoCost(reposWithCost[value].cost);
  };

  const orgPricing = [
    {
      PLAN: 'Open Source',
      'PRIVATE REPOSITORIES': 5,
      PRICE: '$15',
    },
    {
      PLAN: 'Micro',
      'PRIVATE REPOSITORIES': 10,
      PRICE: '$30',
    },
    {
      PLAN: 'Small',
      'PRIVATE REPOSITORIES': 20,
      PRICE: '$60',
    },
    {
      PLAN: 'Medium',
      'PRIVATE REPOSITORIES': 50,
      PRICE: '$125',
    },
    {
      PLAN: 'Large',
      'PRIVATE REPOSITORIES': 125,
      PRICE: '$250',
    },
    {
      PLAN: 'Extra Large',
      'PRIVATE REPOSITORIES': 250,
      PRICE: '$450',
    },
    {
      PLAN: 'XXL',
      'PRIVATE REPOSITORIES': 500,
      PRICE: '$850',
    },
    {
      PLAN: 'XXXL',
      'PRIVATE REPOSITORIES': 1000,
      PRICE: '$1600',
    },
    {
      PLAN: 'XXXXL',
      'PRIVATE REPOSITORIES': 2000,
      PRICE: '$3100',
    },
    {
      PLAN: 'XXXXXL',
      'PRIVATE REPOSITORIES': 15000,
      PRICE: '$217000',
    },
  ];

  const orgPlansPopOver = () => {
    return (
      <TableComposable
        aria-label="Org plans table"
        variant={'compact'}
        borders={false}
      >
        <Thead>
          <Tr>
            <Th>PLAN</Th>
            <Th>PRIVATE REPOSITORIES</Th>
            <Th>PRICE</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orgPricing.map((org) => (
            <Tr key={org.PLAN}>
              <Td>{org.PLAN}</Td>
              <Td>{org['PRIVATE REPOSITORIES']}</Td>
              <Td>{org.PRICE}</Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    );
  };

  const createOrganizationHandler = async () => {
    const response = await createOrg(organizationName, organizationEmail);
    props.handleModalToggle();
    if (response === 'Created') {
      const user = await getUser();
      setUserState(user);
    }
  };

  const onInputBlur = () => {
    if (organizationEmail.length !== 0) {
      isValidEmail(organizationEmail)
        ? setInvalidEmailFlag(false)
        : setInvalidEmailFlag(true);
    } else {
      return;
    }
  };

  return (
    <Modal
      title="Create Organization"
      variant={ModalVariant.large}
      isOpen={props.isModalOpen}
      onClose={props.handleModalToggle}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          onClick={createOrganizationHandler}
          form="modal-with-form-form"
          isDisabled={invalidEmailFlag || !organizationName}
        >
          Create
        </Button>,
        <Button key="cancel" variant="link" onClick={props.handleModalToggle}>
          Cancel
        </Button>,
      ]}
    >
      <Form id="modal-with-form-form" isWidthLimited>
        <FormGroup
          isInline
          label="Organization Name"
          isRequired
          fieldId="modal-with-form-form-name"
          helperText="This will also be the namespace for your repositories. Must be alphanumeric, all lowercase, at least 2 characters long and at most 255 characters long"
        >
          <TextInput
            isRequired
            type="text"
            id="modal-with-form-form-name"
            value={organizationName}
            onChange={handleNameInputChange}
          />
        </FormGroup>
        <FormGroup
          label="Organization Email"
          fieldId="modal-with-form-form-email"
          helperText="This address must be different from your account's email"
          helperTextInvalid={'Enter a valid email: email@provider.com'}
          validated={invalidEmailFlag ? 'error' : 'default'}
        >
          <TextInput
            type="email"
            id="modal-with-form-form-name"
            name="modal-with-form-form-name"
            value={organizationEmail}
            onChange={handleEmailInputChange}
            validated={invalidEmailFlag ? 'error' : 'default'}
            onBlur={onInputBlur}
          />
        </FormGroup>
        <br />
      </Form>
      <FormGroup
        label={`Choose your organization's plan: $${repoCost}`}
        isRequired
        fieldId="modal-with-form-form-email"
      >
        <Text component={TextVariants.small}>
          {' '}
          Number of private repositories{' '}
          <Popover
            aria-label="Org plans popover"
            headerContent={<div>Organization Plans</div>}
            bodyContent={orgPlansPopOver}
          >
            <i className="fas fa-question-circle"></i>
          </Popover>
        </Text>
        <Slider
          className={'create-org-modal-slider'}
          value={repoCount}
          customSteps={reposWithCost}
          max={reposWithCost.length - 1}
          onChange={handleRepoCountChange}
          min={0}
        />
      </FormGroup>
    </Modal>
  );
};

type CreateOrganizationModalProps = {
  isModalOpen: boolean;
  handleModalToggle?: () => void;
};
