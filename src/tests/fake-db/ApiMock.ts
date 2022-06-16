import {mock} from './MockAxios';

import './data/login/login';
import './data/user/user';

mock.onAny().passThrough();
