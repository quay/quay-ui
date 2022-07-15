import {
  Breadcrumb,
  BreadcrumbItem,
  PageBreadcrumb,
} from '@patternfly/react-core';
import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {useLocation} from 'react-router';

export function QuayBreadcrumb() {
  const [breadcrumbItems, setBreadcrumbItems] = useState<QuayBreadcrumbItem[]>(
    [],
  );
  const routerBreadcrumbs: BreadcrumbData[] = useBreadcrumbs();

  useEffect(() => {
    const result = [];
    routerBreadcrumbs.map((object, i) => {
      if (object.match.pathname == '/') {
        return;
      }
      const newObj = {};
      newObj['pathname'] = object.match.pathname;
      newObj['title'] = object.breadcrumb.props.children;
      newObj['active'] =
        object.match.pathname.localeCompare(window.location.pathname) === 0;
      result.push(newObj);
    });
    setBreadcrumbItems(result);
  }, []);

  return (
    <PageBreadcrumb>
      <Breadcrumb>
        {breadcrumbItems.map((object, i) => (
          <BreadcrumbItem
            render={(props) => (
              <Link
                to={object.pathname}
                className={object.active ? 'disabled-link' : ''}
              >
                {object.title}
              </Link>
            )}
            key={i}
          />
        ))}
      </Breadcrumb>
    </PageBreadcrumb>
  );
}

type QuayBreadcrumbItem = {
  pathname: string;
  title: string;
  active: boolean;
};

declare type Location = ReturnType<typeof useLocation>;

type BreadcrumbData = {
  match: BreadcrumbMatch;
  location: Location;
  key: string;
  breadcrumb: RouterBreadcrumbDetail | React.ReactElement | any;
};

type BreadcrumbMatch = {
  pathname: string;
};

type RouterBreadcrumbDetail = {
  props: RouterBreadcrumbPropsDetail;
};

type RouterBreadcrumbPropsDetail = {
  children: string;
};
