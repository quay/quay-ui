import {atom, selector} from 'recoil';
import {IUserResource} from 'src/resources/UserResource';
import {IOrganization} from 'src/resources/OrganizationResource';
import {fetchUser} from 'src/resources/UserResource';

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
    return await fetchUser();
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
