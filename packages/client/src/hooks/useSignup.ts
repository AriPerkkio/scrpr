import { useReducer } from 'react';

import Api from 'api';

interface UseSignupState {
    isLoading: boolean;
    isVerifying: boolean;
    error: {} | null;
}

interface UseSignupProps extends UseSignupState {
    onSignup: (email: string, password: string) => void;
    onVerify: (email: string, verificationCode: string) => void;
}

const initialState = {
    isLoading: false,
    isVerifying: false,
    error: null,
};
const reducer = (state: UseSignupState, next: {}): UseSignupState => ({
    ...state,
    ...next,
});

const UseSignup = (): UseSignupProps => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onSignup = (email: string, password: string): void => {
        dispatch({ isLoading: true });

        Api.signup(email, password)
            .then(() => dispatch({ isLoading: false, isVerifying: true }))
            .catch(error => dispatch({ isLoading: false, error }));
    };

    const onVerify = (email: string, verificationCode: string): void => {
        dispatch({ isLoading: true });

        Api.verify(email, verificationCode)
            .then(() => dispatch({ isLoading: false, isVerifying: false }))
            .catch(error => dispatch({ isLoading: false, error }));
    };

    return {
        ...state,
        onSignup,
        onVerify,
    };
};

export default UseSignup;
