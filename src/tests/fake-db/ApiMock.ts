import {mock} from './MockAxios';

import './data/login/login';
import './data/user/user';
import './data/repository/security';
import './data/repository/repository';
import './data/tag/tag';
import './data/tag/labels';
import './data/tag/manifest';
import './data/config/config';
import './data/config/logo';

mock.onAny().passThrough();
