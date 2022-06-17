export enum NavigationPath {
  // Side Nav
  home = '/',
  organizationsList = '/organizations',
  repositoriesList = '/repositories',

  // Organization detail
  organizationDetail = '/organizations/:organizationName',
  repositoryListForOrg = '/organizations/:organizationName/repotab',
  tagListForRepository = '/organizations/:organizationName/:repositoryName',

  // Repository detail
  repositoryDetail = '/repositories/:repositoryName',
  usagelogs = '/organizations/:reponame/logs',
  settings = '/organizations/:reponame/settings',
}
