import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { NavLink, NavLinkProps } from 'react-router-dom';

import Api from 'api';
import { authenticatedRoutes } from 'views/Routes';
import { useAuthentication } from 'hooks';
import { white } from 'styles/variables';

const Nav = styled.nav`
    box-sizing: border-box;
    width: 8rem;
    margin-right: 0;
    border-right: 1px solid ${white};

    overflow: hidden;
    transition: all 0.5s;

    &.is-hidden {
        border-right-width: 0;
        width: 0;
        margin-right: 8rem;
        opacity: 0;
    }
`;

const Link = styled(NavLink)`
    color: ${white};
    text-decoration: none;
`;

const NavList = styled.ul`
    padding-left: 2rem;
    padding-top: 1rem;
    list-style: none;
`;

const NavItem: React.FC<NavLinkProps> = props => (
    <li>
        <Link {...props} />
    </li>
);

const Menu: React.FC = () => {
    const isAuthenticated = useAuthentication();

    return (
        <Nav className={classNames(!isAuthenticated && 'is-hidden')}>
            <NavList>
                <NavItem to='/login' onClick={Api.logout}>
                    Logout
                </NavItem>

                {authenticatedRoutes.map(route => (
                    <NavItem
                        key={route.path}
                        to={`/auth${trimPath(route.path)}`}>
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
