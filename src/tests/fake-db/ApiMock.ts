import {mock} from './MockAxios';

import './data/login/login';
import './data/user/user';
import './data/repository/security';

mock.onAny().passThrough();
