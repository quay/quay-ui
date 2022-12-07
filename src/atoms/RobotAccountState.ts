import {atom} from 'recoil';
import {SearchState} from '../components/toolbar/SearchTypes';
import {RobotAccountColumnNames} from 'src/routes/RepositoriesList/ColumnNames';

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

export const selectedTeamsState = atom({
  key: 'selectedTeamsState',
  default: [],
});

export const searchTeamState = atom<SearchState>({
  key: 'searchTeamState',
  default: {
    query: '',
    field: 'name',
  },
});
