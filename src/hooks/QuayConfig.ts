import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { QuayConfigState } from '../atoms/QuayConfigState';
import { fetchQuayConfig } from '../resources/QuayConfig';

export function useQuayConfig() {
  const [quayConfig, setQuayConfig] = useRecoilState<any | null>(QuayConfigState);

  useEffect(() => {
    fetchQuayConfig().then((config: any) => {
      setQuayConfig(config);
    });
  }, [setQuayConfig]);
  return quayConfig;
}
