import {PackagesChart} from './PackagesChart';
import PackagesTable from './PackagesTable';
import {useRecoilState} from 'recoil';
import {SecurityDetailsState} from 'src/atoms/SecurityDetailsState';

export function Packages(props: PackagesProps) {
  const [data, setData] = useRecoilState(SecurityDetailsState);

  // Set features to a default of null to distinguish between a completed API call and one that is in progress
  let features = null;

  if (data) {
    features = data.data.Layer.Features;
  }

  return (
    <>
      <PackagesChart features={features} />
      <hr />
      <PackagesTable features={features} />
    </>
  );
}

interface PackagesProps {
  org: string;
  repo: string;
  digest: string;
}
