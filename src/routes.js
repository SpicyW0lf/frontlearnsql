import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Layout from "./components/Layout";
import Home from './components/Home';

import RouterService from "./service/router-service";

const routerService = RouterService.factory();

export default () => (
    <Router>
        <Layout>
            <Switch>
                <Route path={routerService.getCoursesRoute()}>
                    <Home />
                </Route>
            </Switch>
        </Layout>
    </Router>
)