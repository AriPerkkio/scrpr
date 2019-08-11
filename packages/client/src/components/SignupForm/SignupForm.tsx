import React, { useReducer } from 'react';

import Form, { Input } from '../Form';
import Button from 'components/Button';
import { useSignup } from 'hooks';

interface SignupState {
    email: string;
    password: string;
    verificationCode: string;
}

const initialState = { email: '', password: '', verificationCode: '' };
const reducer = (state: SignupState, next: {}): SignupState => ({
    ...state,
    ...next,
});

const SignupForm: React.SFC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { email, password, verificationCode } = state;
    const { isLoading, isVerifying, error, onSignup, onVerify } = useSignup();

    return (
        <Form header='Signup' isLoading={isLoading} error={error}>
            <Input id='email' type='email' value={email} onChange={dispatch}>
                Email
            </Input>

            <Input
                id={isVerifying ? 'verificationCode' : 'password'}
                type={isVerifying ? 'text' : 'password'}
                value={isVerifying ? verificationCode : password}
                onChange={dispatch}>
                {isVerifying ? 'Verification Code' : 'Password'}
            </Input>

            <Button
                onClick={() =>
                    isVerifying
                        ? onVerify(email, verificationCode)
                        : onSignup(email, password)
                }>
                Submit
            </Button>
        </Form>
    );
};

export default SignupForm;
