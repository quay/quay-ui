import {atom, selector} from 'recoil';
import {IUserResource} from 'src/resources/UserResource';
import {IOrganization} from 'src/resources/OrganisationResource';
import {getUser} from 'src/resources/UserResource';

// Request ID is used to refresh userState via the API.
// Updating UserRequestId get's the latest contents of
// the user state.
export const UserRequestId = atom({
  key: 'userRequestId',
  default: 0,
});

export const CurrentUsernameState = atom({
  key: 'currentUsernameState',
  default: '',
});

export const UserState = selector<IUserResource | undefined>({
  key: 'userState',
  get: async ({get}) => {
    get(UserRequestId); // Add dep on UserRequestId to allow refreshes
    return await getUser();
  },
});

export const UserOrgs = selector<IOrganization[] | undefined>({
  key: 'userOrgs',
  get: async ({get}) => {
    const user: IUserResource = get(UserState);
    // Check should never fail, if request was unsuccessful it throws
    // an error and if returns a 401 redirects to /signin
    if (user) {
      return [{name: user.username}, ...user.organizations];
    }
  },
});

export const selectedOrgsState = atom<IOrganization[]>({
  key: 'selectedOrgsState',
  default: [],
});

export const filterOrgState = atom({
  key: 'filterOrgState',
  default: '',
});
