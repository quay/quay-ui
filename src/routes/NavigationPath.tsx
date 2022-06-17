export enum NavigationPath {
  // Side NAV
  home = '/',
  organizations = '/organizations',
  builds = '/builds',
  administration = '/administration',

  // Repositories Nav
  repositories = '/organizations/:organizationName',
  repositoriesTab = '/organizations/:reponame/repo',
  teamMembershipTab = '/organizations/:reponame/team',
  robotAccountTab = '/organizations/:reponame/robotacct',
  defaultPermissionsTab = '/organizations/:reponame/permissions',
  oauth = '/organizations/:reponame/oauth',
  usagelogs = '/organizations/:reponame/logs',
  settings = '/organizations/:reponame/settings',
}
