import {
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelContent,
  Page,
  PageSection,
  PageSectionVariants,
  Tab,
  Tabs,
  TabTitleText,
  Title,
} from '@patternfly/react-core';
import {useLocation, useSearchParams} from 'react-router-dom';
import {useCallback, useRef, useState} from 'react';
import RepositoriesList from 'src/routes/RepositoriesList/RepositoriesList';
import Settings from './Tabs/Settings/Settings';
import {QuayBreadcrumb} from 'src/components/breadcrumb/Breadcrumb';
import DefaultPermissions from './Tabs/DefaultPermissions/DefaultPermissions';
import CreatePermissionDrawer from './Tabs/DefaultPermissions/createPermissionDrawer/CreatePermissionDrawer';

export enum DrawerContentType {
  None,
  CreatePermissionSpecificUser,
}

export default function Organization() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const orgName = location.pathname.split('/')[2];

  const [activeTabKey, setActiveTabKey] = useState<string>(
    searchParams.get('tab') || 'Repositories',
  );

  const onTabSelect = useCallback(
    (_event: React.MouseEvent<HTMLElement, MouseEvent>, tabKey: string) => {
      setSearchParams({tab: tabKey});
      setActiveTabKey(tabKey);
    },
    [],
  );

  // DRAWER STUFF

  const [drawerContent, setDrawerContent] = useState<DrawerContentType>(
    DrawerContentType.None,
  );

  const closeDrawer = () => {
    setDrawerContent(DrawerContentType.None);
  };

  const drawerRef = useRef<HTMLDivElement>();

  const drawerContentOptions = {
    [DrawerContentType.None]: null,
    [DrawerContentType.CreatePermissionSpecificUser]: (
      <CreatePermissionDrawer
        orgName={orgName}
        closeDrawer={closeDrawer}
        drawerRef={drawerRef}
        drawerContent={drawerContent}
      />
    ),
  };

  const repositoriesSubNav = [
    {
      name: 'Repositories',
      component: <RepositoriesList />,
    },
    {
      name: 'Default Permissions',
      component: (
        <DefaultPermissions
          orgName={orgName}
          setDrawerContent={setDrawerContent}
        />
      ),
    },
    {
      name: 'Settings',
      component: <Settings />,
    },
  ];

  return (
    <Drawer
      isExpanded={drawerContent != DrawerContentType.None}
      onExpand={() => {
        drawerRef.current && drawerRef.current.focus();
      }}
    >
      <DrawerContent panelContent={drawerContentOptions[drawerContent]}>
        <DrawerContentBody>
          <Page>
            <QuayBreadcrumb />
            <PageSection
              variant={PageSectionVariants.light}
              className="no-padding-bottom"
            >
              <Title data-testid="repo-title" headingLevel="h1">
                {orgName}
              </Title>
            </PageSection>
            <PageSection
              variant={PageSectionVariants.light}
              padding={{default: 'noPadding'}}
            >
              <Tabs activeKey={activeTabKey} onSelect={onTabSelect}>
                {repositoriesSubNav.map((nav) => (
                  <Tab
                    key={nav.name}
                    eventKey={nav.name}
                    title={<TabTitleText>{nav.name}</TabTitleText>}
                  >
                    {nav.component}
                  </Tab>
                ))}
              </Tabs>
            </PageSection>
          </Page>
        </DrawerContentBody>
      </DrawerContent>
    </Drawer>
  );
}
