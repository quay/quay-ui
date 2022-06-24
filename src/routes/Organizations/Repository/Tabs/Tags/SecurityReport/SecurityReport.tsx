import React, {useEffect, useState} from 'react';
import SecurityReportTable from './SecurityReportTable';
import {
  Data,
  getSecurityDetails,
  SecurityDetailsResponse,
} from 'src/resources/TagResource';
import {SecurityReportChart} from './SecurityReportChart';

export function SecurityReport() {
  const [data, setData] = useState<Data>(null);

  useEffect(() => {
    (async () => {
      try {
        const securityDetails: SecurityDetailsResponse =
          await getSecurityDetails('testorg', 'testrepo', 'testdigest');
        setData(securityDetails.data);
      } catch (error: any) {
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
