const testConfig = {
  AUTHENTICATION_TYPE: 'Database',
};

export function fetchQuayConfig() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(testConfig), 5000);
  });
}
