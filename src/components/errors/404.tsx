import React from 'react';
import {
  Button, EmptyState, EmptyStateBody, EmptyStateIcon, PageSection, Title,
} from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';

function NotFound() {
  return (
    <PageSection>
      <EmptyState variant="full">
        <EmptyStateIcon icon={ExclamationTriangleIcon} />
        <Title headingLevel="h1" size="lg">
          404 Page not found
        </Title>
        <EmptyStateBody>
          We didn&apos;t find a page that matches the address you navigated to.
        </EmptyStateBody>
        <Button title="Home" />
      </EmptyState>
    </PageSection>
  );
}
