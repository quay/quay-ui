export enum NavigationPath {
  // Side NAV
  home = '/',
  organizations = '/organizations',
  repositories = '/repositories',

  // Scoped Repositories Sub Nav
  orgScopedRepository = '/organizations/:organizationName',
  orgScopedRepositoryTab = '/organizations/:organizationName/repo',
  usagelogs = '/organizations/:reponame/logs',
  settings = '/organizations/:reponame/settings',
}
