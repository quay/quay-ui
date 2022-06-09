import {useEffect} from 'react';
import {Page} from '@patternfly/react-core';

import {Outlet, Route, Routes} from 'react-router-dom';

import Organizations from 'src/routes/Organizations/Organizations';
import {QuayHeader} from 'src/components/header/QuayHeader';
import {QuaySidebar} from 'src/components/sidebar/QuaySidebar';
import {getUser} from 'src/resources/UserResource';
import {useRecoilState} from 'recoil';
import {UserState} from 'src/atoms/UserState';
import OrgScopedRepositories from './Organizations/OrgScopedRepositories/OrgScopedRepositories';
import Repositories from './Repositories/Repositories';
import Repository from 'src/routes/Organizations/Repository/Repository';
import {NavigationPath} from './NavigationPath';

export function StandaloneMain() {
  const [, setUserState] = useRecoilState(UserState);

  useEffect(() => {
    getUser().then((user) => setUserState(user));
  }, []);

  return (
    <Page
      header={<QuayHeader />}
      sidebar={<QuaySidebar />}
      style={{height: '100vh'}}
      isManagedSidebar
      defaultManagedSidebarIsOpen={true}
    >
      <Routes>
        <Route path={NavigationPath.organizations} element={<Organizations />}>
          {/* <Route path=':reponame' element={<OrgScopedRepositories />} /> */}
        </Route>
        <Route
          path={NavigationPath.orgScopedRepository}
          element={<OrgScopedRepositories />}
        />
        <Route path={NavigationPath.repositories} element={<Repositories />} />
      </Routes>
      <Outlet />
    </Page>
  );
}
