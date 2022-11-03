import SecurityReportTable from './SecurityReportTable';
import {SecurityReportChart} from './SecurityReportChart';
import {useRecoilValue} from 'recoil';
import {
  SecurityDetailsErrorState,
  SecurityDetailsState,
} from 'src/atoms/SecurityDetailsState';
import {isErrorString} from 'src/resources/ErrorHandling';
import RequestError from 'src/components/errors/RequestError';

export default function SecurityReport() {
  const data = useRecoilValue(SecurityDetailsState);
  const error = useRecoilValue(SecurityDetailsErrorState);

  if (isErrorString(error)) {
    return <RequestError message={error} />;
  }

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
