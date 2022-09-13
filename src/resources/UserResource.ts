import {AxiosResponse} from 'axios';
import axios from 'src/libs/axios';
import {assertHttpCode} from './ErrorHandling';
import {IAvatar, IOrganization} from './OrganizationResource';

export interface IUserResource {
  anonymous: boolean;
  username: string;
  avatar: IAvatar;
  can_create_repo: boolean;
  is_me: boolean;
  verified: true;
  email: string;
  logins: [
    {
      service: string;
      service_identifier: string;
      metadata: {
        service_username: string;
      };
    },
  ];
  invoice_email: boolean;
  invoice_email_address: string;
  preferred_namespace: boolean;
  tag_expiration_s: number;
  prompts: [];
  super_user: boolean;
  company: string;
  family_name: string;
  given_name: string;
  location: string;
  is_free_account: boolean;
  has_password_set: boolean;
  organizations: IOrganization[];
}

export async function fetchUser() {
  const response: AxiosResponse<IUserResource> = await axios.get(
    '/api/v1/user/',
  );
  assertHttpCode(response.status, 200);
  return response.data;
}

export interface AllUsers {
  users: IUserResource[];
}

export async function fetchUsersAsSuperUser() {
  const superUserOrgsUrl = `/api/v1/superuser/users/`;
  const response: AxiosResponse<AllUsers> = await axios.get(superUserOrgsUrl);
  assertHttpCode(response.status, 200);
  return response.data?.users;
}
