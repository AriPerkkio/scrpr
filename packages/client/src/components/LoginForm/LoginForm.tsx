import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Form, { Input } from '../Form';
import Button from 'components/Button';
import { useLogin } from 'hooks';
import { white } from 'styles/variables';

interface LoginState {
    email: string;
    password: string;
}

const LinkContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 15rem;

    a {
        outline: 0;
        color: ${white};
    }
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
        <Form header='Login' isLoading={isLoading} error={error}>
            <LinkContainer>
                <Link to='signup'>Signup</Link>
            </LinkContainer>

            <Input id='email' type='email' value={email} onChange={dispatch}>
                Email
            </Input>

            <Input
                id='password'
                type='password'
                value={password}
                onChange={dispatch}>
                Password
            </Input>

            <Button onClick={() => onSubmit(email, password)}>Submit</Button>
        </Form>
    );
};

export default LoginForm;
