import {Tabs, Tab, TabTitleText} from '@patternfly/react-core';
import {useSearchParams, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import Details from './Details/Details';
import SecurityReport from './SecurityReport/SecurityReport';
import {Tag} from 'src/resources/TagResource';

export enum TabIndex {
  Details = 'details',
  Layers = 'layers',
  SecurityReport = 'securityreport',
  Packages = 'packages',
}

// Return the tab as an enum or null if it does not exist
function getTabIndex(tab: string) {
  if (Object.values(TabIndex).includes(tab as TabIndex)) {
    return tab as TabIndex;
  }
}

export default function TagTabs(props: TagTabsProps) {
  const [activeTabKey, setActiveTabKey] = useState<TabIndex>(TabIndex.Details);
  const navigate = useNavigate();

  // Navigate to the correct tab
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTabIndex = getTabIndex(searchParams.get('tab'));
  if (requestedTabIndex && requestedTabIndex !== activeTabKey) {
    setActiveTabKey(requestedTabIndex);
  }
  return (
    <Tabs
      activeKey={activeTabKey}
      onSelect={(e, tabIndex) => {
        navigate(`${location.pathname}?tab=${tabIndex}`);
      }}
    >
      <Tab
        eventKey={TabIndex.Details}
        title={<TabTitleText>Details</TabTitleText>}
      >
        <Details
          org={props.org}
          repo={props.repo}
          tag={props.tag}
          size={props.size}
          digest={props.digest}
        />
      </Tab>
      <Tab
        eventKey={TabIndex.SecurityReport}
        title={<TabTitleText>Security Report</TabTitleText>}
      >
        <SecurityReport
          org={props.org}
          repo={props.repo}
          digest={props.digest}
        />
      </Tab>
    </Tabs>
  );
}

type TagTabsProps = {
  tag: Tag;
  org: string;
  repo: string;
  size: number;
  digest: string;
};
