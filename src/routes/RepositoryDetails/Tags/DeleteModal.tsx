import {Modal, ModalVariant, Button, Label} from '@patternfly/react-core';
import {useState} from 'react';
import ErrorModal from 'src/components/errors/ErrorModal';
import {addDisplayError, BulkOperationError} from 'src/resources/ErrorHandling';
import {bulkDeleteTags} from 'src/resources/TagResource';

export function DeleteModal(props: ModalProps) {
  const [err, setErr] = useState<string[]>();
  const deleteTags = async () => {
    try {
      const tags = props.selectedTags.map((tag) => ({
        org: props.org,
        repo: props.repo,
        tag: tag,
      }));
      await bulkDeleteTags(tags);
    } catch (err: any) {
      console.error(err);
      if (err instanceof BulkOperationError) {
        const errMessages = [];
        // TODO: Would like to use for .. of instead of foreach
        // typescript complains saying we're using version prior to es6?
        err.getErrors().forEach((error, tag) => {
          errMessages.push(
            addDisplayError(`Failed to delete tag ${tag}`, error.error),
          );
        });
        setErr(errMessages);
      } else {
        setErr([addDisplayError('Failed to delete tags', err)]);
      }
    } finally {
      props.loadTags();
      props.setIsOpen(!props.isOpen);
      props.setSelectedTags([]);
    }
  };
  return (
    <>
      <ErrorModal title="Tag deletion failed" error={err} setError={setErr} />
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
    </>
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
