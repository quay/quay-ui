import * as React from 'react';
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
import {useRecoilValue} from 'recoil';
import {AuthState} from 'src/atoms/AuthState';

export const CreateOrganizationModal = (
  props: CreateOrganizationModalProps,
): JSX.Element => {
  const {isModalOpen, handleModalToggle} = props;
  const quayAuth = useRecoilValue(AuthState);

  const [organizationName, setOrganizationName] = React.useState('');
  const [organizationEmail, setOrganizationEmail] = React.useState('');
  const [repoCount, setRepoCount] = React.useState(0);
  const [repoCost, setRepoCost] = React.useState(0);

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
      PRICE: '$0',
    },
    {
      PLAN: 'Micro',
      'PRIVATE REPOSITORIES': 10,
      PRICE: '$30',
    },
    {
      PLAN: 'Small',
      'PRIVATE REPOSITORIES': 20,
      PRICE: '$50',
    },
    {
      PLAN: 'Medium',
      'PRIVATE REPOSITORIES': 5,
      PRICE: '$100',
    },
    {
      PLAN: 'Large',
      'PRIVATE REPOSITORIES': 5,
      PRICE: '$0',
    },
    {
      PLAN: 'Extra Large',
      'PRIVATE REPOSITORIES': 5,
      PRICE: '$0',
    },
    {
      PLAN: 'XXL',
      'PRIVATE REPOSITORIES': 5,
      PRICE: '$0',
    },
    {
      PLAN: 'XXXL',
      'PRIVATE REPOSITORIES': 5,
      PRICE: '$0',
    },
    {
      PLAN: 'XXXXL',
      'PRIVATE REPOSITORIES': 5,
      PRICE: '$0',
    },
  ];

  const orgPlansPopOver = () => {
    return (
      <TableComposable
        aria-label="Simple table"
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
    // handleModalToggle(); // check if this is needed
    await fetch(`${quayAuth.QUAY_HOSTNAME}/api/v1/organization/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${quayAuth.QUAY_OAUTH_TOKEN}`,
      },
      body: JSON.stringify({name: organizationName, email: organizationEmail}),
    }).then;
  };

  return (
    <Modal
      title="Create Organization"
      variant={ModalVariant.medium}
      isOpen={isModalOpen}
      onClose={handleModalToggle}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          onClick={createOrganizationHandler}
          form="modal-with-form-form"
        >
          Create Organization
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
          // className='text-input-width'
        >
          <TextInput
            isRequired
            type="text"
            id="modal-with-form-form-name"
            value={organizationName}
            onChange={handleNameInputChange}
            // ref={nameInputRef}
          />
        </FormGroup>
        <FormGroup
          label="Organization Email"
          isRequired
          fieldId="modal-with-form-form-email"
          helperText="This address must be different from your account's email"
          // className='text-input-width'
        >
          <TextInput
            isRequired
            type="email"
            id="modal-with-form-form-name"
            name="modal-with-form-form-name"
            value={organizationEmail}
            onChange={handleEmailInputChange}
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
            aria-label="Basic popover"
            headerContent={<div>Organization Plans</div>}
            bodyContent={orgPlansPopOver}
          >
            <i className="fas fa-info-circle"></i>
          </Popover>
        </Text>
        <Slider
          className={'create-org-modal-slider'}
          value={repoCount}
          customSteps={reposWithCost}
          max={reposWithCost.length - 1}
          onChange={handleRepoCountChange}
        />
      </FormGroup>
    </Modal>
  );
};

type CreateOrganizationModalProps = {
  isModalOpen: boolean;
  handleModalToggle?: () => void;
};
