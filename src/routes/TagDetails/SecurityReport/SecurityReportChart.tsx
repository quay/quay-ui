import React from 'react';

import {ChartDonut} from '@patternfly/react-charts';
import {
  PageSection,
  PageSectionVariants,
  Split,
  SplitItem,
  Title,
  TitleSizes,
} from '@patternfly/react-core';
import {BugIcon, ExclamationTriangleIcon} from '@patternfly/react-icons';
import {Feature, VulnerabilitySeverity} from 'src/resources/TagResource';
import {getSeverityColor} from 'src/libs/utils';

function VulnerabilitySummary(props: VulnerabilityStatsProps) {
  return (
    <div>
      <div className="pf-u-mt-xl pf-u-ml-2xl">
        <Title
          headingLevel="h1"
          size={TitleSizes['3xl']}
          className="pf-u-mb-sm"
        >
          Quay Security Reporting has detected {props.total} vulnerabilities
        </Title>
        <Title headingLevel="h3" className="pf-u-mb-lg">
          Patches are available for {props.patchesAvailable} vulnerabilities
        </Title>

        {Object.keys(props.stats).map((vulnLevel) => {
          if (props.stats[vulnLevel] > 0) {
            return (
              <div className="pf-u-mb-sm" key={vulnLevel}>
                <ExclamationTriangleIcon
                  color={getSeverityColor(vulnLevel as VulnerabilitySeverity)}
                  className="pf-u-mr-md"
                />
                <b>{props.stats[vulnLevel]}</b> {vulnLevel}-level
                vulnerabilities
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

function VulnerabilityChart(props: VulnerabilityStatsProps) {
  return (
    <div style={{height: '20em', width: '20em'}}>
      <ChartDonut
        ariaDesc="vulnerability chart"
        ariaTitle="vulnerability chart"
        constrainToVisibleArea={true}
        data={[
          {x: VulnerabilitySeverity.Critical, y: props.stats.Critical},
          {x: VulnerabilitySeverity.High, y: props.stats.High},
          {x: VulnerabilitySeverity.Medium, y: props.stats.Medium},
          {x: VulnerabilitySeverity.Unknown, y: props.stats.Unknown},
        ]}
        colorScale={[
          getSeverityColor(VulnerabilitySeverity.Critical),
          getSeverityColor(VulnerabilitySeverity.High),
          getSeverityColor(VulnerabilitySeverity.Medium),
          getSeverityColor(VulnerabilitySeverity.Unknown),
        ]}
        labels={({datum}) => `${datum.x}: ${datum.y}`}
        title={`${props.total}`}
      />
    </div>
  );
}

export function SecurityReportChart(props: SecurityDetailsChartProps) {
  const stats = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Unknown: 0,
  };

  let patchesAvailable = 0;
  let total = 0;
  props.features.map((feature) => {
    feature.Vulnerabilities.map((vulnerability) => {
      stats[vulnerability.Severity] += 1;
      total += 1;
      if (vulnerability.FixedBy.length > 0) {
        patchesAvailable += 1;
      }
    });
  });

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Split>
        <SplitItem>
          <VulnerabilityChart
            stats={stats}
            total={total}
            patchesAvailable={patchesAvailable}
          />
        </SplitItem>
        <SplitItem>
          <VulnerabilitySummary
            stats={stats}
            total={total}
            patchesAvailable={patchesAvailable}
          />
        </SplitItem>
      </Split>
    </PageSection>
  );
}

interface VulnerabilityStats {
  Critical: number;
  High: number;
  Medium: number;
  Unknown: number;
}

interface VulnerabilityStatsProps {
  stats: VulnerabilityStats;
  total: number;
  patchesAvailable: number;
}

interface SecurityDetailsChartProps {
  features: Feature[];
}
