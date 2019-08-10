import { lazy } from 'react';

export default [
    {
        path: '/login',
        component: lazy(() => import('./Login')),
    },
    {
        path: '/signup',
        component: lazy(() => import('./Signup')),
    },
    {
        path: '/(home|)',
        component: lazy(() => import('./Home')),
    },
];
