import {
  Data,
  getSecurityDetails,
  SecurityDetailsResponse,
} from 'src/resources/TagResource';
import {PackagesChart} from './PackagesChart';
import {useEffect, useState} from 'react';
import PackagesTable from './PackagesTable';

export function Packages(props: PackagesProps) {
  const [data, setData] = useState<Data>(null);

  useEffect(() => {
    (async () => {
      try {
        const securityDetails: SecurityDetailsResponse =
          await getSecurityDetails(props.org, props.repo, props.digest);
        setData(securityDetails.data);
      } catch (error) {
        console.error('Unable to get security details: ', error);
      }
    })();
  }, []);

  if (data) {
    return (
      <>
        <PackagesChart features={data.Layer.Features} />
        <hr />
        <PackagesTable features={data.Layer.Features} />
      </>
    );
  }

  return <div>Loading</div>;
}

interface PackagesProps {
  org: string;
  repo: string;
  digest: string;
}
