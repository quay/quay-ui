import React, { useEffect } from 'react';
import {
    Page,
} from "@patternfly/react-core";

import {
    Outlet,
    Route,
    Routes,
} from "react-router-dom";

import Builds from "src/routes/Builds/Builds";
import Search from "src/routes/Search/Search";
import Repositories from "src/routes/Namespaces/Repositories/Repositories";
import Repository from "src/routes/Namespaces/Repository/Repository";
import Administration from "src/routes/Admin/Administration";
import Namespaces from "src/routes/Namespaces/Namespaces";
import TeamMembershipTab from "src/routes/Namespaces/Repositories/Tabs/TeamMembershipTab";
import {QuayHeader} from "../components/header/QuayHeader";
import {QuaySidebar} from "../components/sidebar/QuaySidebar";
import {getUser} from "../resources/UserResource";
import {useRecoilState} from "recoil";
import {UserState} from "../atoms/UserState";
import {Overview} from "./Overview/Overview";

export function StandaloneMain() {
    const [, setUserState] = useRecoilState(UserState);

    useEffect(() => {
        getUser()
            .then(user => setUserState(user));
    }, [])

    return (
            <Page
                header={<QuayHeader />}
                sidebar={<QuaySidebar />}
                style={{ height: "100vh" }}
                isManagedSidebar
                defaultManagedSidebarIsOpen={true}
            >
                <Routes>
                    <Route path={"/namespaces"} element={<Namespaces />} >
                        <Route path={":repoName"} element={<Repositories />} />
                    </Route>
                    <Route path={"/namespaces/:namespaceName/:repoName"} element={<Repository />} />
                    <Route path={"/overview"} element={<Overview />} />
                    <Route path={"/builds"} element={<Builds />} />
                    <Route path={"/administration"} element={<Administration />} />
                    <Route path={"/namespaces/:repoName/team"} element={<TeamMembershipTab />} />
                </Routes>
                <Outlet />
            </Page>
    );
}
