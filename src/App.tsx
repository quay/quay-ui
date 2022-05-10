import {
  Avatar,
  Button,
  ButtonVariant,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownToggle,
  KebabToggle,
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
// import { lazy } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import CogIcon from "@patternfly/react-icons/dist/esm/icons/cog-icon";
import HelpIcon from "@patternfly/react-icons/dist/esm/icons/help-icon";
import QuestionCircleIcon from "@patternfly/react-icons/dist/esm/icons/question-circle-icon";
import imgBrand from "@patternfly/react-core/src/components/Brand/examples/pfLogo.svg";
import imgAvatar from "@patternfly/react-core/src/components/Avatar/examples/avatarImg.svg";
import QuayIcon from "./assets/QuayIcon";
import Builds from "./routes/Builds/Builds";
import { NavigationPath } from "./routes/NavigationPath";
import Search from "./routes/Search/Search";
import { RedhatIcon } from "@patternfly/react-icons";
import Repositories from "./routes/Namespaces/Repositories/Repositories";
import Administration from "./routes/Admin/Administration";
import * as React from "react";
import LoginPage from "./routes/Login/LoginPage";
import Namespaces from "./routes/Namespaces/Namespaces";
import RepositoriesTab from "./routes/Namespaces/Repositories/Tabs/RepositoriesTab/RepositoriesTab";
import TeamMembershipTab from "./routes/Namespaces/Repositories/Tabs/TeamMembershipTab";

// const NamespacesPage = lazy(() => import("./routes/Namespaces/Namespaces"));

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
      component: <Namespaces />,
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
    // {
    //   isSideNav: false,
    //   navPath: NavigationPath.repositories,
    //   title: "Repositories",
    //   component: <Repositories />,
    // },
  ];

  return (
    <BrowserRouter>
      <Page
        header={<AppHeader />}
        sidebar={<AppSidebar routes={routes} />}
        style={{ height: "100vh" }}
        isManagedSidebar
        defaultManagedSidebarIsOpen={true}
      >
        <Routes>
          <Route path={"namespaces"} element={<Namespaces />} />
          <Route path={"namespaces/:repoName"} element={<Repositories />} />
          <Route path={"search"} element={<Search />} />
          <Route path={"builds"} element={<Builds />} />
          <Route path={"administration"} element={<Administration />} />
          <Route path={"namespaces/:repoName/team"} element={<TeamMembershipTab />} />

          {/* {routes.map((route, idx) => {
          console.log("nav:", route.navPath);
          <Route key={idx} path={route.navPath} element={route.component} />;
        })} */}
        </Routes>
      </Page>
    </BrowserRouter>
  );
}

function AppHeader() {
  const [isUserDropDownOpen, setIsUserDropDownOpen] = React.useState(false);

  const userDropdownItems = [
    <DropdownGroup key="group 2">
      <DropdownItem key="group 2 profile">My profile</DropdownItem>
      <DropdownItem key="group 2 user" component="button">
        User management
      </DropdownItem>
      <DropdownItem key="group 2 logout">Logout</DropdownItem>
    </DropdownGroup>,
  ];

  const headerTools = (
    <PageHeaderTools>
      <PageHeaderToolsGroup
        visibility={{
          default: "hidden",
          lg: "visible",
        }}
      >
        <PageHeaderToolsItem>
          <Button aria-label="Settings actions" variant={ButtonVariant.plain}>
            <CogIcon />
          </Button>
        </PageHeaderToolsItem>
        <PageHeaderToolsItem>
          <Button aria-label="Help actions" variant={ButtonVariant.plain}>
            <QuestionCircleIcon />
          </Button>
        </PageHeaderToolsItem>
      </PageHeaderToolsGroup>
      <PageHeaderToolsGroup>
        <PageHeaderToolsItem
          visibility={{
            default: "hidden",
            md: "visible",
          }} /** this user dropdown is hidden on mobile sizes */
        >
          <Dropdown
            isPlain
            position="right"
            onSelect={() => setIsUserDropDownOpen(!isUserDropDownOpen)}
            isOpen={isUserDropDownOpen}
            toggle={
              <DropdownToggle onToggle={() => setIsUserDropDownOpen(!isUserDropDownOpen)}>
                Quay User
              </DropdownToggle>
            }
            dropdownItems={userDropdownItems}
          />
        </PageHeaderToolsItem>
      </PageHeaderToolsGroup>
      <Avatar src={imgAvatar} alt="Avatar image" />
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
