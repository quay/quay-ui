import React from 'react';

import {ChartDonut} from '@patternfly/react-charts';
import {
  Split,
  SplitItem,
  PageSection,
  PageSectionVariants,
  Title,
  TitleSizes,
} from '@patternfly/react-core';
import {ExclamationTriangleIcon} from '@patternfly/react-icons';

function VulnerabilitySummary() {
  return (
    <div>
      <div className="pf-u-mt-3xl pf-u-ml-2xl">
        <Title
          headingLevel="h1"
          size={TitleSizes['3xl']}
          className="pf-u-mb-sm"
        >
          Quay Security Reporting has detected 13 vulnerabilities
        </Title>
        <Title headingLevel="h3" className="pf-u-mb-lg">
          Patches are available for 2 vulnerabilities
        </Title>
        <div className="pf-u-mb-sm">
          <ExclamationTriangleIcon color="red" className="pf-u-mr-md" />
          <b>7</b> High-level vulnerabilities
        </div>
        <div className="pf-u-mb-sm">
          <ExclamationTriangleIcon color="orange" className="pf-u-mr-md" />
          <b>5</b> Medium-level vulnerabilities
        </div>
        <div className="pf-u-mb-sm">
          <ExclamationTriangleIcon color="grey" className="pf-u-mr-md" />
          <b>1</b> Unknown vulnerabilities
        </div>
      </div>
    </div>
  );
}

function VulnerabilityChart() {
  return (
    <div style={{height: '20em', width: '20em'}}>
      <ChartDonut
        ariaDesc="vulnerability chart"
        ariaTitle="vulnerability chart"
        constrainToVisibleArea={true}
        data={[
          {x: 'High', y: 7},
          {x: 'Medium', y: 5},
          {x: 'Unknown', y: 1},
        ]}
        colorScale={['red', 'orange', 'grey']}
        labels={({datum}) => `${datum.x}: ${datum.y}%`}
        title="13"
      />
    </div>
  );
}

export function SecurityDetailsChart() {
  return (
    <PageSection variant={PageSectionVariants.light}>
      <Split>
        <SplitItem>
          <VulnerabilityChart />
        </SplitItem>
        <SplitItem>
          <VulnerabilitySummary />
        </SplitItem>
      </Split>
    </PageSection>
  );
}
