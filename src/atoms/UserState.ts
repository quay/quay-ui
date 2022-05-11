import {atom, selector, useRecoilState} from 'recoil';
import {IOrganization, IUserResource} from "src/resources/UserResource";
import axios from "src/libs/axios";

// TODO: Error handling
export const UserState = atom<IUserResource | undefined>({
    key: 'userState',
    default: undefined,
    effects: [({setSelf}) => {
        console.log("user effect called")
        axios.get('/api/v1/user/').then((response) => {
            setSelf(response.data);
        }).catch(() => setSelf(undefined))
    }],
});

export const UserOrgs = selector<IOrganization[] | undefined >({
    key: 'userOrgs',
    get: ({get}) => {
        const user = get(UserState);
        return user ? user.organizations : undefined
    },
});
