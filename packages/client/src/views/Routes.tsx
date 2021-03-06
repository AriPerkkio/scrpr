import React, { lazy } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Home, List } from '@material-ui/icons';
import { CircularProgress, makeStyles } from '@material-ui/core';

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
        icon: Home,
        component: lazy(() => import('./Home')),
    },
    {
        path: '/configurations',
        navigationName: 'Configurations',
        icon: List,
        component: lazy(() => import('./Configurations')),
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

const useStyles = makeStyles(theme => ({
    loaderWrapper: {
        display: 'flex',
        'justify-content': 'center',
        width: '100%',
        'margin-top': '4rem',
    },
    loader: {
        color: theme.palette.text.primary,
    },
}));

export const RouteSuspender: React.FC = () => {
    const styles = useStyles();

    return (
        <div className={styles.loaderWrapper}>
            <CircularProgress className={styles.loader} size='3.5rem' />
        </div>
    );
};

export default Routes;
