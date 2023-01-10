import {
  Button,
  ClipboardCopy,
  ClipboardCopyVariant,
  Flex,
  FlexItem,
  Spinner,
  TextArea,
  TextInput,
} from '@patternfly/react-core';
import {BellIcon, BugIcon, UploadIcon} from '@patternfly/react-icons';
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import {useState} from 'react';
import Empty from 'src/components/empty/Empty';
import ReadonlySecret from 'src/components/ReadonlySecret';
import {useEvents} from 'src/hooks/UseEvents';
import {useNotificationMethods} from 'src/hooks/UseNotificationMethods';
import {useNotifications} from 'src/hooks/UseNotifications';
import {
  NotificationEventType,
  NotificationMethodType,
  RepoNotification,
  isNotificationEnabled,
} from 'src/resources/NotificationResource';
import {DrawerContentType} from '../Types';
import {NotificationsColumnNames} from './ColumnNames';
import NotificationsKebab from './NotificationsKebab';
import NotificationsToolbar from './NotificationsToolbar';

export default function Notifications({
  org,
  repo,
  ...props
}: NotificationsProps) {
  const [selectedNotifications, setSelectedNotifications] = useState<
    RepoNotification[]
  >([]);
  const {
    notifications,
    loading,
    error,
    paginatedNotifications,
    page,
    setPage,
    perPage,
    setPerPage,
    filter,
    setFilter,
    resetFilter,
  } = useNotifications(org, repo);

  const onSelectNotification = (
    notification: RepoNotification,
    rowIndex: number,
    isSelecting: boolean,
  ) => {
    setSelectedNotifications((prevSelected) => {
      const others = prevSelected.filter((r) => r.uuid !== notification.uuid);
      return isSelecting ? [...others, notification] : others;
    });
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <>Unable to load notifications</>;
  }

  if (notifications && notifications.length == 0) {
    return (
      <Empty
        icon={BellIcon}
        title="No notifications found"
        body="No notifications have been setup for this repository"
        button={
          <Button
            onClick={() =>
              props.setDrawerContent(DrawerContentType.CreateNotification)
            }
          >
            Create Notification
          </Button>
        }
      />
    );
  }

  return (
    <>
      <NotificationsToolbar
        org={org}
        repo={repo}
        allItems={notifications}
        paginatedItems={paginatedNotifications}
        selectedItems={selectedNotifications}
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        onItemSelect={onSelectNotification}
        deselectAll={() => setSelectedNotifications([])}
        setDrawerContent={props.setDrawerContent}
        filter={filter}
        setFilter={setFilter}
        resetFilter={resetFilter}
      />
      <TableComposable aria-label="Repository notifications table">
        <Thead>
          <Tr>
            <Th />
            <Th>{NotificationsColumnNames.title}</Th>
            <Th>{NotificationsColumnNames.event}</Th>
            <Th>{NotificationsColumnNames.notification}</Th>
            <Th>{NotificationsColumnNames.status}</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {paginatedNotifications?.map((notification, rowIndex) => (
            <Tr key={notification.uuid}>
              <Td
                select={{
                  rowIndex,
                  onSelect: (e, isSelecting) =>
                    onSelectNotification(notification, rowIndex, isSelecting),
                  isSelected: selectedNotifications.some(
                    (n) => n.uuid === notification.uuid,
                  ),
                }}
              />
              <Td data-label="title">
                {notification.title ? notification.title : '(Untitled)'}
              </Td>
              <Td data-label="event">
                <EventTitle type={notification.event} />
              </Td>
              <Td data-label="notification">
                <NotificationTitle notification={notification} />
              </Td>
              <Td data-label="status">
                <NotificationStatus notification={notification} />
              </Td>
              <Td data-label="kebab">
                <NotificationsKebab
                  org={org}
                  repo={repo}
                  notification={notification}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </>
  );
}

function EventTitle({type}: {type: NotificationEventType}) {
  const {events} = useEvents();
  const event = events.find((e) => e.type == type);
  // TODO: Icon returned from `events` needs to be added here
  return <>{event.title}</>;
}

function NotificationTitle({notification}: {notification: RepoNotification}) {
  const {notificationMethods} = useNotificationMethods();
  const notificationMethod = notificationMethods.find(
    (m) => m.type == notification.method,
  );
  let notificationConfig = null;
  switch (notificationMethod.type) {
    case NotificationMethodType.email:
      notificationConfig = (
        <FlexItem id="configured-email" style={{color: 'grey'}}>
          email: {notification.config?.email}
        </FlexItem>
      );
      break;
    case NotificationMethodType.flowdock:
      notificationConfig = (
        <FlexItem id="flow-api-token" style={{color: 'grey'}}>
          <ReadonlySecret
            label="Flow API Token"
            secret={notification.config?.flow_api_token}
          />
        </FlexItem>
      );
      break;
    case NotificationMethodType.hipchat:
      notificationConfig = (
        <>
          <FlexItem
            id="hipchat-room-id"
            style={{color: 'grey', marginBottom: '0px'}}
          >
            Room ID #: {notification.config?.room_id}
          </FlexItem>
          <FlexItem id="hipchat-token" style={{color: 'grey'}}>
            <ReadonlySecret
              label="Room Notification Token"
              secret={notification.config?.notification_token}
            />
          </FlexItem>
        </>
      );
      break;
    case NotificationMethodType.slack:
      notificationConfig = (
        <FlexItem id="slack-url" style={{color: 'grey'}}>
          Webhook URL: {notification.config?.url}
        </FlexItem>
      );
      break;
    case NotificationMethodType.webhook:
      notificationConfig = (
        <>
          <FlexItem
            id="webhook-url"
            style={{color: 'grey', marginBottom: '0px'}}
          >
            Webhook URL: {notification.config?.url}
          </FlexItem>
          <FlexItem id="webhook-body" style={{color: 'grey'}}>
            POST body template (optional):
            <ClipboardCopy
              isCode
              isReadOnly
              hoverTip="Copy"
              clickTip="Copied"
              variant={ClipboardCopyVariant.expansion}
            >
              {notification.config?.template}
            </ClipboardCopy>
          </FlexItem>
        </>
      );
      break;
    // TODO: Quay notifications not supported in new UI until
    // notification header has been implemented
    // case NotificationMethodType.quaynotification:
    //   return (
    //     <Flex direction={{default: 'column'}}>
    //       <FlexItem style={{marginBottom: 0}}>
    //         {notificationMethod.title}
    //       </FlexItem>
    //     </Flex>
    //   );
  }
  return (
    <Flex direction={{default: 'column'}}>
      <FlexItem style={{marginBottom: 0}}>{notificationMethod.title}</FlexItem>
      {notificationConfig}
    </Flex>
  );
}

function NotificationStatus({notification}: {notification: RepoNotification}) {
  return isNotificationEnabled(notification) ? (
    <>Enabled</>
  ) : (
    <>Disabled due to 3 failed attempts in a row</>
  );
}

interface NotificationsProps {
  org: string;
  repo: string;
  setDrawerContent: (content: DrawerContentType) => void;
}
