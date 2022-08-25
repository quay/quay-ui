import {Page} from '@patternfly/react-core';

import {Navigate, Outlet, Route, Routes} from 'react-router-dom';

import {QuayHeader} from 'src/components/header/QuayHeader';
import {QuaySidebar} from 'src/components/sidebar/QuaySidebar';
import {NavigationPath} from './NavigationPath';
import OrganizationsList from './OrganizationsList/OrganizationsList';
import Organization from './OrganizationsList/Organization/Organization';
import RepositoryDetails from 'src/routes/RepositoryDetails/RepositoryDetails';
import RepositoriesList from './RepositoriesList/RepositoriesList';
import TagDetails from 'src/routes/TagDetails/TagDetails';
import {useEffect, useState} from 'react';
import {getUser} from 'src/resources/UserResource';
import {useSetRecoilState} from 'recoil';
import {CurrentUsernameState} from 'src/atoms/UserState';
import {isErrorString} from 'src/resources/ErrorHandling';
import ErrorBoundary from 'src/components/errors/ErrorBoundary';
import PageLoadError from 'src/components/errors/PageLoadError';
import {useQuayConfig} from 'src/hooks/UseQuayConfig';

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
  const setCurrentUsername = useSetRecoilState(CurrentUsernameState);
  const [err, setErr] = useState<string>();
  const quayConfig = useQuayConfig();

  useEffect(() => {
    (async () => {
      if (quayConfig?.config?.REGISTRY_TITLE) {
        document.title = quayConfig.config.REGISTRY_TITLE;
      }

      try {
        const user = await getUser();
        setCurrentUsername(user.username);
      } catch (err) {
        console.error(err);
        setErr('Unable to load page');
      }
    })();
  }, []);
  return (
    <ErrorBoundary hasError={isErrorString(err)} fallback={<PageLoadError />}>
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
    </ErrorBoundary>
  );
}
