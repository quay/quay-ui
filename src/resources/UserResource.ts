
interface IAvatar {
    name: string,
    hash: string,
    color: string,
    kind: string,
}

export interface IOrganization {
    name: string,
    avatar: IAvatar
    can_create_repo: boolean,
    public: boolean,
    is_org_admin: boolean,
    preferred_namespace: boolean
}

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
