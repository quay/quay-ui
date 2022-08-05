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
      const config = await fetchQuayConfig();
      setQuayConfig(config);
      console.log(config);
    })();
  }, []);
  return quayConfig;
}
