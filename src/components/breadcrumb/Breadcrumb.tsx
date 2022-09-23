import {
  Breadcrumb,
  BreadcrumbItem,
  PageBreadcrumb,
} from '@patternfly/react-core';
import {NavigationRoutes} from 'src/routes/NavigationPath';
import {Link, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import useBreadcrumbs, {
  BreadcrumbComponentType,
} from 'use-react-router-breadcrumbs';
import {useLocation} from 'react-router';
import {useRecoilState} from 'recoil';
import {BrowserHistoryState} from 'src/atoms/BrowserHistoryState';

export function QuayBreadcrumb() {
  const [browserHistory, setBrowserHistoryState] =
    useRecoilState(BrowserHistoryState);

  const [breadcrumbItems, setBreadcrumbItems] = useState<QuayBreadcrumbItem[]>(
    [],
  );
  const routerBreadcrumbs: BreadcrumbData[] = useBreadcrumbs(NavigationRoutes, {
    disableDefaults: true,
    excludePaths: ['/'],
  });
  const urlParams = useParams();

  const resetBreadCrumbs = () => {
    setBreadcrumbItems([]);
    setBrowserHistoryState([]);
  };

  const buildFromRoute = () => {
    const result = [];
    const history = [];
    routerBreadcrumbs.map((object, i) => {
      const newObj = {};
      newObj['pathname'] = object.match.pathname;
      newObj['title'] = object.match.pathname.split('/').slice(-1)[0];
      // if (object.breadcrumb.props.children) {
      //   newObj['title'] = object.breadcrumb.props.children;
      // } else {
      //   newObj['title'] = object.match.route.breadcrumb(object.match);
      // }
      newObj['active'] =
        object.match.pathname.localeCompare(window.location.pathname) === 0;
      result.push(newObj);
      history.push(newObj);
    });
    console.log('result', result);
    setBreadcrumbItems(result);
    setBrowserHistoryState(history);
  };

  const currentBreadcrumbItem = () => {
    const newItem = {};
    const lastItem = routerBreadcrumbs[routerBreadcrumbs.length - 1];

    // Form QuayBreadcrumbItem for the current path
    newItem['pathname'] = lastItem.location.pathname;
    // if (lastItem.match.route.Component.type.name == 'RepositoryDetails') {
    //   newItem['title'] = urlParams.repositoryName;
    // } else if (lastItem.match.route.Component.type.name == 'TagDetails') {
    //   newItem['title'] = urlParams.tagName;
    // } else {
    newItem['title'] = newItem['pathname'].split('/').slice(-1)[0];
    // }
    newItem['active'] = true;
    return newItem;
  };

  const buildFromBrowserHistory = () => {
    const result = [];
    const history = [];
    const newItem = currentBreadcrumbItem();

    for (const value of Array.from(browserHistory.values())) {
      const newObj = {};
      newObj['pathname'] = value['pathname'];
      if (typeof value['title'] === 'string') {
        newObj['title'] = value['title'];
      } else if (
        value['title'] &&
        value['title']['props'] &&
        value['title']['props']['children']
      ) {
        newObj['title'] = value['title']['props']['children'];
      }
      newObj['active'] =
        value['pathname'].localeCompare(window.location.pathname) === 0;
      if (newItem['pathname'] == newObj['pathname']) {
        newItem['title'] = newObj['title'];
        break;
      }
      result.push(newObj);
      history.push(newObj);
    }
    result.push(newItem);
    history.push(newItem);

    setBreadcrumbItems(result);
    setBrowserHistoryState(history);
  };

  useEffect(() => {
    // urlParams has atleast one item - {*: 'endpoint'}
    // If size = 1, no params are defined in the url, so we reset breadcrumb history
    if (Object.keys(urlParams).length <= 1) {
      resetBreadCrumbs();
      return;
    }

    if (browserHistory.length > 0) {
      buildFromBrowserHistory();
    } else {
      buildFromRoute();
    }
  }, []);

  return (
    <div>
      {breadcrumbItems.length > 0 ? (
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
      ) : (
        ''
      )}
    </div>
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
  route?: BreadcrumbsRoute;
};

type BreadcrumbsRoute = {
  breadcrumb?: BreadcrumbComponentType | any | null;
  Component?: React.ReactElement | any;
};

type RouterBreadcrumbDetail = {
  props: RouterBreadcrumbPropsDetail;
};

type RouterBreadcrumbPropsDetail = {
  children: string;
};
