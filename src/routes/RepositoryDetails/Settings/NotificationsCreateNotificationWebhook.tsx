import {NotificationEvent} from 'src/hooks/UseEvents';
import {NotificationMethod} from 'src/hooks/UseNotificationMethods';
import {
  ActionGroup,
  Alert,
  AlertActionCloseButton,
  Button,
  FormGroup,
  Modal,
  ModalVariant,
  TextArea,
  TextInput,
} from '@patternfly/react-core';
import {useEffect, useState} from 'react';
import {useUpdateNotifications} from 'src/hooks/UseUpdateNotifications';

export default function CreateWebhookNotification(
  props: CreateWebhookNotificationProps,
) {
  const [url, setUrl] = useState<string>('');
  const [jsonBody, setJsonBody] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const {
    create,
    successCreatingNotification,
    errorCreatingNotification,
    resetCreatingNotification,
  } = useUpdateNotifications(props.org, props.repo);

  const isFormComplete =
    props.method != undefined && props.event != undefined && url != '';

  const createNotification = async () => {
    create({
      config: {
        url: url,
        template: jsonBody,
      },
      event: props.event?.type,
      event_config: {},
      method: props.method?.type,
      title: title,
    });
  };

  useEffect(() => {
    if (successCreatingNotification) {
      resetCreatingNotification();
      props.closeDrawer();
    }
  }, [successCreatingNotification]);

  return (
    <>
      <FormGroup fieldId="webhook-url" label="Webhook URL" required>
        <TextInput
          required
          id="webhook-url-field"
          value={url}
          onChange={(value) => setUrl(value)}
        />
      </FormGroup>
      <FormGroup fieldId="webhook-body" label="POST body template " required>
        <TextArea
          id="json-body-field"
          value={jsonBody}
          onChange={(value) => setJsonBody(value)}
          isRequired
        />
      </FormGroup>
      <FormGroup fieldId="title" label="Title">
        <TextInput
          id="notification-title"
          value={title}
          onChange={(value) => setTitle(value)}
        />
      </FormGroup>
      <ActionGroup>
        <Button
          isDisabled={!isFormComplete}
          onClick={createNotification}
          variant="primary"
        >
          Submit
        </Button>
      </ActionGroup>
    </>
  );
}

interface CreateWebhookNotificationProps {
  org: string;
  repo: string;
  event: NotificationEvent;
  method: NotificationMethod;
  closeDrawer: () => void;
  setError: (error: string) => void;
}
