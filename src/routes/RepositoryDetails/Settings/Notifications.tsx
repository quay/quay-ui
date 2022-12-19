import {Button, Flex, FlexItem, Spinner} from '@patternfly/react-core';
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
  if (notificationMethod.type == NotificationMethodType.email) {
    return (
      <Flex direction={{default: 'column'}}>
        <FlexItem style={{marginBottom: 0}}>
          {notificationMethod.title}
        </FlexItem>
        <FlexItem id="configured-email" style={{color: 'grey'}}>
          email: {notification.config?.email}
        </FlexItem>
      </Flex>
    );
  }
  return <>{notificationMethod.title}</>;
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
