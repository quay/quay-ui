import {Modal, ModalVariant, Button, Label} from '@patternfly/react-core';
import {deleteTag} from 'src/resources/TagResource';

export function DeleteModal(props: ModalProps) {
  const deleteTags = async () => {
    await Promise.all(
      props.selectedTags.map(async (tag) =>
        deleteTag(props.org, props.repo, tag),
      ),
    );
    props.loadTags();
    props.setIsOpen(!props.isOpen);
    props.setSelectedTags([]);
  };
  return (
    <Modal
      title={`Delete the following tag${
        props.selectedTags.length > 1 ? 's' : ''
      }?`}
      isOpen={props.isOpen}
      disableFocusTrap={true}
      key="modal"
      onClose={() => {
        props.setIsOpen(!props.isOpen);
      }}
      data-testid="delete-tags-modal"
      variant={ModalVariant.small}
      actions={[
        <Button
          key="cancel"
          variant="primary"
          onClick={() => {
            props.setIsOpen(!props.isOpen);
          }}
        >
          Cancel
        </Button>,
        <Button
          key="modal-action-button"
          variant="primary"
          onClick={deleteTags}
        >
          Delete
        </Button>,
      ]}
    >
      {props.selectedTags.map((tag) => (
        <span key={tag}>
          <Label>{tag}</Label>{' '}
        </span>
      ))}
      {props.selectedTags.length > 1 ? (
        <div>
          <b>Note:</b> This operation can take several minutes.
        </div>
      ) : null}
    </Modal>
  );
}

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isModalOpen: boolean) => void;
  selectedTags: string[];
  setSelectedTags: (selectedTags: string[]) => void;
  loadTags: () => void;
  org: string;
  repo: string;
};
