import React from 'react';

import {ChartDonut} from '@patternfly/react-charts';
import {
  Grid,
  GridItem,
  PageSection,
  PageSectionVariants,
  Title,
} from '@patternfly/react-core';

function VulnerabilityChart() {
  return (
    <ChartDonut
      ariaDesc="vulnerability chart"
      ariaTitle="vulnerability chart"
      constrainToVisibleArea={true}
      data={[
        {x: 'Cats', y: 35},
        {x: 'Dogs', y: 55},
        {x: 'Birds', y: 10},
      ]}
      labels={({datum}) => `${datum.x}: ${datum.y}%`}
      title="100"
    />
  );
}

function VulnerabilitySummary() {
  return (
    <>
      <Title headingLevel="h1">
        Quay Security Reporting has detected 13 vulnerabilities
      </Title>
      <Title headingLevel="h2">
        Patches are available for 2 vulnerabilities
      </Title>
      <div>
        <b>7</b> High-level vulnerabilities
      </div>
      <div>
        <b>5</b> Medium-level vulnerabilities
      </div>
      <div>
        <b>1</b> Unknown-level vulnerabilities
      </div>
    </>
  );
}

export function SecurityDetailsChart() {
  return (
    <PageSection variant={PageSectionVariants.light}>
      <Grid>
        <GridItem span={4}>
          <VulnerabilityChart />
        </GridItem>
        <GridItem span={8}>
          <VulnerabilitySummary />
        </GridItem>
      </Grid>
    </PageSection>
  );
}
