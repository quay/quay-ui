import {useEffect} from 'react';
import {Page} from '@patternfly/react-core';

import {Outlet, Route, Routes} from 'react-router-dom';

import OrganizationsList from 'src/routes/OrganizationsList/OrganizationsList';
import {QuayHeader} from 'src/components/header/QuayHeader';
import {QuaySidebar} from 'src/components/sidebar/QuaySidebar';
import {getUser} from 'src/resources/UserResource';
import {useRecoilState} from 'recoil';
import {UserState} from 'src/atoms/UserState';
import {SecurityReport} from 'src/components/shared/Repository/Tabs/Tags/SecurityReport/SecurityReport';
import Organization from './OrganizationsList/Organization/Organization';
import {NavigationPath} from './NavigationPath';
import RepositoriesList from './RepositoriesList/RepositoriesList';
import TagsList from '../components/shared/Repository/TagsList';
import TagDetails from './TagDetails/TagDetails';

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
        <Route
          path={NavigationPath.organizationsList}
          element={<OrganizationsList />}
        >
          {/* <Route path=':reponame' element={<OrgScopedRepositories />} /> */}
        </Route>
        <Route
          path={NavigationPath.organizationDetail}
          element={<Organization />}
        />
        <Route path={NavigationPath.repositoryDetail} element={<TagsList />} />
        <Route path={NavigationPath.tagDetail} element={<TagDetails />} />

        <Route
          path={NavigationPath.repositoryDetailForOrg}
          element={<TagsList />}
        />
        <Route
          path={NavigationPath.repositoriesList}
          element={<RepositoriesList />}
        />
        <Route path={'/security_details'} element={<SecurityReport />} />
      </Routes>
      <Outlet />
    </Page>
  );
}
