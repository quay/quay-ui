import {AxiosResponse} from 'axios';
import axios from 'src/libs/axios';
import {assertHttpCode} from './ErrorHandling';

export interface TagsResponse {
  page: number;
  has_additional: boolean;
  tags: Tag[];
}

export interface Tag {
  name: string;
  is_manifest_list: boolean;
  last_modified: string;
  manifest_digest: string;
  reversion: boolean;
  size: number;
  start_ts: number;
  manifest_list: ManifestList;
  expiration?: string;
}

export interface ManifestList {
  schemaVersion: number;
  mediaType: string;
  manifests: Manifest[];
}
export interface Manifest {
  mediaType: string;
  size: number;
  digest: string;
  platform: Platform;
  security: SecurityDetailsResponse;
}
export interface Platform {
  architecture: string;
  os: string;
  features: string[];
}

export interface LabelsResponse {
  labels: Label[];
}

export interface Label {
  id: string;
  key: string;
  media_type: string;
  source_type: string;
  value: string;
}
export interface ManifestByDigestResponse {
  digest: string;
  is_manifest_list: boolean;
  manifest_data: string;
  config_media_type?: any;
  layers?: any;
}

export interface SecurityDetailsResponse {
  status: string;
  data: Data;
}
export interface Data {
  Layer: Layer;
}
export interface Layer {
  Name: string;
  ParentName: string;
  NamespaceName: string;
  IndexedByVersion: number;
  Features: Feature[];
}
export interface Feature {
  Name: string;
  VersionFormat: string;
  NamespaceName: string;
  AddedBy: string;
  Version: string;
  Vulnerabilities?: Vulnerability[];
}

export interface Vulnerability {
  Severity: VulnerabilitySeverity;
  NamespaceName: string;
  Link: string;
  FixedBy: string;
  Description: string;
  Name: string;
  Metadata: VulnerabilityMetadata;
}

export interface VulnerabilityMetadata {
  UpdatedBy: string;
  RepoName: string;
  RepoLink: string;
  DistroName: string;
  DistroVersion: string;
  NVD: {
    CVSSv3: {
      Vectors: string;
      Score: number;
    };
  };
}

export enum VulnerabilitySeverity {
  Critical = 'Critical',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
  Negligible = 'Negligible',
  None = 'None',
  Unknown = 'Unknown',
}

export const VulnerabilityOrder = {
  [VulnerabilitySeverity.Critical]: 0,
  [VulnerabilitySeverity.High]: 1,
  [VulnerabilitySeverity.Medium]: 2,
  [VulnerabilitySeverity.Low]: 3,
  [VulnerabilitySeverity.Negligible]: 4,
  [VulnerabilitySeverity.Unknown]: 5,
};

export async function getTags(
  org: string,
  repo: string,
  page: number,
  limit = 100,
  specificTag = null,
) {
  let path = `/api/v1/repository/${org}/${repo}/tag/?limit=${limit}&page=${page}&onlyActiveTags=true`;
  if (specificTag) {
    path = path.concat(`&specificTag=${specificTag}`);
  }
  const response: AxiosResponse<TagsResponse> = await axios.get(path);
  assertHttpCode(response.status, 200);
  return response.data;
}

export async function getLabels(org: string, repo: string, digest: string) {
  const response: AxiosResponse<LabelsResponse> = await axios.get(
    `/api/v1/repository/${org}/${repo}/manifest/${digest}/labels`,
  );
  assertHttpCode(response.status, 200);
  return response.data;
}

interface TagLocation {
  org: string;
  repo: string;
  tag: string;
}

export async function bulkDeleteTags(tags: TagLocation[]) {
  await Promise.all(tags.map((tag) => deleteTag(tag.org, tag.repo, tag.tag)));
}

export async function deleteTag(org: string, repo: string, tag: string) {
  const response: AxiosResponse = await axios.delete(
    `/api/v1/repository/${org}/${repo}/tag/${tag}`,
  );
  assertHttpCode(response.status, 204);
}

export async function getManifestByDigest(
  org: string,
  repo: string,
  digest: string,
) {
  const response: AxiosResponse<ManifestByDigestResponse> = await axios.get(
    `/api/v1/repository/${org}/${repo}/manifest/${digest}`,
  );
  assertHttpCode(response.status, 200);
  return response.data;
}

export async function getSecurityDetails(
  org: string,
  repo: string,
  digest: string,
) {
  const response: AxiosResponse<SecurityDetailsResponse> = await axios.get(
    `/api/v1/repository/${org}/${repo}/manifest/${digest}/security?vulnerabilities=true`,
  );
  assertHttpCode(response.status, 200);
  return response.data;
}
