import axios from "src/libs/axios";
import { IAvatar, IOrganization } from "./OrganisationResource";



export interface IUserResource {
    anonymous: boolean,
    username: string,
    avatar: IAvatar,
    can_create_repo: boolean,
    is_me: boolean,
    verified: true,
    email: string,
    logins: [
        {
            service: string,
            service_identifier: string
            metadata: {
                service_username: string
            }
        }
    ],
    invoice_email: boolean,
    invoice_email_address: string,
    preferred_namespace: boolean,
    tag_expiration_s: number,
    prompts: [],
    company: string
    family_name: string,
    given_name: string,
    location: string,
    is_free_account: boolean,
    has_password_set: boolean,
    organizations: IOrganization[];
}

export async function getUser() {
    try {
        const response = await axios.get('/api/v1/user/');
        return response.data;
    } catch(error)  {
        throw new Error(`API error getting user ${error.message}`);
    }
}
