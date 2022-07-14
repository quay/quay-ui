import {
  Breadcrumb,
  BreadcrumbItem,
  PageBreadcrumb,
} from '@patternfly/react-core';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

export function QuayBreadcrumb() {
  const [breacrumbItems, setBreacrumbItems] = useState([]);
  const pageBreadcrumbs = useBreadcrumbs();

  useEffect(() => {
    const result = [];
    pageBreadcrumbs.map((object, i) => {
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
    setBreacrumbItems(result);
  }, []);

  return (
    <PageBreadcrumb>
      <Breadcrumb>
        {breacrumbItems.map((object, i) => (
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
