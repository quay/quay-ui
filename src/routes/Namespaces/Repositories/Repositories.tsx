import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Page,
  PageSection,
  PageSectionVariants,
} from "@patternfly/react-core";
import { useLocation } from "react-router-dom";

// import {
//   HorizontalNav,
// } from '@openshift-console/dynamic-plugin-sdk';
// import RepositoriesTab from "./Tabs/RepositoriesTab";
// import { NavigationPath } from "../../NavigationPath";
// import TeamMembershipTab from "./Tabs/TeamMembershipTab";
// import RobotAccountTab from "./Tabs/RobotAccountTab";
// import DefaultPermissionsTab from "./Tabs/DefaultPermissionsTab";
// import UsageLogsTab from "./Tabs/UsageLogs";

export default function Repositories() {
  
  const location = useLocation();
  const namespaceName = location.pathname.split("/");
  console.log("namespaceName", namespaceName);

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
          <BreadcrumbItem to="#">Repositories</BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      <PageSection>
        <PageSection variant={PageSectionVariants.light}></PageSection>
      </PageSection>
      {/* <HorizontalNav pages={pages} /> */}
    </Page>
  );
}
