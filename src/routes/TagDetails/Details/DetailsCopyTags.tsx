import {
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  ClipboardCopy,
  Title,
} from '@patternfly/react-core';
import {getDomain} from 'src/routes/NavigationPath';

export default function CopyTags(props: CopyTagsProps) {
  return (
    <>
      <Title headingLevel="h3">Fetch Tag</Title>
      <DescriptionList>
        <DescriptionListGroup>
          <DescriptionListTerm>Podman Pull (by tag)</DescriptionListTerm>
          <DescriptionListDescription>
            <ClipboardCopy
              data-testid="podman-tag-clipboardcopy"
              isReadOnly
              hoverTip="Copy"
              clickTip="Copied"
            >
              {`podman pull ${getDomain()}/${props.org}/${props.repo}:${
                props.tag
              }`}
            </ClipboardCopy>
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Docker Pull (by tag)</DescriptionListTerm>
          <DescriptionListDescription>
            <ClipboardCopy
              data-testid="docker-tag-clipboardcopy"
              isReadOnly
              hoverTip="Copy"
              clickTip="Copied"
            >
              {`docker pull ${getDomain()}/${props.org}/${props.repo}:${
                props.tag
              }`}
            </ClipboardCopy>
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Podman Pull (by digest)</DescriptionListTerm>
          <DescriptionListDescription>
            <ClipboardCopy
              data-testid="podman-digest-clipboardcopy"
              isReadOnly
              hoverTip="Copy"
              clickTip="Copied"
            >
              {`podman pull ${getDomain()}/${props.org}/${props.repo}@${
                props.digest
              }`}
            </ClipboardCopy>
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Docker Pull (by digest)</DescriptionListTerm>
          <DescriptionListDescription>
            <ClipboardCopy
              data-testid="docker-digest-clipboardcopy"
              isReadOnly
              hoverTip="Copy"
              clickTip="Copied"
            >
              {`docker pull ${getDomain()}/${props.org}/${props.repo}@${
                props.digest
              }`}
            </ClipboardCopy>
          </DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
    </>
  );
}

type CopyTagsProps = {
  org: string;
  repo: string;
  tag: string;
  digest: string;
};
