import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import { RelayEnvironmentProvider } from 'relay-hooks';

import Routes, { RouteSuspender } from 'views/Routes';
import Menu from 'components/Menu';
import ThemeProvider from 'components/theme/ThemeProvider';
import { RootContainer } from 'styles';
import Environment from 'Environment';

const App: React.FC = () => (
    <RelayEnvironmentProvider environment={Environment}>
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
    </RelayEnvironmentProvider>
);

export default App;
