import {useEffect, useState} from 'react';
import SecurityReportTable from './SecurityReportTable';
import {
  Data,
  getSecurityDetails,
  SecurityDetailsResponse,
} from 'src/resources/TagResource';
import {SecurityReportChart} from './SecurityReportChart';

export default function SecurityReport(props: SecurityReportProps) {
  const [data, setData] = useState<Data>(null);
  useEffect(() => {
    (async () => {
      try {
        const securityDetails: SecurityDetailsResponse =
          await getSecurityDetails(props.org, props.repo, props.digest);
        setData(securityDetails.data);
      } catch (error) {
        console.log('Unable to get security details: ', error);
      }
    })();
  }, []);

  if (data) {
    return (
      <>
        <SecurityReportChart features={data.Layer.Features} />
        <hr />
        <SecurityReportTable features={data.Layer.Features} />
      </>
    );
  }

  return <div>Loading</div>;
}

type SecurityReportProps = {
  org: string;
  repo: string;
  digest: string;
};
