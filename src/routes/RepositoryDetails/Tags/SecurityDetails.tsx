import {useEffect, useState} from 'react';
import {
  SecurityDetailsResponse,
  getSecurityDetails,
  Data,
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
import {
  SecurityDetailsErrorState,
  SecurityDetailsState,
} from 'src/atoms/SecurityDetailsState';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {addDisplayError, isErrorString} from 'src/resources/ErrorHandling';

enum Variant {
  condensed = 'condensed',
  full = 'full',
}

export default function SecurityDetails(props: SecurityDetailsProps) {
  const [status, setStatus] = useState<string>();
  const [vulnCount, setVulnCount] =
    useState<Map<VulnerabilitySeverity, number>>();
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useRecoilState(SecurityDetailsErrorState);
  const [data, setData] = useRecoilState(SecurityDetailsState);

  // Reset SecurityDetailsState so that loading skeletons appear when viewing report
  const emptySecurityDetails = useResetRecoilState(SecurityDetailsState);
  const resetSecurityDetails = () => emptySecurityDetails();

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
            setData(securityDetails);
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
          console.error(error);
          setErr(addDisplayError('Unable to get security details', error));
          setLoading(false);
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

  if (isErrorString(err)) {
    return <>Unable to get security details</>;
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
        onClick={resetSecurityDetails}
        className={'pf-u-display-inline-flex pf-u-align-items-center'}
      >
        <CheckCircleIcon
          color="green"
          style={{
            marginRight: '5px',
            marginBottom: '4px',
          }}
        />
        <span>None Detected</span>
      </Link>
    );
  }

  if (props.variant === Variant.condensed) {
    const highestSeverity: VulnerabilitySeverity = getHighestSeverity();
    return (
      <Link
        to={getTagDetailPath(props.org, props.repo, props.tag, queryParams)}
        onClick={resetSecurityDetails}
        className={'pf-u-display-inline-flex pf-u-align-items-center'}
      >
        <ExclamationTriangleIcon
          color={getSeverityColor(highestSeverity)}
          style={{
            marginRight: '5px',
            marginBottom: '4px',
          }}
        />
        <span>
          <b>{vulnCount.get(highestSeverity)}</b> {highestSeverity.toString()}
        </span>
      </Link>
    );
  }

  const counts = severityOrder
    .filter((severity) => vulnCount.has(severity))
    .map((severity) => {
      return (
        <div
          key={severity.toString()}
          className={'pf-u-display-flex pf-u-align-items-center'}
        >
          <ExclamationTriangleIcon
            color={getSeverityColor(severity)}
            style={{
              marginRight: '5px',
              marginBottom: '3px',
            }}
          />
          <span>
            <b>{vulnCount.get(severity)}</b> {severity.toString()}
          </span>
        </div>
      );
    });
  return (
    <Link
      to={getTagDetailPath(props.org, props.repo, props.tag, queryParams)}
      onClick={resetSecurityDetails}
    >
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
