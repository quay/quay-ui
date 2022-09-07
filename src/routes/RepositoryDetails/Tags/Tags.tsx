import {TagsToolbar} from './TagsToolbar';
import Table from './Table';
import {useState, useEffect} from 'react';
import {filterState, selectedTagsState} from 'src/atoms/TagListState';
import {Page, PageSection, PageSectionVariants} from '@patternfly/react-core';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
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
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string>();
  const resetSelectedTags = useResetRecoilState(selectedTagsState);

  const filteredTags: Tag[] =
    filter !== '' ? tags.filter((tag) => tag.name.includes(filter)) : tags;

  // Pagination related states
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const paginatedTags: Tag[] = filteredTags.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  // Control selected tags
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
  const selectAllTags = (isSelecting = true) => {
    setSelectedTags(isSelecting ? tags.map((t) => t.name) : []);
  };
  const selectTag = (tag: Tag, rowIndex = 0, isSelecting = true) =>
    setSelectedTags((prevSelected) => {
      const otherSelectedtagNames = prevSelected.filter((r) => r !== tag.name);
      return isSelecting
        ? [...otherSelectedtagNames, tag.name]
        : otherSelectedtagNames;
    });

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
    <Page>
      <PageSection variant={PageSectionVariants.light} className="no-padding">
        <ErrorBoundary
          hasError={isErrorString(err)}
          fallback={<RequestError message={err} />}
        >
          <TagsToolbar
            organization={props.organization}
            repository={props.repository}
            tagCount={filteredTags.length}
            loadTags={loadTags}
            TagList={tags}
            paginatedTags={paginatedTags}
            perPage={perPage}
            page={page}
            setPage={setPage}
            setPerPage={setPerPage}
            selectTag={selectTag}
          />
          <Table
            org={props.organization}
            repo={props.repository}
            tags={paginatedTags}
            loading={loading}
            selectAllTags={selectAllTags}
            selectedTags={selectedTags}
            selectTag={selectTag}
          />
        </ErrorBoundary>
      </PageSection>
    </Page>
  );
}

type TagsProps = {
  organization: string;
  repository: string;
};
