import {useEffect, useState} from 'react';
import {
  SecurityDetailsResponse,
  getSecurityDetails,
} from 'src/resources/TagResource';

export default function SecurityDetails(props: SecurityDetails) {
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
  return <>{status}</>;
}

export interface SecurityDetails {
  org: string;
  repo: string;
  digest: string;
}
