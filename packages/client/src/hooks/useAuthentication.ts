import { useState, useLayoutEffect } from 'react';

import Api from 'api';
import { useRouter } from 'hooks';

const authRegex = /^\/auth\//;

const useAuthentication = (): boolean => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const { history } = useRouter();
    const { pathname } = history.location;

    useLayoutEffect(() => {
        Api.getAuthToken()
            .then(() => setAuthenticated(true))
            .catch(() => {
                setAuthenticated(false);

                if (pathname.match(authRegex)) {
                    history.push('/login');
                }
            });
    }, [history, pathname]);

    return isAuthenticated;
};

export default useAuthentication;
