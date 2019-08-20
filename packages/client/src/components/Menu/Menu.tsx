import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

import NavItem from './NavItem';
import Api from 'api';
import { authenticatedRoutes } from 'views/Routes';
import { useAuthentication } from 'hooks';
import { foreground } from 'styles/variables';

const Nav = styled.nav`
    box-sizing: border-box;
    width: 10rem;
    margin-right: 0;
    border-right: 1px solid ${foreground};

    overflow: hidden;
    transition: all 0.5s;

    &.is-hidden {
        border-right-width: 0;
        width: 0;
        margin-right: 10rem;
        opacity: 0;
    }
`;

const NavList = styled.ul`
    padding-left: 2rem;
    padding-top: 1rem;
    list-style: none;
`;

const Menu: React.FC = () => {
    const isAuthenticated = useAuthentication();

    return (
        <Nav className={classNames(!isAuthenticated && 'is-hidden')}>
            <NavList>
                <NavItem to='/login' onClick={Api.logout} icon='logout'>
                    Logout
                </NavItem>

                {authenticatedRoutes.map(route => (
                    <NavItem
                        key={route.path}
                        to={`/auth${trimPath(route.path)}`}
                        icon={route.icon}>
                        {route.navigationName}
                    </NavItem>
                ))}
            </NavList>
        </Nav>
    );
};

const removeRegex = /(\(|\)|\|)/g;
const trimPath = (path: string): string => path.replace(removeRegex, '');

export default Menu;
