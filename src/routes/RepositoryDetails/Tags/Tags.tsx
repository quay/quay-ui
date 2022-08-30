import {Toolbar} from './Toolbar';
import Table from './Table';
import {useState, useEffect} from 'react';
import {
  filterState,
  paginationState,
  selectedTagsState,
} from 'src/atoms/TagListState';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {
  Tag,
  TagsResponse,
  getTags,
  getManifestByDigest,
  ManifestByDigestResponse,
} from 'src/resources/TagResource';
import {addDisplayError, isErrorString} from 'src/resources/ErrorHandling';
import ErrorBoundary from 'src/components/errors/ErrorBoundary';
import RequestError from 'src/components/errors/RequestError';
import Empty from 'src/components/empty/Empty';
import {CubesIcon} from '@patternfly/react-icons';

export default function Tags(props: TagsProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const filter = useRecoilValue(filterState);
  const pagination = useRecoilValue(paginationState);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string>();
  const resetSelectedTags = useResetRecoilState(selectedTagsState);

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
        setLoading(false);
      } catch (error: any) {
        console.error(error);
        setLoading(false);
        setErr(addDisplayError('Unable to get tags', error));
      }
    } while (hasAdditional);
  };

  useEffect(() => {
    resetSelectedTags();
    loadTags();
  }, []);

  if (!loading && !tags?.length && !isErrorString(err)) {
    return (
      <Empty
        title="There are no viewable tags for this repository"
        icon={CubesIcon}
        body="No tags have been pushed to this repository. If you have the correct permissions, you may push tags to this repository."
      />
    );
  }

  return (
    <>
      <Toolbar
        organization={props.organization}
        repository={props.repository}
        tagCount={filteredTags.length}
        loadTags={loadTags}
      ></Toolbar>
      <ErrorBoundary
        hasError={isErrorString(err)}
        fallback={<RequestError message={err} />}
      >
        <Table
          org={props.organization}
          repo={props.repository}
          tags={paginatedTags}
          loading={loading}
        />
      </ErrorBoundary>
    </>
  );
}

type TagsProps = {
  organization: string;
  repository: string;
};
