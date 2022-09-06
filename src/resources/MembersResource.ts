import {fetchOrg, IAvatar} from './OrganizationResource';
import axios from 'src/libs/axios';
import {assertHttpCode} from './ErrorHandling';

export interface IMember {
  name: string;
  kind: string;
  teams: ITeam[];
  repositories: string[];
}

export interface ITeam {
  name: string;
  avatar: IAvatar;
}

export async function fetchAllMembers(orgnames: string[]) {
  return await Promise.all(orgnames.map((org) => fetchMembersForOrg(org)));
}

export async function fetchMembersForOrg(orgname: string): Promise<IMember[]> {
  const getMembersUrl = `/api/v1/organization/${orgname}/members`;
  const response = await axios.get(getMembersUrl);
  assertHttpCode(response.status, 200);
  return response.data?.members;
}
