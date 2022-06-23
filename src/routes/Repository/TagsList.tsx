import {
  Breadcrumb,
  BreadcrumbItem,
  Page,
  PageSection,
  PageSectionVariants,
  Title,
  Tabs,
  Tab,
  TabTitleText,
  PageBreadcrumb,
} from '@patternfly/react-core';
import Tags from './Tabs/Tags/Tags';
import {useLocation, useSearchParams, useNavigate} from 'react-router-dom';
import {useState} from 'react';

enum TabIndex {
  Tags = 'tags',
  Information = 'information',
  TagHistory = 'history',
  Builds = 'builds',
  Logs = 'logs',
  Settings = 'settings',
}

// Return the tab as an enum or null if it does not exist
function getTabIndex(tab: string) {
  if (Object.values(TabIndex).includes(tab as TabIndex)) {
    return tab as TabIndex;
  }
}

export default function TagsList(props) {
  const [activeTabKey, setActiveTabKey] = useState(TabIndex.Tags);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // TODO: refactor
  const [organization, ...repo] = location.pathname.split('/').slice(2);
  const repository = repo.join('/');

  const requestedTabIndex = getTabIndex(searchParams.get('tab'));
  if (requestedTabIndex && requestedTabIndex !== activeTabKey) {
    setActiveTabKey(requestedTabIndex);
  }

  function tabsOnSelect(e, tabIndex) {
    navigate(`${location.pathname}?tab=${tabIndex}`);
  }

  return (
    <Page>
      <PageBreadcrumb>
        <Breadcrumb>
          <BreadcrumbItem data-testid="namespace-breadcrumb" to="#">
            organizations
          </BreadcrumbItem>
          <BreadcrumbItem data-testid="org-breadcrumb" to="#">
            {organization}
          </BreadcrumbItem>
          <BreadcrumbItem data-testid="repo-breadcrumb" to="#" isActive>
            {repository}
          </BreadcrumbItem>
        </Breadcrumb>
      </PageBreadcrumb>
      <PageSection variant={PageSectionVariants.light}>
        <Title data-testid="repo-title" headingLevel="h1">
          {repository}
        </Title>
      </PageSection>
      <PageSection variant={PageSectionVariants.light}>
        <Tabs activeKey={activeTabKey} onSelect={tabsOnSelect}>
          <Tab
            eventKey={TabIndex.Tags}
            title={<TabTitleText>Tags</TabTitleText>}
          >
            <Tags organization={organization} repository={repository} />
          </Tab>
          <Tab
            eventKey={TabIndex.Information}
            title={<TabTitleText>Information</TabTitleText>}
          >
            <div>Information tab work in progress</div>
          </Tab>
          <Tab
            eventKey={TabIndex.TagHistory}
            title={<TabTitleText>Tag History</TabTitleText>}
          >
            <div>Tag History tab work in progress</div>
          </Tab>
          <Tab
            eventKey={TabIndex.Builds}
            title={<TabTitleText>Builds</TabTitleText>}
          >
            <div>Builds tab work in progress</div>
          </Tab>
          <Tab
            eventKey={TabIndex.Logs}
            title={<TabTitleText>Logs</TabTitleText>}
          >
            <div>Logs tab work in progress</div>
          </Tab>
          <Tab
            eventKey={TabIndex.Settings}
            title={<TabTitleText>Settings</TabTitleText>}
          >
            <div>Settings tab work in progress</div>
          </Tab>
        </Tabs>
      </PageSection>
    </Page>
  );
}
