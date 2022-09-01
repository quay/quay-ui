import {PackagesChart} from './PackagesChart';
import PackagesTable from './PackagesTable';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  SecurityDetailsErrorState,
  SecurityDetailsState,
} from 'src/atoms/SecurityDetailsState';
import {isErrorString} from 'src/resources/ErrorHandling';
import RequestError from 'src/components/errors/RequestError';

export function Packages() {
  const data = useRecoilValue(SecurityDetailsState);
  const error = useRecoilValue(SecurityDetailsErrorState);

  if (isErrorString(error)) {
    return <RequestError message={error} />;
  }

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
