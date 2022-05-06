import React from 'react';
import {Nav, NavItem, NavList, PageSidebar, Sidebar, SidebarContent, SidebarPanel} from '@patternfly/react-core';
import { NavLink } from 'react-router-dom';

export function QuaySidebar() {
  const Navigation = (
      <Nav id="nav-primary-simple" theme="dark">
        <NavList id="nav-list-simple">
          {/* routes.map(
              (route, idx) => route.label && (!route.routes ? renderNavItem(route, idx) : renderNavGroup(route, idx))
          ) */}
            <NavItem key={`test-nav`} id={`test-nav`} isActive={false}>
                <NavLink to={'/namespaces'}>
                    Overview
                </NavLink>
            </NavItem>
            <NavItem key={`test-nav`} id={`test-nav`} isActive={false}>
                <NavLink to={'/repositories'}>
                   Repositories
                </NavLink>
            </NavItem>
            <NavItem key={`test-nav`} id={`test-nav`} isActive={false}>
                <NavLink to={'/namespaces'}>
                    Namespaces
                </NavLink>
            </NavItem>
        </NavList>
      </Nav>
  );

  return (
      <PageSidebar
          className="page-sidebar"
          theme="dark"
          nav={Navigation} />
  );

}
