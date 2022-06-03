import {atom, selector, useRecoilState} from 'recoil';
import {
  getUser,
  IOrganization,
  IUserResource,
} from 'src/resources/UserResource';
import axios from 'src/libs/axios';
import {GlobalAuthState} from 'src/resources/AuthResource';

// TODO: Error handling
export const UserState = atom<IUserResource | undefined>({
  key: 'userState',
  default: undefined,
});

export const UserOrgs = selector<IOrganization[] | undefined>({
  key: 'userOrgs',
  get: async ({get}) => {
    const user = get(UserState);
    return user ? user.organizations : undefined;
  },
});
