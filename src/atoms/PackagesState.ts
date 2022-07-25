import {atom} from 'recoil';
import {VulnerabilityStats} from 'src/routes/TagDetails/SecurityReport/SecurityReportChart';
import {Vulnerability, VulnerabilitySeverity} from '../resources/TagResource';

export const packagesListState = atom<PackagesListItem[]>({
  key: 'packagesListState',
  default: [],
});

export const filteredPackagesListState = atom<PackagesListItem[]>({
  key: 'filteredPackagesListState',
  default: [],
});

export interface PackagesListItem {
  PackageName: string;
  CurrentVersion: string;
  Vulnerabilities: Vulnerability[];

  VulnerabilityCounts: VulnerabilityStats;
  HighestVulnerabilitySeverity: VulnerabilitySeverity;

  VulnerabilityCountsAfterFix: VulnerabilityStats;
  HighestVulnerabilitySeverityAfterFix: VulnerabilitySeverity;
}
