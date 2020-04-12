import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';

import Routes, { RouteSuspender } from 'views/Routes';
import Menu from 'components/Menu';
import ThemeProvider from 'components/theme/ThemeProvider';
import { RootContainer } from 'styles';

const App: React.FC = () => (
    <ThemeProvider>
        <RootContainer>
            <HashRouter>
                <Menu>
                    <Suspense fallback={<RouteSuspender />}>
                        <Routes />
                    </Suspense>
                </Menu>
            </HashRouter>
        </RootContainer>
    </ThemeProvider>
);

export default App;
