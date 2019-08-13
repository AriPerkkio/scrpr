import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';

import Routes from 'views/Routes';
import Menu from 'components/Menu';

const App: React.FC = () => (
    <HashRouter>
        <Menu />

        <Suspense fallback='Loading...'>
            <Routes />
        </Suspense>
    </HashRouter>
);

export default App;
