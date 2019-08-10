import React, { useReducer } from 'react';
import styled from 'styled-components';

import Input from './Input';
import Button from 'components/Button';
import ErrorField from 'components/ErrorField';
import { useLogin } from 'hooks';
import { white } from 'styles/variables';

interface LoginState {
    email: string;
    password: string;
}

const Wrapper = styled.div`
    border: 2px solid ${white};
    border-radius: 2rem;
    padding: 1rem 2rem;
    margin: 20% auto;
    width: 80%;
`;

const Header = styled.h1`
    font-size: 1.5rem;
    color: ${white};
    margin-bottom: 2rem;
`;

const initialState = { email: '', password: '' };
const reducer = (state: LoginState, next: {}): LoginState => ({
    ...state,
    ...next,
});

const LoginForm: React.SFC = () => {
    const [{ email, password }, dispatch] = useReducer(reducer, initialState);
    const { onSubmit, isLoading, error } = useLogin();

    return (
        <Wrapper>
            <Header>Login</Header>

            {isLoading && 'Loading...'}
            {error && <ErrorField>{error}</ErrorField>}

            <form>
                <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={dispatch}>
                    Email
                </Input>

                <Input
                    id='password'
                    type='password'
                    value={password}
                    onChange={dispatch}>
                    Password
                </Input>

                <Button onClick={() => onSubmit(email, password)}>
                    Submit
                </Button>
            </form>
        </Wrapper>
    );
};

export default LoginForm;
