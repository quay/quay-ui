import {Modal, ModalVariant, Wizard} from '@patternfly/react-core';
import {useState} from 'react';
import NameAndDescription from './robotAccountWizard/NameAndDescription';
import Footer from './robotAccountWizard/Footer';

export default function CreateRobotAccountModal(
  props: CreateRobotAccountModalProps,
) {
  if (!props.isModalOpen) {
    return null;
  }
  const [robotName, setRobotName] = useState('');
  const [robotDescription, setrobotDescription] = useState('');

  const onSubmit = () => {
    console.log('We are submiting here');
  };

  const steps = [
    {
      name: 'Robot name and description',
      component: (
        <NameAndDescription
          robotName={robotName}
          setRobotName={setRobotName}
          robotDescription={robotDescription}
          setrobotDescription={setrobotDescription}
        />
      ),
    },
    {name: 'Add to team (optional)', component: <p>Step 2</p>},
    {name: 'Add to repository (optional)', component: <p>Step 3</p>},
    {name: 'Default permissions (optional)', component: <p>Step 4</p>},
    {name: 'Review and Finish', component: <p>Review Step</p>},
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
        footer={<Footer onSubmit={onSubmit} />}
      />
    </Modal>
  );
}

interface CreateRobotAccountModalProps {
  isModalOpen: boolean;
  handleModalToggle?: () => void;
}
