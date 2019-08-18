import React from 'react';

import { useAuthentication } from 'hooks';

const Authenticated: React.FC = ({ children }) => {
    const isAuthenticated = useAuthentication();

    if (!isAuthenticated) {
        return null;
    }

    // Typescript forces to return fragment instead of just children
    return <>{children}</>;
};

export default Authenticated;
