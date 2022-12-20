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
  TextInput,
} from '@patternfly/react-core';
import {useEffect, useState} from 'react';
import {useUpdateNotifications} from 'src/hooks/UseUpdateNotifications';

export default function CreateHipchatNotification(
  props: CreateHipchatNotification,
) {
  const [roomId, setRoomId] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const {
    create,
    successCreatingNotification,
    errorCreatingNotification,
    resetCreatingNotification,
  } = useUpdateNotifications(props.org, props.repo);

  const isFormComplete =
    props.method != undefined &&
    props.event != undefined &&
    token != '' &&
    roomId != '';

  const createNotification = async () => {
    create({
      config: {
        notification_token: token,
        room_id: roomId,
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
      <FormGroup fieldId="room-id-number" label="Room ID #" required>
        <TextInput
          required
          id="room-id-number-field"
          value={roomId}
          onChange={(value) => setRoomId(value)}
        />
      </FormGroup>
      <FormGroup
        fieldId="room-notification-token"
        label="Room Notification Token"
        required
      >
        <TextInput
          required
          id="room-notification-token-field"
          value={token}
          onChange={(value) => setToken(value)}
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

interface CreateHipchatNotification {
  org: string;
  repo: string;
  event: NotificationEvent;
  method: NotificationMethod;
  closeDrawer: () => void;
  setError: (error: string) => void;
}
