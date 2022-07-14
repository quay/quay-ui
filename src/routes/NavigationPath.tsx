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

  // Tag Detail
  tagDetail = '/organizations/:organizationName/:repoName/:tagName',
}

export function getTagDetailPath(
  org: string,
  repo: string,
  tag: string,
  arch = null,
) {
  let tagPath = NavigationPath.tagDetail.toString();
  tagPath = tagPath.replace(':organizationName', org);
  tagPath = tagPath.replace(':repoName', repo);
  tagPath = tagPath.replace(':tagName', tag);
  if (arch) {
    tagPath = tagPath + `?arch=${arch}`;
  }
  return tagPath;
}

export function getDomain() {
  return process.env.REACT_APP_QUAY_DOMAIN || 'quay.io';
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
