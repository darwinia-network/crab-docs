import { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
// import { asyncComponent } from "./components/AsyncComponent";

const history = createBrowserHistory();

// const AsyncHome = asyncComponent(import("./page/Home"));
// const AsyncNotFound = asyncComponent(import("./page/NotFound"));

const Routers = () => (
    <Router history={history}>
        <Suspense fallback={<Spin size='large' style={{ marginTop: '40%' }} />}>
            <Switch>
                <Route
                    exact
                    component={lazy(() => import('./page/Home'))}
                    path='/'
                />
                <Route component={lazy(() => import('./page/NotFound'))} />
            </Switch>
        </Suspense>
    </Router>
);

export default Routers;
