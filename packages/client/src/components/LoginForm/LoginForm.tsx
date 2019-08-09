import React, { useReducer } from 'react';
import styled from 'styled-components';

import Input from './Input';

interface LoginState {
    email: string;
    password: string;
}

const Wrapper = styled.div`
    border: 1px solid red;
`;

const BASE_CLASS = 'login-form';
const initialState = { email: '', password: '' };
const reducer = (state: LoginState, next: {}): LoginState => ({
    ...state,
    ...next,
});

const LoginForm: React.SFC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Wrapper>
            <h1>Login</h1>
            <form>
                <Input
                    id='email'
                    type='email'
                    value={state.email}
                    className={`${BASE_CLASS}-input`}
                    onChange={dispatch}>
                    Email
                </Input>

                <Input
                    id='password'
                    type='password'
                    value={state.password}
                    className={`${BASE_CLASS}-input`}
                    onChange={dispatch}>
                    Password
                </Input>
            </form>
        </Wrapper>
    );
};

export default LoginForm;
