import React, {useEffect} from 'react';
import {Page} from '@patternfly/react-core';

import {Outlet, Route, Routes} from 'react-router-dom';

import Builds from 'src/routes/Builds/Builds';
import Repositories from 'src/routes/Organizations/Repositories/Repositories';
import Repository from 'src/routes/Organizations/Repository/Repository';
import Administration from 'src/routes/Admin/Administration';
import Organizations from 'src/routes/Organizations/Organizations';
import TeamMembershipTab from 'src/routes/Organizations/Repositories/Tabs/TeamMembershipTab';
import {QuayHeader} from 'src/components/header/QuayHeader';
import {QuaySidebar} from 'src/components/sidebar/QuaySidebar';
import {getUser} from 'src/resources/UserResource';
import {useRecoilState} from 'recoil';
import {UserState} from 'src/atoms/UserState';
import SecurityDetails from './Organizations/Repository/Tabs/Tags/SecurityDetails';

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
        <Route path={'/organizations'} element={<Organizations />} />
        <Route
          path={'/organizations/:organizationName/*'}
          element={<Repository />}
        />
        <Route path={'/builds'} element={<Builds />} />
        <Route path={'/administration'} element={<Administration />} />
        <Route
          path={'/organizations/:repoName/team'}
          element={<TeamMembershipTab />}
        />
        <Route
          path={'/security_details'}
          element={
            <SecurityDetails org={'blue'} repo={'quay'} digest={'test'} />
          }
        />
      </Routes>
      <Outlet />
    </Page>
  );
}
