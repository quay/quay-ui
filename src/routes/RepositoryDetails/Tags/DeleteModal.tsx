import {Modal, ModalVariant, Button, Label} from '@patternfly/react-core';
import {useState} from 'react';
import FormError from 'src/components/errors/FormError';
import {bulkDeleteTags} from 'src/resources/TagResource';

export function DeleteModal(props: ModalProps) {
  const [err, setErr] = useState<string>();
  const deleteTags = async () => {
    try {
      const tags = props.selectedTags.map((tag) => ({
        org: props.org,
        repo: props.repo,
        tag: tag,
      }));
      await bulkDeleteTags(tags);
      props.loadTags();
      props.setIsOpen(!props.isOpen);
      props.setSelectedTags([]);
    } catch (err: any) {
      console.error(err);
      // TODO: Add to message the tags that weren't able to be deleted
      setErr('Unable to delete tags');
    }
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
      <FormError message={err} setErr={setErr} />
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
