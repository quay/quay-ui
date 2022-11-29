import {atom} from 'recoil';
import {SearchState} from '../components/toolbar/SearchTypes';
import {RobotAccountColumnNames} from '../routes/RepositoriesList/ColumnNames';

export const selectedRobotAccountsState = atom({
  key: 'selectedRobotAccountsState',
  default: [],
});

export const searchRobotAccountState = atom<SearchState>({
  key: 'searchRobotAccountState',
  default: {
    query: '',
    field: RobotAccountColumnNames.robotAccountName,
  },
});
