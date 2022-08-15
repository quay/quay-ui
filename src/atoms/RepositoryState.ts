import {atom} from 'recoil';

export const selectedReposState = atom({
  key: 'selectedReposState',
  default: [],
});

export const filterRepoState = atom({
  key: 'filterRepoState',
  default: '',
});
