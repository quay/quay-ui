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
import {BundleIcon} from '@patternfly/react-icons';
import {Feature, VulnerabilitySeverity} from 'src/resources/TagResource';
import {getSeverityColor} from 'src/libs/utils';
import {VulnerabilityStats} from '../SecurityReport/SecurityReportChart';

function PackageMessage(props: PackageMessageProps) {
  if (props.vulnLevel === 'None') {
    return <> Packages with no vulnerabilities</>;
  }
  return <> Packages with {props.vulnLevel}-level vulnerabilities</>;
}

function PackagesSummary(props: PackageStatsProps) {
  return (
    <div>
      <div className="pf-u-mt-xl pf-u-ml-2xl">
        <Title
          headingLevel="h1"
          size={TitleSizes['3xl']}
          className="pf-u-mb-sm"
        >
          Quay Security Reporting has recognized {props.total} packages
        </Title>
        <Title headingLevel="h3" className="pf-u-mb-lg">
          Patches are available for {props.patchesAvailable} vulnerabilities
        </Title>

        {Object.keys(props.stats).map((vulnLevel) => {
          if (props.stats[vulnLevel] > 0) {
            return (
              <div className="pf-u-mb-sm" key={vulnLevel}>
                <BundleIcon
                  color={getSeverityColor(vulnLevel as VulnerabilitySeverity)}
                  className="pf-u-mr-md"
                />
                <b>{props.stats[vulnLevel]}</b>
                <PackageMessage vulnLevel={vulnLevel} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

function PackagesDonutChart(props: PackageStatsProps) {
  return (
    <div style={{height: '20em', width: '20em'}}>
      <ChartDonut
        ariaDesc="packages chart"
        ariaTitle="packages chart"
        constrainToVisibleArea={true}
        data={[
          {x: VulnerabilitySeverity.Critical, y: props.stats.Critical},
          {x: VulnerabilitySeverity.High, y: props.stats.High},
          {x: VulnerabilitySeverity.Medium, y: props.stats.Medium},
          {x: VulnerabilitySeverity.Unknown, y: props.stats.Unknown},
          {x: VulnerabilitySeverity.None, y: props.stats.None},
        ]}
        colorScale={[
          getSeverityColor(VulnerabilitySeverity.Critical),
          getSeverityColor(VulnerabilitySeverity.High),
          getSeverityColor(VulnerabilitySeverity.Medium),
          getSeverityColor(VulnerabilitySeverity.Unknown),
          getSeverityColor(VulnerabilitySeverity.None),
        ]}
        labels={({datum}) => `${datum.x}: ${datum.y}`}
        title={`${props.total}`}
      />
    </div>
  );
}

export function PackagesChart(props: PackageChartProps) {
  const stats = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
    Negligible: 0,
    Unknown: 0,
    None: 0,
  };

  let patchesAvailable = 0;
  let totalPackages = 0;
  props.features.map((feature) => {
    totalPackages += 1;
    const perPackageVulnStats = {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      Negligible: 0,
      Unknown: 0,
    };

    feature.Vulnerabilities.map((vulnerability) => {
      perPackageVulnStats[vulnerability.Severity] = 1;
      if (vulnerability.FixedBy.length > 0) {
        patchesAvailable += 1;
      }
    });

    // add perPackageStats to totals
    Object.keys(perPackageVulnStats).map((severity) => {
      stats[severity] += perPackageVulnStats[severity];
    });

    if (feature.Vulnerabilities.length == 0) {
      stats[VulnerabilitySeverity.None] += 1;
    }
  });

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Split>
        <SplitItem>
          <PackagesDonutChart
            stats={stats}
            total={totalPackages}
            patchesAvailable={patchesAvailable}
          />
        </SplitItem>
        <SplitItem>
          <PackagesSummary
            stats={stats}
            total={totalPackages}
            patchesAvailable={patchesAvailable}
          />
        </SplitItem>
      </Split>
    </PageSection>
  );
}

interface PackageStatsProps {
  stats: VulnerabilityStats;
  total: number;
  patchesAvailable: number;
}

interface PackageChartProps {
  features: Feature[];
}

interface PackageMessageProps {
  vulnLevel: string;
}
