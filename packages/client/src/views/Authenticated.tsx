import React, { useState, useEffect } from 'react';

import Api from 'api';
import { useRouter } from 'hooks';

const Authenticated: React.FC = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const { history } = useRouter();

    useEffect(() => {
        Api.getAuthToken()
            .then(() => setAuthenticated(true))
            .catch(() => history.push('/login'));
    }, [history]);

    if (!isAuthenticated) {
        return <div>Loading....</div>;
    }

    // Typescript forces to return fragment instead of just children
    return <>{children}</>;
};

export default Authenticated;
