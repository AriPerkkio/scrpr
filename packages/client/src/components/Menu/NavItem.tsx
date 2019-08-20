import React from 'react';
import styled from 'styled-components';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { foreground, blue } from 'styles/variables';

const ListItem = styled.li`
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;

    white-space: nowrap;
    color: ${foreground};

    &:hover {
        color: ${blue}99;
    }

    &:not(:first-child) {
        margin-top: 0.25rem;
    }

    i {
        font-size: 1rem;
        margin-top: 0.15rem;
        margin-right: 0.5rem;
    }

    a {
        color: inherit;
        text-decoration: none;

        &.active {
            &,
            & + * {
                color: ${blue};
            }
        }
    }
`;

interface NavItemProps extends NavLinkProps {
    icon: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, ...props }) => (
    <ListItem>
        <NavLink {...props} />
        <i className='material-icons'>{icon}</i>
    </ListItem>
);

export default NavItem;
