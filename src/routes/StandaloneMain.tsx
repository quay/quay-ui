import React from 'react';
import {Page} from "@patternfly/react-core";
import {QuayHeader} from "../components/header/QuayHeader";
import {QuaySidebar} from "../components/sidebar/QuaySidebar";
import {Namespaces} from "./Namespaces/Namespaces";


export function StandaloneMain() {
    const pageId = 'quay-app-container';

    return (
        <Page
            mainContainerId={pageId}
            header={<QuayHeader />}
            sidebar={<QuaySidebar />}
        >
            <Namespaces />
        </Page>

    )
}
