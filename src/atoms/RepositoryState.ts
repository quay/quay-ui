import {atom, selector} from 'recoil';

export const repositoryListState = atom({
  key: 'RepositoryList',
  default: [],
});
