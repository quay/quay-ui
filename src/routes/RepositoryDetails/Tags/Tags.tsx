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
