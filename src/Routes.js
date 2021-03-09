import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { asyncComponent } from "./components/AsyncComponent";

const history = createBrowserHistory();
const AsyncHome = asyncComponent(import("./page/Home"));

const Routers = () => (
    <Router history={history}>
        <Switch>
            <Route
                exact
                component={AsyncHome}
                path='/'
            />
        </Switch>
    </Router>
);

export default Routers;
