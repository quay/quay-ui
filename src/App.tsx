import {
  Button,
  Nav,
  NavItem,
  NavList,
  Page,
  PageHeader,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem,
  PageSidebar,
  Title,
} from "@patternfly/react-core";
import { lazy } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import QuayIcon from "./assets/QuayIcon";
import Builds from "./routes/Builds/Builds";
import Namespaces from "./routes/Namespaces/Namespaces";
import { NavigationPath } from "./routes/NavigationPath";
import Search from "./routes/Search/Search";
import { RedhatIcon } from "@patternfly/react-icons";
import Repositories from "./routes/Namespaces/Repositories/Repositories";
import Administration from "./routes/Admin/Administration";
import * as React from "react";
import LoginPage from "./routes/Login/LoginPage";

const NamespacesPage = lazy(() => import("./routes/Namespaces/Namespaces"));

function App() {
  const routes: SideNavProps[] = [
    {
      isSideNav: false,
      navPath: NavigationPath.home,
      title: "Login Page",
      component: <LoginPage />,
    },
    {
      isSideNav: true,
      navPath: NavigationPath.search,
      title: "Search",
      component: <Search />,
    },
    {
      isSideNav: true,
      navPath: NavigationPath.namespace,
      title: "Namespaces",
      component: <NamespacesPage />,
    },
    {
      isSideNav: true,
      navPath: NavigationPath.builds,
      title: "Builds",
      component: <Builds />,
    },
    {
      isSideNav: true,
      navPath: NavigationPath.administration,
      title: "Administration",
      component: <Administration />,
    },
    {
      isSideNav: false,
      navPath: NavigationPath.repositories,
      title: "Repositories",
      component: <Repositories />,
    },
  ];

  return (
    <Page
      header={<AppHeader />}
      sidebar={<AppSidebar routes={routes} />}
      style={{ height: "100vh" }}
      isManagedSidebar
      defaultManagedSidebarIsOpen={true}
    >
      <Routes>
        <Route path={"/"} element={<Namespaces />} />

        {routes.map((route, idx) => {
          console.log("nav:", route.navPath);
          <Route key={idx} path={route.navPath} element={route.component} />;
          // <Route key={idx} path="/search" element={NamespacesPage} />;
        })}
      </Routes>
    </Page>
  );
}

function AppHeader() {
  const headerTools = (
    <PageHeaderTools>
      <PageHeaderToolsGroup
        visibility={{
          default: "hidden",
          lg: "visible",
        }}
      >
        <PageHeaderToolsItem>
          <Button
            aria-label="create-button"
            onClick={() => {}}
            variant="link"
            icon={<i className="fas fa-bell"></i>}
          />
          <Button
            aria-label="create-button"
            onClick={() => {}}
            variant="link"
            icon={<i className="fas pf-icon-add-circle-o"></i>}
          />
        </PageHeaderToolsItem>
      </PageHeaderToolsGroup>
    </PageHeaderTools>
  );
  return (
    <PageHeader
      logo={
        <div style={{ display: "flex", gap: 8, alignItems: "start" }}>
          <RedhatIcon size="lg" style={{ color: "#EE0000", marginTop: 20 }} />
          <div style={{ color: "white" }}>
            <Title
              headingLevel="h4"
              style={{ fontWeight: "bold", paddingTop: 25 }}
            >
              Red Hat
            </Title>
          </div>
          <br />
          <QuayIcon />
        </div>
      }
      logoProps={{ style: { textDecoration: "none", cursor: "default" } }}
      headerTools={headerTools}
      showNavToggle
      isNavOpen={true}
    />
  );
}

function AppSidebar(props: { routes: SideNavProps[] }) {
  const { routes } = props;

  const location = useLocation();

  return (
    <PageSidebar
      nav={
        <Nav>
          <NavList>
            {routes.map((route) =>
              route.isSideNav ? (
                <NavItem
                  key={route.navPath}
                  isActive={location.pathname === route.navPath}
                >
                  <Link to={route.navPath}>{route.title}</Link>
                </NavItem>
              ) : null
            )}
          </NavList>
        </Nav>
      }
    />
  );
}

type SideNavProps = {
  isSideNav: boolean;
  navPath: NavigationPath;
  title: string;
  component: JSX.Element | any;
};

export default App;
