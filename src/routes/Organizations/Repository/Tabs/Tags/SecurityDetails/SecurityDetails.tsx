import React, {useEffect, useState} from 'react';
import SecurityDetailsTable from './SecurityDetailsTable';
import {
  Data,
  getSecurityDetails,
  SecurityDetailsResponse,
} from 'src/resources/TagResource';
import {SecurityDetailsChart} from './SecurityDetailsChart';

export function SecurityDetails() {
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

  return (
    <>
      {data ? (
        <>
          <SecurityDetailsChart features={data.Layer.Features} />
          <hr />
          <SecurityDetailsTable features={data.Layer.Features} />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
