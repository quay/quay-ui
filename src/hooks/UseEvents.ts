import {NotificationEventType} from 'src/resources/NotificationResource';
import {useQuayConfig} from './UseQuayConfig';

export interface NotificationEvent {
  type: NotificationEventType;
  title: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export function useEvents() {
  const config = useQuayConfig();
  // TODO: Implement icons
  const events: NotificationEvent[] = [
    {
      type: NotificationEventType.repoPush,
      title: 'Push to Repository',
      icon: null,
      enabled: true,
    },
    {
      type: NotificationEventType.vulnFound,
      title: 'Package Vulnerability Found',
      icon: null,
      enabled: config?.features.SECURITY_SCANNER,
    },
    {
      type: NotificationEventType.buildFailure,
      title: 'Image build failed',
      icon: null,
      enabled: config?.features.BUILD_SUPPORT,
    },
    {
      type: NotificationEventType.buildQueued,
      title: 'Image build queued',
      icon: null,
      enabled: config?.features.BUILD_SUPPORT,
    },
    {
      type: NotificationEventType.buildStart,
      title: 'Image build started',
      icon: null,
      enabled: config?.features.BUILD_SUPPORT,
    },
    {
      type: NotificationEventType.buildSuccess,
      title: 'Image build success',
      icon: null,
      enabled: config?.features.BUILD_SUPPORT,
    },
    {
      type: NotificationEventType.buildCancelled,
      title: 'Image build cancelled',
      icon: null,
      enabled: config?.features.BUILD_SUPPORT,
    },
    {
      type: NotificationEventType.mirrorStarted,
      title: 'Repository mirror started',
      icon: null,
      enabled: config?.features.REPO_MIRROR,
    },
    {
      type: NotificationEventType.mirrorSuccess,
      title: 'Repository mirror successful',
      icon: null,
      enabled: config?.features.REPO_MIRROR,
    },
    {
      type: NotificationEventType.mirrorFailed,
      title: 'Repository mirror unsuccessful',
      icon: null,
      enabled: config?.features.REPO_MIRROR,
    },
  ];

  return {
    events: events,
  };
}
