import {useEffect, useState} from 'react';
import SecurityReportTable from './SecurityReportTable';
import {
  Data,
  getSecurityDetails,
  SecurityDetailsResponse,
} from 'src/resources/TagResource';
import {SecurityReportChart} from './SecurityReportChart';
import {LoadingPage} from 'src/components/LoadingPage';

export default function SecurityReport(props: SecurityReportProps) {
  const [data, setData] = useState<Data>(null);

  // Grab security details based on digest
  useEffect(() => {
    if (props.digest !== '') {
      (async () => {
        try {
          const securityDetails: SecurityDetailsResponse =
            await getSecurityDetails(props.org, props.repo, props.digest);
          setData(securityDetails.data);
        } catch (error) {
          console.error('Unable to get security details: ', error);
        }
      })();
    }
  }, [props.digest]);

  let features = [];

  if (data) {
    features = data.Layer.Features;
  }

  return (
    <>
      <SecurityReportChart features={features} />
      <hr />
      <SecurityReportTable features={features} />
    </>
  );
}

interface SecurityReportProps {
  org: string;
  repo: string;
  digest: string;
}
