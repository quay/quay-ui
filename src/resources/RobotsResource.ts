import {AxiosError, AxiosResponse} from 'axios';
import axios from 'src/libs/axios';
import {assertHttpCode, BulkOperationError} from './ErrorHandling';

export interface IRobot {
  name: string;
  created: string;
  last_accessed: string;
  teams: string[];
  repositories: string[];
  description: string;
}

export async function fetchAllRobots(orgnames: string[], signal: AbortSignal) {
  return await Promise.all(
    orgnames.map((org) => fetchRobotsForNamespace(org, false, signal)),
  );
}

export class RobotDeleteError extends Error {
  error: AxiosError;
  robotName: string;
  constructor(message: string, robotName: string, error: AxiosError) {
    super(message);
    this.robotName = robotName;
    this.error = error;
    Object.setPrototypeOf(this, RobotDeleteError.prototype);
  }
}

export async function fetchRobotsForNamespace(
  orgname: string,
  isUser = false,
  signal: AbortSignal,
): Promise<IRobot[]> {
  const userOrOrgPath = isUser ? 'user' : `organization/${orgname}`;
  const getRobotsUrl = `/api/v1/${userOrOrgPath}/robots?permissions=true&token=false`;
  const response: AxiosResponse = await axios.get(getRobotsUrl, {signal});
  assertHttpCode(response.status, 200);
  return response.data?.robots;
}

export async function createNewRobotForNamespace(
  orgname: string,
  robotname: string,
  description: string,
  isUser = false,
): Promise<IRobot[]> {
  const namespacePath = isUser ? 'user' : `organization/${orgname}`;
  const createOrgRobotsUrl = `/api/v1/${namespacePath}/robots/${robotname}`;
  const payload = {description: description};
  const response: AxiosResponse = await axios.put(createOrgRobotsUrl, payload);
  assertHttpCode(response.status, 201);
  return response.data?.name;
}

export async function deleteRobotAccount(orgname: string, robotname: string) {
  try {
    const robot = robotname.replace(orgname + '+', '');
    const deleteUrl = `/api/v1/organization/${orgname}/robots/${robot}`;
    const response: AxiosResponse = await axios.delete(deleteUrl);
    assertHttpCode(response.status, 204);
    return response.data;
  } catch (err) {
    throw new RobotDeleteError(
      'failed to delete robot account ',
      robotname,
      err,
    );
  }
}

export async function bulkDeleteRobotAccounts(
  orgname: string,
  robotaccounts: IRobot[],
) {
  const responses = await Promise.allSettled(
    robotaccounts.map((robot) => deleteRobotAccount(orgname, robot.name)),
  );

  // Aggregate failed responses
  const errResponses = responses.filter(
    (r) => r.status == 'rejected',
  ) as PromiseRejectedResult[];

  // If errors, collect and throw
  if (errResponses.length > 0) {
    const bulkDeleteError = new BulkOperationError(
      'error deleting robot accounts',
    );
    for (const response of errResponses) {
      const reason = response.reason;
      bulkDeleteError.addError(reason.robot, reason);
    }
    throw bulkDeleteError;
  }

  return responses;
}
