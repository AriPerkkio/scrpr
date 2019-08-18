import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';

import Routes from 'views/Routes';
import Menu from 'components/Menu';
import { RootContainer } from 'styles/layouts';

const App: React.FC = () => (
    <HashRouter>
        <RootContainer>
            <Menu />

            <main>
                <Suspense fallback='Loading...'>
                    <Routes />
                </Suspense>
            </main>
        </RootContainer>
    </HashRouter>
);

export default App;
