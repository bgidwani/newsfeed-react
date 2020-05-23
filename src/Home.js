import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import Categories from './modules/views/Categories';

function Index() {
    return (
        <React.Fragment>
            <Categories />
        </React.Fragment>
    );
}

export default withRoot(Index);
