import React from 'react';
import { useQuayConfig } from '../hooks/QuayConfig';

export function Main() {
  const config = useQuayConfig();

  if (!config) {
    return (
      <div> Loading ... </div>
    );
  }

  return (
    <div> Main landing page </div>
  );
}
