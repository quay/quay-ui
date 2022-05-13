import axios from "src/libs/axios"

export interface IOrganization {
    name: string,
    avatar: IAvatar
    can_create_repo: boolean,
    public: boolean,
    is_org_admin: boolean,
    preferred_namespace: boolean
}

async function deleteOrg(orgname: string) {
    try {
        const response =  await axios.delete(deleteApiUrl);
    } catch (e) {

    }
}
