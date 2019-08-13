import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Authenticated from './Authenticated';

const publicRoutes = [
    {
        path: '/login',
        component: lazy(() => import('./Login')),
    },
    {
        path: '/signup',
        component: lazy(() => import('./Signup')),
    },
];

const authenticatedRoutes = [
    {
        path: '/(home|)',
        component: lazy(() => import('./Home')),
    },
    {
        path: '/results',
        component: lazy(() => import('./Results')),
    },
];

const Routes: React.SFC = () => (
    <Switch>
        {publicRoutes.map(({ path, component }) => (
            <Route key={path} path={path} component={component} />
        ))}

        <Route path='/auth/'>
            <Authenticated>
                {authenticatedRoutes.map(({ path, component }) => (
                    <Route
                        key={path}
                        path={`/auth${path}`}
                        component={component}
                    />
                ))}
            </Authenticated>
        </Route>
    </Switch>
);

export default Routes;
