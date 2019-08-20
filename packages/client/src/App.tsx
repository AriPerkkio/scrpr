import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';

import Routes from 'views/Routes';
import Menu from 'components/Menu';
import { RootContainer, MainContent } from 'styles/layouts';

const App: React.FC = () => (
    <HashRouter>
        <RootContainer>
            <Menu />

            <MainContent>
                <Suspense fallback='Loading...'>
                    <Routes />
                </Suspense>
            </MainContent>
        </RootContainer>
    </HashRouter>
);

export default App;
