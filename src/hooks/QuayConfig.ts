import {useRecoilState} from 'recoil';
import {useEffect} from 'react';
import {QuayConfigState} from 'src/atoms/QuayConfigState';
import {fetchQuayConfig} from 'src/resources/QuayConfig';

export function useQuayConfig() {
  const [quayConfig, setQuayConfig] = useRecoilState<any | null>(
    QuayConfigState,
  );

  useEffect(() => {
    fetchQuayConfig().then((config: any) => {
      setQuayConfig(config);
    });
  }, [setQuayConfig]);
  return quayConfig;
}
