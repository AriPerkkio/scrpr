import { useReducer } from 'react';

import Api from 'api';

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

    const onSubmit = (email: string, password: string): void => {
        dispatch({ isLoading: true });

        Api.login(email, password)
            .then(() => dispatch({ isLoading: false }))
            .catch(error => dispatch({ isLoading: false, error }));
    };

    return {
        isLoading,
        error,
        onSubmit,
    };
};

export default useLogin;
