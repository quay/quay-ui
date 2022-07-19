import {useEffect, useState} from 'react';
import {
  getLabels,
  LabelsResponse,
  Label as ImageLabel,
} from 'src/resources/TagResource';
import {Label} from '@patternfly/react-core';

export default function Labels(props: LabelsProps) {
  const [labels, setLabels] = useState<ImageLabel[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const labelsResp: LabelsResponse = await getLabels(
          props.org,
          props.repo,
          props.digest,
        );
        setLabels(labelsResp.labels);
      } catch (error: any) {
        console.log('Unable to get labels: ', error);
      }
    })();
  }, []);

  return (
    <>
      {labels.map((label: ImageLabel) => (
        <Label key={label.key}>
          {label.key} = {label.value}
        </Label>
      ))}
    </>
  );
}

type LabelsProps = {
  org: string;
  repo: string;
  digest: string;
};
