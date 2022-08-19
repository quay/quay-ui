import {AxiosResponse} from 'axios';
import axios from 'src/libs/axios';
import {assertHttpCode} from './ErrorHandling';

export interface IAvatar {
  name: string;
  hash: string;
  color: string;
  kind: string;
}

export interface IOrganization {
  name: string;
  avatar?: IAvatar;
  can_create_repo?: boolean;
  public?: boolean;
  is_org_admin?: boolean;
  preferred_namespace?: boolean;
}

export async function getOrg(orgname: string) {
  const getOrgUrl = `/api/v1/organization/${orgname}/`;
  // TODO: Add return type
  const response: AxiosResponse = await axios.get(getOrgUrl);
  assertHttpCode(response.status, 200);
  return response.data;
}

export async function deleteOrg(orgname: string) {
  const deleteApiUrl = `/api/v1/organization/${orgname}`;
  // TODO: Add return type
  const response: AxiosResponse = await axios.delete(deleteApiUrl);
  assertHttpCode(response.status, 204);
  return response.data;
}

export async function bulkDeleteOrganizations(orgs: string[]) {
  const response = await Promise.all(orgs.map((org) => deleteOrg(org)));
  return response;
}

interface CreateOrgRequest {
  name: string;
  email?: string;
}

export async function createOrg(name: string, email?: string) {
  const createOrgUrl = `/api/v1/organization/`;
  const reqBody: CreateOrgRequest = {name: name};
  if (email) {
    reqBody.email = email;
  }
  const response = await axios.post(createOrgUrl, reqBody);
  assertHttpCode(response.status, 201);
  return response.data;
}
