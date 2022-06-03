import { TagsToolbar } from './Filter';
import Table from './table';
import { useState, useEffect } from 'react';
import { filterState, paginationState } from 'src/atoms/TagListState';
import { useRecoilValue } from 'recoil';
import {Tag,TagsResponse,getTags} from 'src/resources/TagResource';
import axios from "src/libs/axios";

const mockTags: Tag[] = [
    { Name: 'latest', OS: 'Mac', Security: 'a', Size: '1', LastModified: '123', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e', ManifestLists: {Arch: 'Linux on amd64', Security: 'a', Size: '1', Manifest: 'dummy', Format: 0} },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '2', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '3', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '4', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '5', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '6', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '7', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '8', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '9', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '10', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '11', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '12', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'latest', OS: 'Mac', Security: 'a', Size: '13', LastModified: '123', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '14', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '15', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '16', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '17', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '18', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '19', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '20', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '21', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '22', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '23', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '24', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'latest', OS: 'Mac', Security: 'a', Size: '25', LastModified: '123', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '26', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '27', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '28', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '29', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '30', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '31', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '32', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '33', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '34', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '35', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
    { Name: 'slim', OS: 'Linux', Security: 'b', Size: '36', LastModified: '456', Expires: 'Never', Manifest: 'dummy', Pull: 'icon', Digest: 'sha256:fd0922dc4a00da2dbe38de82762c45ea5acbb0803d64de673bb57df1e' },
];

interface TagsResponse {
    page: number,
    has_additional: boolean,
    tags: Tag[],
}

export default function Tags(props: TagsProps) {
    const [tags, setTags] = useState([])
    const filter = useRecoilValue(filterState);
    const pagination = useRecoilValue(paginationState);
    const filteredTags: Tag[] = filter !== "" ? tags.filter((tag) => tag.name.includes(filter)) : tags;
    console.log(filteredTags);
    const paginatedTags: Tag[] = filteredTags.slice((pagination.page - 1) * pagination.perPage, pagination.page * pagination.perPage);
    console.log(paginatedTags);

    useEffect(() => {
        // TESTING: Automatically populates list with mock tags to test filter and pagination
        // let tagNames = ["latest","slim","alpine"]
        // for(let i=1;i<=40;i++){
        //     let tag = { name: tagNames[i%3], is_manifest_list: false, last_modified: "Thu, 02 Jun 2022 19:12:32 -0000", size: i, manifest_digest: 'sha256:fd0922d', reversion: false,  start_ts: 1654197152}
        //     mockTags.push(tag)   
        // }
        // setTags(mockTags);
        (async () => {
            try{
                const resp: TagsResponse = await getTags(props.organization, props.repository);
                setTags(resp.tags);
            }catch(error: any){
                console.log("error");
                console.log(error);
            }
        })();
    },[]);
    
    return (
        <>
            <TagsToolbar tagCount={filteredTags.length}></TagsToolbar>
            <Table organization={props.organization} repository={props.repository} tags={paginatedTags}></Table>
        </>
    )
}

type TagsProps = {
    organization: string;
    repository: string;
};
