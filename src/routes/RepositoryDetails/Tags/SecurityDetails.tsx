import {useEffect, useState} from 'react';
import {
  SecurityDetailsResponse,
  getSecurityDetails,
} from 'src/resources/TagResource';
import {Link} from 'react-router-dom';
import {Skeleton, Spinner} from '@patternfly/react-core';
import {getTagDetailPath} from 'src/routes/NavigationPath';
import {TabIndex} from 'src/routes/TagDetails/Types';
import {VulnerabilitySeverity} from 'src/resources/TagResource';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@patternfly/react-icons';
import {getSeverityColor} from 'src/libs/utils';

enum Variant {
  condensed = 'condensed',
  full = 'full',
}

export default function SecurityDetails(props: SecurityDetailsProps) {
  const [status, setStatus] = useState<string>();
  const [vulnCount, setVulnCount] =
    useState<Map<VulnerabilitySeverity, number>>();
  const [loading, setLoading] = useState<boolean>(true);

  const severityOrder = [
    VulnerabilitySeverity.Critical,
    VulnerabilitySeverity.High,
    VulnerabilitySeverity.Medium,
    VulnerabilitySeverity.Low,
    VulnerabilitySeverity.Negligible,
    VulnerabilitySeverity.Unknown,
  ];

  const getHighestSeverity = () => {
    for (const severity of severityOrder) {
      if (vulnCount.get(severity) != null && vulnCount.get(severity) > 0) {
        return severity;
      }
    }
  };

  useEffect(() => {
    if (props.digest !== '') {
      (async () => {
        try {
          const securityDetails: SecurityDetailsResponse =
            await getSecurityDetails(props.org, props.repo, props.digest);
          const vulns = new Map<VulnerabilitySeverity, number>();
          if (securityDetails.data) {
            for (const feature of securityDetails.data.Layer.Features) {
              if (feature.Vulnerabilities) {
                for (const vuln of feature.Vulnerabilities) {
                  if (vuln.Severity in VulnerabilitySeverity) {
                    if (vulns.has(vuln.Severity)) {
                      vulns.set(vuln.Severity, vulns.get(vuln.Severity) + 1);
                    } else {
                      vulns.set(vuln.Severity, 1);
                    }
                  }
                }
              }
            }
          }
          setStatus(securityDetails.status);
          setVulnCount(vulns);
          setLoading(false);
        } catch (error: any) {
          console.log('Unable to get security details: ', error);
        }
      })();
    }
  }, [props.digest]);
  const queryParams = new Map<string, string>([
    ['tab', TabIndex.SecurityReport],
  ]);
  if (props.arch) {
    queryParams.set('arch', props.arch);
  }

  if (loading) {
    return <Skeleton width="50%"></Skeleton>;
  }

  if (status === 'queued') {
    return <div>Queued</div>;
  } else if (status === 'failed') {
    return <div>Failed</div>;
  } else if (status === 'unsupported') {
    return <div>Unsupported</div>;
  }

  if (vulnCount.size === 0) {
    return (
      <Link
        to={getTagDetailPath(props.org, props.repo, props.tag, queryParams)}
      >
        <CheckCircleIcon color="green" />
        <span>None Detected</span>
      </Link>
    );
  }

  if (props.variant === Variant.condensed) {
    const highestSeverity: VulnerabilitySeverity = getHighestSeverity();
    return (
      <Link
        to={getTagDetailPath(props.org, props.repo, props.tag, queryParams)}
      >
        <div>
          <ExclamationTriangleIcon
            color={getSeverityColor(highestSeverity)}
            style={{
              marginRight: '5px',
            }}
          />
          <span>
            <b>{vulnCount.get(highestSeverity)}</b> {highestSeverity.toString()}
          </span>
        </div>
      </Link>
    );
  }

  const counts = severityOrder
    .filter((severity) => vulnCount.has(severity))
    .map((severity) => {
      return (
        <div key={severity.toString()}>
          <ExclamationTriangleIcon
            color={getSeverityColor(severity)}
            style={{
              marginRight: '5px',
            }}
          />
          <b>{vulnCount.get(severity)}</b> {severity.toString()}
        </div>
      );
    });
  return (
    <Link to={getTagDetailPath(props.org, props.repo, props.tag, queryParams)}>
      {counts}
    </Link>
  );
}

export interface SecurityDetailsProps {
  org: string;
  repo: string;
  tag: string;
  digest: string;
  arch?: string;
  variant?: Variant | 'condensed' | 'full';
}
