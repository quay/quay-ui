import {Button, ToolbarItem} from '@patternfly/react-core';

export function ToolbarButton(props: ToolbarButtonProps) {
  return (
    <ToolbarItem>
      <Button variant="primary" onClick={() => props.setModalOpen(true)}>
        Create Repository
      </Button>
      {props.isModalOpen ? props.Modal() : null}{' '}
    </ToolbarItem>
  );
}

type ToolbarButtonProps = {
  currentOrg: string;
  Modal: () => void;
  isModalOpen: boolean;
  setModalOpen: (open) => void;
};
