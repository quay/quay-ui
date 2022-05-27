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
  } from "@patternfly/react-core";
  import Tags from './tabs/Tags';


export default function Repository(props) {
    return (
        <Page>
            <PageBreadcrumb>
                <Breadcrumb>
                    <BreadcrumbItem to="#">namespaces</BreadcrumbItem>
                    <BreadcrumbItem to="#">namespace</BreadcrumbItem>
                    <BreadcrumbItem to="#" isActive>repo</BreadcrumbItem>
                </Breadcrumb>
            </PageBreadcrumb>
            <PageSection variant={PageSectionVariants.light}>
                <Title headingLevel="h1">repo</Title>
            </PageSection>
            <PageSection variant={PageSectionVariants.light}>
                <Tabs>
                    <Tab eventKey={0} title={<TabTitleText>Tags</TabTitleText>}>
                        <Tags/>
                    </Tab>
                    <Tab eventKey={1} title={<TabTitleText>Information</TabTitleText>}>
                        
                    </Tab>
                    <Tab eventKey={2} title={<TabTitleText>Tag History</TabTitleText>}>
                        
                    </Tab>
                    <Tab eventKey={3} title={<TabTitleText>Builds</TabTitleText>}>
                        
                    </Tab>
                    <Tab eventKey={4} title={<TabTitleText>Logs</TabTitleText>}>
                        
                    </Tab>
                    <Tab eventKey={5} title={<TabTitleText>Settings</TabTitleText>}>
                        
                    </Tab>
                </Tabs>
            </PageSection>
        </Page>
    )
}