import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Nav,
  NavItem,
  NavList,
  Page,
  PageSection,
  PageSectionTypes,
  PageSectionVariants,
  Title,
} from "@patternfly/react-core";
import { Link, useLocation, useParams } from "react-router-dom";

// import {
//   HorizontalNav,
// } from '@openshift-console/dynamic-plugin-sdk';
import RepositoriesTab from "./Tabs/RepositoriesTab/RepositoriesTab";
import { NavigationPath } from "../../NavigationPath";
// import TeamMembershipTab from "./Tabs/TeamMembershipTab";
// import RobotAccountTab from "./Tabs/RobotAccountTab";
// import DefaultPermissionsTab from "./Tabs/DefaultPermissionsTab";
// import UsageLogsTab from "./Tabs/UsageLogs";

export default function Repositories(props) {
  const location = useLocation();
  const repositoryName = location.pathname.split("/")[2];
  const [activeSubNavItem, setAativeSubNavItem] = React.useState(0);
  const { repoName } = useParams();

  console.log("repositoryName", repositoryName);

  const onSubNavSelect = (result) => {
    setAativeSubNavItem(result.itemId);
  };

  const RepositorySubNav = (
    <Nav
      onSelect={onSubNavSelect}
      aria-label="Nav"
      variant="horizontal"
      theme="light"
    >
      <NavList>
        <NavItem
          isActive={location.pathname.startsWith(
            NavigationPath.repositoriesTab
          )}
          to="#"
        >
          <Link to={`/namespaces/${repoName}`}>Repositories</Link>
        </NavItem>
        <NavItem
          isActive={location.pathname.startsWith(
            NavigationPath.teamMembershipTab
          )}
        >
          <Link to={`/namespaces/${repoName}/team`}> Team & Membership </Link>
          
        </NavItem>
        <NavItem
          isActive={location.pathname.startsWith(
            NavigationPath.robotAccountTab
          )}
          to="#"
        >
          Robot Accounts
        </NavItem>
        <NavItem
          isActive={location.pathname.startsWith(
            NavigationPath.defaultPermissionsTab
          )}
          to="#"
        >
          Default Permissions
        </NavItem>
        <NavItem
          isActive={location.pathname.startsWith(NavigationPath.usagelogs)}
          to="#"
        >
          Usage Logs
        </NavItem>
        <NavItem
          isActive={location.pathname.startsWith(NavigationPath.oauth)}
          to="#"
        >
          OAuth Applications
        </NavItem>
        <NavItem
          isActive={location.pathname.startsWith(NavigationPath.settings)}
          to="#"
        >
          Settings
        </NavItem>
      </NavList>
    </Nav>
  );

  // const pages = [
  //   {
  //     href: NavigationPath.repositoriesTab,
  //     name: "Repositories",
  //     component: () => <RepositoriesTab />,
  //   },
  //   {
  //     href: NavigationPath.teamMembershipTab,
  //     name: "Team & Membership",
  //     component: () => <TeamMembershipTab />,
  //   },
  //   {
  //     href: NavigationPath.teamMembershipTab,
  //     name: "Robot Accounts",
  //     component: () => <RobotAccountTab />,
  //   },
  //   {
  //     href: NavigationPath.defaultPermissionsTab,
  //     name: "Default Permissions",
  //     component: () => <DefaultPermissionsTab />,
  //   },
  //   {
  //     href: NavigationPath.usagelogs,
  //     name: "Usage Logs",
  //     component: () => <UsageLogsTab />,
  //   },
  // ];

  return (
    <Page>
      <PageSection variant={PageSectionVariants.light} hasShadowBottom>
        <Breadcrumb>
          <BreadcrumbItem to="/namespaces">Namespace</BreadcrumbItem>
          <BreadcrumbItem to="#">{repositoryName}</BreadcrumbItem>
        </Breadcrumb>
        <PageSection variant={PageSectionVariants.light}>
          <Title headingLevel="h1">{repositoryName}</Title>
        </PageSection>
        <PageSection type={PageSectionTypes.subNav} isWidthLimited>
          {RepositorySubNav}
        </PageSection>
         <RepositoriesTab/>
      </PageSection>
      {/* <HorizontalNav pages={pages} /> */}
    </Page>
  );
}
