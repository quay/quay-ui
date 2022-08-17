import axios from 'src/libs/axios';

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

export async function bulkDeleteOrganizations(orgs: string[]) {
  try {
    const response = await Promise.all(
      orgs.map((orgName) => {
        return axios.delete(`/api/v1/organization/${orgName}`);
      }),
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function createOrg(orgname: string, email?: string) {
  const createOrgUrl = `/api/v1/organization/`;
  const reqBody = {name: orgname, ...(email ? {email: email} : {})};
  try {
    const response = await axios.post(createOrgUrl, reqBody);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
