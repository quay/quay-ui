import {useRecoilState} from 'recoil';
import {useEffect} from 'react';
import {QuayConfigState} from 'src/atoms/QuayConfigState';
import {fetchQuayConfig} from 'src/resources/QuayConfig';

export function useQuayConfig() {
  const [quayConfig, setQuayConfig] = useRecoilState<any | null>(
    QuayConfigState,
  );

  useEffect(() => {
    (async () => {
      // NOTE: Making the decision that loading the Quay configuration
      // is not required. If the load fails the app will continue running.
      // Components using this hook should check for null values. This
      // behavior may change in the future.
      try {
        const config = await fetchQuayConfig();
        setQuayConfig(config);
        console.log(config);
      } catch (err) {
        console.error('Unable to load Quay config:', err);
      }
    })();
  }, []);
  return quayConfig;
}
