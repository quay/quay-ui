import {mock} from './MockAxios';

import './data/login/login';
import './data/user/user';
import './data/repository/security';
import './data/repository/repository';
import './data/tag/tag';
import './data/tag/manifest';

mock.onAny().passThrough();
