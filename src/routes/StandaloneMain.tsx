import {useEffect} from 'react';
import {Page} from '@patternfly/react-core';

import {Outlet, Route, Routes} from 'react-router-dom';

import {QuayHeader} from 'src/components/header/QuayHeader';
import {QuaySidebar} from 'src/components/sidebar/QuaySidebar';
import {getUser} from 'src/resources/UserResource';
import {useRecoilState} from 'recoil';
import {UserState} from 'src/atoms/UserState';
import {NavigationRoutes} from './NavigationPath';
import OrganizationsList from './OrganizationsList/OrganizationsList';

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
        <Route index element={<OrganizationsList />} />
        {NavigationRoutes.map(({path, Component}, key) => (
          <Route path={path} key={key} element={Component} />
        ))}
      </Routes>
      <Outlet />
    </Page>
  );
}
