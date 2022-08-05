import SecurityReportTable from './SecurityReportTable';
import {SecurityReportChart} from './SecurityReportChart';
import {useRecoilState} from 'recoil';
import {SecurityDetailsState} from 'src/atoms/SecurityDetailsState';

export default function SecurityReport(props: SecurityReportProps) {
  const [data, setData] = useRecoilState(SecurityDetailsState);

  // Set features to a default of null to distinuish between a completed API call and one that is in progress
  let features = null;

  if (data) {
    features = data.data.Layer.Features;
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
