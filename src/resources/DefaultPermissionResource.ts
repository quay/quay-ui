import axios from 'src/libs/axios';
import {assertHttpCode, ResourceError} from './ErrorHandling';

export async function fetchDefaultPermissions(org: string) {
  const response = await axios.get(`/api/v1/organization/${org}/prototypes`);
  assertHttpCode(response.status, 200);
  return response.data.prototypes;
}

export async function updateDefaultPermission(
  org: string,
  id: string,
  newRole: string,
) {
  try {
    await axios.put(`/api/v1/organization/${org}/prototypes/${id}`, {
      id: id,
      role: newRole.toLowerCase(),
    });
  } catch (err) {
    throw new ResourceError('failed to set default permissions', newRole, err);
  }
}

export async function deleteDefaultPermission(org: string, id: string) {
  try {
    await axios.delete(`/api/v1/organization/${org}/prototypes/${id}`);
  } catch (err) {
    console.error('Unable to delete default permission', err);
  }
}

export async function fetchTeamsForDefaultPermissionDropdown(org: string) {
  const teamsForOrgUrl = `/api/v1/organization/${org}`;
  const teamsResponse = await axios.get(teamsForOrgUrl);
  assertHttpCode(teamsResponse.status, 200);
  return teamsResponse.data?.teams;
}

export async function fetchRobotsForDefaultPermissionDropdown(org: string) {
  const robotsForOrgUrl = `/api/v1/organization/${org}/robots?token=false&limit=20`;
  const robotsResponse = await axios.get(robotsForOrgUrl);
  assertHttpCode(robotsResponse.status, 200);
  return robotsResponse.data?.robots;
}
