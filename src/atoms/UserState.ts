import {atom, selector} from 'recoil';
import {IUserResource} from 'src/resources/UserResource';
import {IOrganization} from 'src/resources/OrganisationResource';

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
