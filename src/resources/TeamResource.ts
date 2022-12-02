import {AxiosResponse} from 'axios';
import axios from 'src/libs/axios';
import {assertHttpCode} from './ErrorHandling';

export async function fetchTeamsForNamespace(
  org: string,
  signal?: AbortSignal,
) {
  const teamsForOrgUrl = `/api/v1/organization/${org}`;
  const teamsResponse = await axios.get(teamsForOrgUrl, {signal});
  assertHttpCode(teamsResponse.status, 200);
  return teamsResponse.data?.teams;
}

export async function createTeamForOrg(
  orgName: string,
  name: string,
  description: string,
) {
  const createTeamUrl = `/api/v1/organization/${orgName}/team/${name}`;
  const payload = {name: name, role: 'member', description: description};
  const response: AxiosResponse = await axios.put(createTeamUrl, payload);
  assertHttpCode(response.status, 200);
  return response.data;
}
