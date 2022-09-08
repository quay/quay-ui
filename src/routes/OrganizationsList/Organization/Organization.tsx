import {
  Page,
  PageSection,
  PageSectionVariants,
  Tab,
  Tabs,
  TabTitleText,
  Title,
} from '@patternfly/react-core';
import {useLocation} from 'react-router-dom';
import {NavigationPath} from 'src/routes/NavigationPath';
import UsageLogsTab from './Tabs/UsageLogs/UsageLogsTab';
import {useCallback, useState} from 'react';
import RepositoriesList from 'src/routes/RepositoriesList/RepositoriesList';
import {QuayBreadcrumb} from 'src/components/breadcrumb/Breadcrumb';

export default function Organization() {
  const location = useLocation();
  const repositoryName = location.pathname.split('/')[2];

  const [activeTabKey, setActiveTabKey] = useState<string | number>(0);

  const onTabSelect = useCallback(
    (
      _event: React.MouseEvent<HTMLElement, MouseEvent>,
      tabIndex: string | number,
    ) => setActiveTabKey(tabIndex),
    [],
  );

  const repositoriesSubNav = [
    {
      href: NavigationPath.organizationDetail,
      name: 'Repositories',
      component: <RepositoriesList />,
    },
    // Commenting till needed.
    // {
    //   href: NavigationPath.orgDetailUsageLogsTab,
    //   name: 'Usage Logs',
    //   component: <UsageLogsTab />,
    // },
  ];

  return (
    <Page>
      <QuayBreadcrumb />
      <PageSection
        variant={PageSectionVariants.light}
        className="no-padding-bottom"
      >
        <Title data-testid="repo-title" headingLevel="h1">
          {repositoryName}
        </Title>
      </PageSection>
      <PageSection
        variant={PageSectionVariants.light}
        className="no-padding-on-sides"
      >
        <Tabs activeKey={activeTabKey} onSelect={onTabSelect}>
          {repositoriesSubNav.map((nav, idx) => (
            <Tab
              key={idx}
              eventKey={idx}
              title={<TabTitleText>{nav.name}</TabTitleText>}
            >
              {nav.component}
            </Tab>
          ))}
        </Tabs>
      </PageSection>
    </Page>
  );
}
