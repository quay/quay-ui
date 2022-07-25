import {useEffect} from 'react';
import {Page} from '@patternfly/react-core';

import {Navigate, Outlet, Route, Routes} from 'react-router-dom';

import {QuayHeader} from 'src/components/header/QuayHeader';
import {QuaySidebar} from 'src/components/sidebar/QuaySidebar';
import {getUser} from 'src/resources/UserResource';
import {useRecoilState} from 'recoil';
import {UserState} from 'src/atoms/UserState';
import {NavigationPath} from './NavigationPath';
import OrganizationsList from './OrganizationsList/OrganizationsList';
import Organization from './OrganizationsList/Organization/Organization';
import RepositoryDetails from 'src/routes/RepositoryDetails/RepositoryDetails';
import RepositoriesList from './RepositoriesList/RepositoriesList';
import TagDetails from 'src/routes/TagDetails/TagDetails';

const NavigationRoutes = [
  {
    path: NavigationPath.organizationsList,
    Component: <OrganizationsList />,
  },
  {
    path: NavigationPath.organizationDetail,
    Component: <Organization />,
  },
  {
    path: NavigationPath.repositoriesList,
    Component: <RepositoriesList />,
  },
  {
    path: NavigationPath.repositoryDetail,
    Component: <RepositoryDetails />,
  },
  {
    path: NavigationPath.tagDetail,
    Component: <TagDetails />,
  },
];

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
        <Route index element={<Navigate to="/organizations" replace />} />
        {NavigationRoutes.map(({path, Component}, key) => (
          <Route path={path} key={key} element={Component} />
        ))}
      </Routes>
      <Outlet />
    </Page>
  );
}
