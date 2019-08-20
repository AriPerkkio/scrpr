import React, { lazy } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
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

export const authenticatedRoutes = [
    {
        path: '/(home|)',
        navigationName: 'Home',
        icon: 'home',
        component: lazy(() => import('./Home')),
    },
    {
        path: '/results',
        navigationName: 'Results',
        icon: 'list',
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
                <Switch>
                    {authenticatedRoutes.map(({ path, component }) => (
                        <Route
                            key={path}
                            path={`/auth${path}`}
                            component={component}
                        />
                    ))}

                    <Redirect to='/auth/home' />
                </Switch>
            </Authenticated>
        </Route>

        <Redirect to='/auth/home' />
    </Switch>
);

export default Routes;
