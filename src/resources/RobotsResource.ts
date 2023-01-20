import {AxiosResponse} from 'axios';
import axios from 'src/libs/axios';
import {assertHttpCode} from './ErrorHandling';

export interface IRobot {
  name: string;
  created: string;
  last_accessed: string;
  teams?: string[];
  repositories?: string[];
  description: string;
}

export async function fetchAllRobots(orgnames: string[], signal: AbortSignal) {
  return await Promise.all(
    orgnames.map((org) => fetchRobotsForNamespace(org, false, signal)),
  );
}

export async function fetchRobotsForNamespace(
  orgname: string,
  isUser = false,
  signal?: AbortSignal,
): Promise<IRobot[]> {
  const userOrOrgPath = isUser ? 'user' : `organization/${orgname}`;
  const getRobotsUrl = `/api/v1/${userOrOrgPath}/robots?permissions=true&token=false`;
  let response: AxiosResponse;
  if (signal) {
    response = await axios.get(getRobotsUrl, {signal});
  } else {
    response = await axios.get(getRobotsUrl);
  }
  assertHttpCode(response.status, 200);
  return response.data?.robots;
}
