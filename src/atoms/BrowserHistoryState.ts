import {atom} from 'recoil';

export const BrowserHistoryState = atom({
  key: 'browserHistoryState',
  default: new Set(),
});
