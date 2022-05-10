import * as React from "react";
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
} from "@patternfly/react-core";
import "./css/Namespaces.scss";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/AuthState";

export const CreateNamespaceModal = (
  props: CreateNamespaceModalProps
): JSX.Element => {
  const { isModalOpen, handleModalToggle } = props;
  const quayAuth = useRecoilValue(authState);

  const [namespaceName, setNamespaceName] = React.useState("");
  const [namespaceEmail, setNamespaceEmail] = React.useState("");
  const [repoCount, setRepoCount] = React.useState(250);

  const reposWithCost = [
    { value: 0, label: "0" },
    { value: 30, label: "10" },
    { value: 60, label: "20" },
    { value: 125, label: "50" },
    { value: 250, label: "125" },
    { value: 450, label: "250" },
    { value: 850, label: "500" },
    { value: 1600, label: "1000" },
    { value: 2100, label: "2000" },
  ];

  const handleNameInputChange = (value: any) => {
    setNamespaceName(value);
  };

  const handleEmailInputChange = (value: any) => {
    setNamespaceEmail(value);
  };

  const handleRepoCountChange = (value: any) => {
    setRepoCount(value);
  };

  const orgPricing = [
    {
      PLAN: "Open Source",
      "PRIVATE REPOSITORIES": 5,
      PRICE: "$0",
    },
    {
      PLAN: "Micro",
      "PRIVATE REPOSITORIES": 10,
      PRICE: "$30",
    },
    {
      PLAN: "Small",
      "PRIVATE REPOSITORIES": 20,
      PRICE: "$50",
    },
    {
      PLAN: "Medium",
      "PRIVATE REPOSITORIES": 5,
      PRICE: "$100",
    },
    {
      PLAN: "Large",
      "PRIVATE REPOSITORIES": 5,
      PRICE: "$0",
    },
    {
      PLAN: "Extra Large",
      "PRIVATE REPOSITORIES": 5,
      PRICE: "$0",
    },
    {
      PLAN: "XXL",
      "PRIVATE REPOSITORIES": 5,
      PRICE: "$0",
    },
    {
      PLAN: "XXXL",
      "PRIVATE REPOSITORIES": 5,
      PRICE: "$0",
    },
    {
      PLAN: "XXXXL",
      "PRIVATE REPOSITORIES": 5,
      PRICE: "$0",
    },
  ];

  const orgPlansPopOver = () => {
    return (
      <TableComposable
        aria-label="Simple table"
        variant={"compact"}
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
              <Td>{org["PRIVATE REPOSITORIES"]}</Td>
              <Td>{org.PRICE}</Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    );
  };

  const createNamespaceHandler = async () => {
    // handleModalToggle(); // check if this is needed
    await fetch(`${quayAuth.QUAY_HOSTNAME}/api/v1/organization/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${quayAuth.QUAY_OAUTH_TOKEN}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ name: namespaceName, email: namespaceEmail }),
    }).then;
  };

  return (
    <Modal
      title="Create Namespace"
      variant={ModalVariant.medium}
      isOpen={isModalOpen}
      onClose={handleModalToggle}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          onClick={createNamespaceHandler}
          form="modal-with-form-form"
        >
          Create Organization
        </Button>,
      ]}
    >
      <Form id="modal-with-form-form" isWidthLimited>
        <FormGroup
          isInline
          label="Namespace Name"
          isRequired
          fieldId="modal-with-form-form-name"
          helperText="This will also be the namespace for your repositories. Must be alphanumeric, all lowercase, at least 2 characters long and at most 255 characters long"
          // className='text-input-width'
        >
          <TextInput
            isRequired
            type="text"
            id="modal-with-form-form-name"
            value={namespaceName}
            onChange={handleNameInputChange}
            // ref={nameInputRef}
          />
        </FormGroup>
        <FormGroup
          label="Namespace Email"
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
            value={namespaceEmail}
            onChange={handleEmailInputChange}
            // ref={nameInputRef}
          />
        </FormGroup>
        <br />

        {/* <Text component={TextVariants.h3}> Choose your organization's plan: ${repoCount}</Text>
        <Text component={TextVariants.small}> Number of private repositories </Text> */}
      </Form>
      <FormGroup
        label={`Choose your organization's plan: $${repoCount}`}
        isRequired
        fieldId="modal-with-form-form-email"
      >
        <Text component={TextVariants.small}>
          {" "}
          Number of private repositories{" "}
          <Popover
            aria-label="Basic popover"
            headerContent={<div>Organization Plans</div>}
            bodyContent={orgPlansPopOver}
          >
            <i className="fas fa-info-circle"></i>
          </Popover>
        </Text>
        <Slider
          value={repoCount}
          showTicks
          customSteps={reposWithCost}
          onChange={handleRepoCountChange}
        />
      </FormGroup>
    </Modal>
  );
};

type CreateNamespaceModalProps = {
  isModalOpen: boolean;
  handleModalToggle?: () => void;
};
