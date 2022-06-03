import * as React from 'react';
import {
  Page,
  PageSection,
  PageSectionVariants,
  Title,
} from '@patternfly/react-core';
// import {
//   HorizontalNav,
//   ListPageHeader,
// } from '@openshift-console/dynamic-plugin-sdk';
// import { useHistory } from "react-router-dom";

export default function Builds() {
  //   const history = useHistory();
  //   const namespaceName = history.location.pathname.split('/');
  //   console.log('namespaceName', namespaceName);

  return (
    <Page>
      <PageSection variant={PageSectionVariants.light} hasShadowBottom>
        <div className="co-m-nav-title--row">
          <Title headingLevel="h1">Builds</Title>
        </div>
      </PageSection>

      <PageSection>
        <PageSection variant={PageSectionVariants.light}></PageSection>
      </PageSection>
      {/* <ListPageHeader title={namespaceName[3]}></ListPageHeader> */}

      {/* <HorizontalNav pages={pages} /> */}
    </Page>
  );
}
