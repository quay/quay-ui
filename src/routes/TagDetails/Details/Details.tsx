import {
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  Divider,
  PageSection,
  PageSectionVariants,
  ClipboardCopy,
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
              {props.tag.name}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup data-testid="creation">
            <DescriptionListTerm>Creation</DescriptionListTerm>
            <DescriptionListDescription>
              {formatDate(props.tag.start_ts)}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup data-testid="repository">
            <DescriptionListTerm>Repository</DescriptionListTerm>
            <DescriptionListDescription>
              {props.repo}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup data-testid="modified">
            <DescriptionListTerm>Modified</DescriptionListTerm>
            <DescriptionListDescription>
              {formatDate(props.tag.last_modified)}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>Digest</DescriptionListTerm>
            <DescriptionListDescription>
              <ClipboardCopy
                data-testid="digest-clipboardcopy"
                isReadOnly
                hoverTip="Copy"
                clickTip="Copied"
                variant="inline-compact"
              >
                {props.digest}
              </ClipboardCopy>
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup data-testid="size">
            <DescriptionListTerm>Size</DescriptionListTerm>
            <DescriptionListDescription>
              {prettyBytes(props.size)}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup data-testid="vulnerabilities">
            <DescriptionListTerm>Vulnerabilities</DescriptionListTerm>
            <DescriptionListDescription>
              TODO-vulernabilities
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup data-testid="labels">
            <DescriptionListTerm>Labels</DescriptionListTerm>
            <DescriptionListDescription>
              <Labels org={props.org} repo={props.repo} digest={props.digest} />
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
