import {AxiosError} from 'axios';

export function addDisplayError(message: string, error: Error | AxiosError) {
  // Add user friendly description of error
  return message + ', ' + error.message + '.';
}

export function assertHttpCode(got: number, expected: number) {
  if (expected !== got) {
    throw new Error(`Unexpected HTTP status code: ${got}`);
  }
}

export function isErrorString(err: string) {
  return typeof err === 'string' && err.length > 0;
}
