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
