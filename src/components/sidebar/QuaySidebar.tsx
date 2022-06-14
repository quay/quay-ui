import React from 'react';
import {Nav, NavItem, NavList, PageSidebar} from '@patternfly/react-core';
import {Link} from 'react-router-dom';
import {NavigationPath} from 'src/routes/NavigationPath';
import Organizations from 'src/routes/Organizations/Organizations';
import Repositories from 'src/routes/Organizations/Repositories/Repositories';

interface SideNavProps {
  isSideNav: boolean;
  navPath: NavigationPath;
  title: string;
  component: JSX.Element;
}

const routes: SideNavProps[] = [
  {
    isSideNav: true,
    navPath: NavigationPath.organizations,
    title: 'Organizations',
    component: <Organizations />,
  },
  {
    isSideNav: true,
    navPath: NavigationPath.repositories,
    title: 'Repositories',
    component: <Repositories />,
  },
];

export function QuaySidebar() {
  const Navigation = (
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
          ) : null,
        )}
      </NavList>
    </Nav>
  );

  return <PageSidebar className="page-sidebar" theme="dark" nav={Navigation} />;
}
