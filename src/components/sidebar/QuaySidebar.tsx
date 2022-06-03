import React from 'react';
import {Nav, NavItem, NavList, PageSidebar} from '@patternfly/react-core';
import {Link} from 'react-router-dom';
import {NavigationPath} from 'src/routes/NavigationPath';
import Namespaces from 'src/routes/Namespaces/Namespaces';
import Repositories from 'src/routes/Namespaces/Repositories/Repositories';
import {Overview} from '../../routes/Overview/Overview';

interface SideNavProps {
  isSideNav: boolean;
  navPath: NavigationPath;
  title: string;
  component: JSX.Element | any;
}

const routes: SideNavProps[] = [
  {
    isSideNav: true,
    navPath: NavigationPath.overview,
    title: 'Overview',
    component: <Overview />,
  },
  {
    isSideNav: true,
    navPath: NavigationPath.namespace,
    title: 'Namespaces',
    component: <Namespaces />,
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
