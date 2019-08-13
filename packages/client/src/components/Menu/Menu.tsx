import React from 'react';

import Api from 'api';

const Menu: React.FC = () => (
    <nav>
        <ul>
            <li>
                <a href='#/login' onClick={Api.logout}>
                    Logout
                </a>
            </li>
        </ul>
    </nav>
);

export default Menu;
