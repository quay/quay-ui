import {useEffect, useState} from 'react';
import {
  SecurityDetailsResponse,
  getSecurityDetails,
} from 'src/resources/TagResource';
import {Link} from 'react-router-dom';
import {getTagDetailPath} from 'src/routes/NavigationPath';
import {TabIndex} from 'src/routes/TagDetails/TagDetailsTabs';

export default function SecurityDetails(props: SecurityDetailsProps) {
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const securityDetails: SecurityDetailsResponse =
          await getSecurityDetails(props.org, props.repo, props.digest);
        setStatus(securityDetails.status);
      } catch (error: any) {
        console.log('Unable to get security details: ', error);
      }
    })();
  }, []);
  const queryParams = new Map<string, string>([
    ['tab', TabIndex.SecurityReport],
  ]);
  if (props.arch) {
    queryParams.set('arch', props.arch);
  }
  return (
    <Link to={getTagDetailPath(props.org, props.repo, props.tag, queryParams)}>
      {status}
    </Link>
  );
}

export interface SecurityDetailsProps {
  org: string;
  repo: string;
  tag: string;
  digest: string;
  arch?: string;
}
