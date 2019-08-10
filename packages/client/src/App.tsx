import React, { Suspense } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';

import Routes from 'views/Routes';

const App: React.FC = () => (
    <HashRouter>
        <Suspense fallback='Loading...'>
            <Switch>
                {Routes.map(props => (
                    <Route {...props} key={props.path} />
                ))}
            </Switch>
        </Suspense>
    </HashRouter>
);

export default App;
