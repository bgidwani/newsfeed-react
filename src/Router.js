import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';

import Terms from './Terms';
import Privacy from './Privacy';
import Home from './Home';
const history = require('history').createBrowserHistory();

const Router = () => {
    //const browser = history.createBrowserHistory();
    history.listen((location) => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    });

    React.useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <Switch>
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/privacy" component={Privacy} />
            <Route path="/" component={Home} />
        </Switch>
    );
};

export default Router;
