import withRoot from './modules/withRoot';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Footer from './modules/views/Footer';
import TopNav from './modules/views/TopNav';

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <TopNav />
                <Router />
                <Footer />
            </BrowserRouter>
        </React.Fragment>
    );
}

export default withRoot(App);
