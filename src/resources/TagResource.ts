import { AxiosResponse } from "axios";
import axios from "src/libs/axios";

export interface TagsResponse {
    page: number,
    has_additional: boolean,
    tags: Tag[],
}

export interface Tag {
    name: string,
    is_manifest_list: boolean,
    last_modified: string,
    manifest_digest: string,
    reversion: boolean,
    size: number,
    start_ts: number,
}

export async function getTags(org: string, repo: string) {
    try{
        const response: AxiosResponse<TagsResponse> = await axios.get(`/api/v1/repository/${org}/${repo}/tag/?limit=100&page=1&onlyActiveTags=true`);
        return response.data
    }catch(error: any){
        throw new Error(`API error getting tags ${error.message}`);
    }
}
