import {
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  Divider,
  PageSection,
  PageSectionVariants,
  ClipboardCopy,
  Skeleton,
} from '@patternfly/react-core';
import prettyBytes from 'pretty-bytes';
import CopyTags from './DetailsCopyTags';
import {Tag} from 'src/resources/TagResource';
import {formatDate} from 'src/libs/utils';
import Labels from 'src/components/labels/Labels';

export default function Details(props: DetailsProps) {
  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <DescriptionList
          columnModifier={{
            default: '2Col',
          }}
        >
          <DescriptionListGroup data-testid="name">
            <DescriptionListTerm>Name</DescriptionListTerm>
            <DescriptionListDescription>
              {props.tag.name ? (
                props.tag.name
              ) : (
                <Skeleton width="100%"></Skeleton>
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup data-testid="creation">
            <DescriptionListTerm>Creation</DescriptionListTerm>
            <DescriptionListDescription>
              {props.tag.start_ts ? (
                formatDate(props.tag.start_ts)
              ) : (
                <Skeleton width="100%"></Skeleton>
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup data-testid="repository">
            <DescriptionListTerm>Repository</DescriptionListTerm>
            <DescriptionListDescription>
              {props.repo ? props.repo : <Skeleton width="100%"></Skeleton>}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup data-testid="modified">
            <DescriptionListTerm>Modified</DescriptionListTerm>
            <DescriptionListDescription>
              {props.tag.last_modified ? (
                formatDate(props.tag.last_modified)
              ) : (
                <Skeleton width="100%"></Skeleton>
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>Digest</DescriptionListTerm>
            <DescriptionListDescription>
              {props.digest ? (
                <ClipboardCopy
                  data-testid="digest-clipboardcopy"
                  isReadOnly
                  hoverTip="Copy"
                  clickTip="Copied"
                  variant="inline-compact"
                >
                  {props.digest}
                </ClipboardCopy>
              ) : (
                <Skeleton width="100%"></Skeleton>
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup data-testid="size">
            <DescriptionListTerm>Size</DescriptionListTerm>
            <DescriptionListDescription>
              {props.size ? (
                prettyBytes(props.size)
              ) : (
                <Skeleton width="100%"></Skeleton>
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup data-testid="vulnerabilities">
            <DescriptionListTerm>Vulnerabilities</DescriptionListTerm>
            <DescriptionListDescription>
              {/* TODO - vulernabilities */}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup data-testid="labels">
            <DescriptionListTerm>Labels</DescriptionListTerm>
            <DescriptionListDescription>
              {props.digest !== '' ? (
                <Labels
                  org={props.org}
                  repo={props.repo}
                  digest={props.digest}
                />
              ) : (
                <Skeleton width="100%"></Skeleton>
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
        </DescriptionList>
      </PageSection>
      <Divider />
      <PageSection variant={PageSectionVariants.light}>
        <CopyTags
          org={props.org}
          repo={props.repo}
          tag={props.tag.name}
          digest={props.digest}
        />
      </PageSection>
    </>
  );
}

type DetailsProps = {
  tag: Tag;
  org: string;
  repo: string;
  size: number;
  digest: string;
};
