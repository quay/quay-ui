import OrganizationsList from 'src/routes/OrganizationsList/OrganizationsList';
import Organization from './OrganizationsList/Organization/Organization';
import RepositoryDetails from 'src/routes/RepositoryDetails/RepositoryDetails';
import RepositoriesList from './RepositoriesList/RepositoriesList';
import TagDetails from 'src/routes/TagDetails/TagDetails';

const organizationNameBreadcrumb = (match) => {
  return <span>{match.params.organizationName}</span>;
};

const repositoryNameBreadcrumb = (match) => {
  return <span>{match.params.repositoryName}</span>;
};

const tagNameBreadcrumb = (match) => {
  return <span>{match.params.tagName}</span>;
};

const Breadcrumb = {
  organizationsListBreadcrumb: 'Organizations',
  repositoriesListBreadcrumb: 'Repositories',
  organizationDetailBreadcrumb: organizationNameBreadcrumb,
  repositoryDetailBreadcrumb: repositoryNameBreadcrumb,
  tagDetailBreadcrumb: tagNameBreadcrumb,
};

export enum NavigationPath {
  // Side Nav
  home = '/',
  organizationsList = '/organizations',

  repositoriesList = '/repositories',

  // Organization detail
  organizationDetail = '/organizations/:organizationName',

  // Repository detail
  repositoryDetail = '/repositories/:organizationName/:repositoryName',

  // Tag Detail
  tagDetail = '/repositories/:organizationName/:repositoryName/:tagName',
}

export function getRepoDetailPath(org: string, repo: string) {
  let repoPath = NavigationPath.repositoryDetail.toString();
  repoPath = repoPath.replace(':organizationName', org);
  repoPath = repoPath.replace(':repositoryName', repo);
  return repoPath;
}

export function getTagDetailPath(
  org: string,
  repo: string,
  tag: string,
  queryParams: Map<string, string> = null,
) {
  let tagPath = NavigationPath.tagDetail.toString();
  tagPath = tagPath.replace(':organizationName', org);
  tagPath = tagPath.replace(':repositoryName', repo);
  tagPath = tagPath.replace(':tagName', tag);
  if (queryParams) {
    const params = [];
    for (const entry of Array.from(queryParams.entries())) {
      params.push(entry[0] + '=' + entry[1]);
    }
    tagPath = tagPath + '?' + params.join('&');
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
    breadcrumb: 'organizations',
  },
  {
    path: NavigationPath.organizationDetail,
    Component: <Organization />,
    breadcrumb: Breadcrumb.organizationDetailBreadcrumb,
  },
  {
    path: NavigationPath.repositoriesList,
    Component: <RepositoriesList />,
    breadcrumb: Breadcrumb.repositoriesListBreadcrumb,
  },
  {
    path: NavigationPath.repositoryDetail,
    Component: <RepositoryDetails />,
    breadcrumb: Breadcrumb.repositoryDetailBreadcrumb,
  },
  {
    path: NavigationPath.tagDetail,
    Component: <TagDetails />,
    breadcrumb: Breadcrumb.tagDetailBreadcrumb,
  },
];
export {NavigationRoutes};
