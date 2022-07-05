import {Toolbar} from './Toolbar';
import Table from './Table';
import {useState, useEffect} from 'react';
import {filterState, paginationState} from 'src/atoms/TagListState';
import {useRecoilValue} from 'recoil';
import {
  Tag,
  TagsResponse,
  getTags,
  getManifestByDigest,
  ManifestByDigestResponse,
} from 'src/resources/TagResource';

const mockTags: Tag[] = [];

export default function Tags(props: TagsProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const filter = useRecoilValue(filterState);
  const pagination = useRecoilValue(paginationState);
  const filteredTags: Tag[] =
    filter !== '' ? tags.filter((tag) => tag.name.includes(filter)) : tags;
  const paginatedTags: Tag[] = filteredTags.slice(
    (pagination.page - 1) * pagination.perPage,
    pagination.page * pagination.perPage,
  );

  const loadTags = async () => {
    const getManifest = async (tag: Tag) => {
      const manifestResp: ManifestByDigestResponse = await getManifestByDigest(
        props.organization,
        props.repository,
        tag.manifest_digest,
      );
      tag.manifest_list = JSON.parse(manifestResp.manifest_data);
    };
    let page = 1;
    let hasAdditional = false;
    do {
      try {
        const resp: TagsResponse = await getTags(
          props.organization,
          props.repository,
          page,
        );
        await Promise.all(
          resp.tags.map((tag: Tag) =>
            tag.is_manifest_list ? getManifest(tag) : null,
          ),
        );
        if (page == 1) {
          setTags(resp.tags);
        } else {
          setTags((currentTags) => [...currentTags, ...resp.tags]);
        }
        hasAdditional = resp.has_additional;
        page++;
      } catch (error: any) {
        console.log('error');
        console.log(error);
      }
    } while (hasAdditional);
  };

  useEffect(() => {
    // TESTING: Automatically populates list with mock tags to test filter and pagination
    // let tagNames = ["latest","slim","alpine"]
    // for(let i=1;i<=40;i++){
    //     let tag = {
    //         name: tagNames[i % 3]+`${i}`,
    //         is_manifest_list: true,
    //         last_modified: "Thu, 02 Jun 2022 19:12:32 -0000",
    //         size: i,
    //         manifest_digest: 'sha256:fd0922d',
    //         reversion: false,
    //         start_ts: 1654197152,
    //         security: "Passed",
    //         manifest_list: null
    //     }
    //     mockTags.push(tag)
    // }
    // setTags(mockTags);
    loadTags();
  }, []);

  return (
    <>
      <Toolbar
        organization={props.organization}
        repository={props.repository}
        tagCount={filteredTags.length}
        loadTags={loadTags}
      ></Toolbar>
      <Table
        organization={props.organization}
        repository={props.repository}
        tags={paginatedTags}
      ></Table>
    </>
  );
}

type TagsProps = {
  organization: string;
  repository: string;
};
