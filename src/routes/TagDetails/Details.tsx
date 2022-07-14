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
import CopyTags from './DetailsCopyTags';
import {Tag} from 'src/resources/TagResource';

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
              {new Date(props.tag.start_ts).toLocaleString('en-US', {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              })}
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
              {props.tag.last_modified}
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
              >
                {props.digest}
              </ClipboardCopy>
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup data-testid="size">
            <DescriptionListTerm>Size</DescriptionListTerm>
            <DescriptionListDescription>
              {props.size}
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
            <DescriptionListDescription>TODO-labels</DescriptionListDescription>
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
