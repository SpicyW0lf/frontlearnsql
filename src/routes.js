import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Layout from "./components/Layout";
import Home from './components/Home';
import Tasks from './components/Tasks';
import BDs from "./components/BDs";

import RouterService from "./service/router-service";


const routerService = RouterService.factory();

export default () => (
    <Router>
        <Layout>
                <Switch>
                <Route exact path={'/'}>
                    <Home />
                </Route>
                <Route path={routerService.getTasksRoute()}>
                    <Tasks />
                </Route>
                <Route path={routerService.getCoursesRoute()}>
                    <Home />
                </Route>
                <Route path={routerService.getBdRoute()}>
                    <BDs />
                </Route>
            </Switch>
        </Layout>
    </Router>
)