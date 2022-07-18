import {VulnerabilitySeverity} from 'src/resources/TagResource';

export function getSeverityColor(severity: VulnerabilitySeverity) {
  switch (severity) {
    case VulnerabilitySeverity.Critical:
      return '#7D1007';
    case VulnerabilitySeverity.High:
      return '#C9190B';
    case VulnerabilitySeverity.Medium:
      return '#EC7A08';
    case VulnerabilitySeverity.Low:
      return '#F0AB00';
    default:
      return '#8A8D90';
  }
}

export function formatDate(date: string | number) {
  return new Date(date).toLocaleString('en-US', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeStyle: 'short',
    dateStyle: 'medium',
  });
}
