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
