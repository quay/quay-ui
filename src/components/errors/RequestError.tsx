import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  PageSection,
  Title,
} from '@patternfly/react-core';
import {ExclamationTriangleIcon} from '@patternfly/react-icons';

export default function RequestError(props: RequestErrorProps) {
  return (
    <PageSection>
      <EmptyState variant="full">
        <EmptyStateIcon icon={ExclamationTriangleIcon} />
        <Title headingLevel="h1" size="lg">
          Unable to complete request
        </Title>
        <EmptyStateBody>{props.message}</EmptyStateBody>
        <Button title="Home" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </EmptyState>
    </PageSection>
  );
}

interface RequestErrorProps {
  message: string;
}
