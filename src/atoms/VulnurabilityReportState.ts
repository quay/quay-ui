import {atom} from 'recoil';
import {VulnerabilityMetadata} from 'src/resources/TagResource';

export const vulnListState = atom<VulnerabilityListItem[]>({
  key: 'vulnListState',
  default: [],
});

export const filteredVulnListState = atom<VulnerabilityListItem[]>({
  key: 'filteredVulnListState',
  default: [],
});

export interface VulnerabilityListItem {
  PackageName: string;
  CurrentVersion: string;
  Description: string;
  Advisory: string;
  Severity: string;
  Package: string;
  NamespaceName: string;
  Name: string;
  FixedInVersion: string;
  Metadata: VulnerabilityMetadata;
}
