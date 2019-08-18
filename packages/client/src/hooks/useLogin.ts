import { useReducer, useLayoutEffect } from 'react';

import Api from 'api';
import { useRouter } from 'hooks';

interface UseLoginState {
    isLoading: boolean;
    error: {} | null;
}

interface UseLoginProps extends UseLoginState {
    onSubmit: (email: string, password: string) => void;
}

const initialState = {
    isLoading: false,
    error: null,
};
const reducer = (state: UseLoginState, next: {}): UseLoginState => ({
    ...state,
    ...next,
});

const useLogin = (): UseLoginProps => {
    const [{ isLoading, error }, dispatch] = useReducer(reducer, initialState);
    const { history } = useRouter();

    const onSubmit = (email: string, password: string): void => {
        dispatch({ isLoading: true });

        Api.login(email, password)
            .then(() => dispatch({ isLoading: false }))
            .then(() => history.push('/auth/'))
            .catch(error => dispatch({ isLoading: false, error }));
    };

    useLayoutEffect(() => {
        Api.getAuthToken()
            .then(() => history.push('/auth'))
            .catch(() => {
                // User is not logged in as expected
            });
    }, [history]);

    return {
        isLoading,
        error,
        onSubmit,
    };
};

export default useLogin;
