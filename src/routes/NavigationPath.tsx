import OrganizationsList from 'src/routes/OrganizationsList/OrganizationsList';
import Organization from './OrganizationsList/Organization/Organization';
import TagsList from 'src/components/shared/Repository/TagsList';
import RepositoriesList from './RepositoriesList/RepositoriesList';

export enum NavigationPath {
  // Side Nav
  home = '/',
  organizationsList = '/organizations',
  repositoriesList = '/repositories',

  // Organization detail
  organizationDetail = '/organizations/:organizationName',
  orgDetailRepositoryTab = '/organizations/:organizationName/repotab',
  orgDetailUsageLogsTab = '/organizations/:reponame/logs',
  repositoryDetailForOrg = '/organizations/:organizationName/:repositoryName',

  // Repository detail
  repositoryDetail = '/repositories/:repositoryName',
  settings = '/organizations/:reponame/settings',
}

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
    path: NavigationPath.repositoryDetail,
    Component: <TagsList />,
  },
  {
    path: NavigationPath.repositoryDetailForOrg,
    Component: <TagsList />,
  },
  {
    path: NavigationPath.repositoriesList,
    Component: <RepositoriesList />,
  },
];
export {NavigationRoutes};
