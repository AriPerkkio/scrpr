import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Link, TextField, makeStyles } from '@material-ui/core';

import UserForm from 'components/user/UserForm';
import { useLogin, useEventValue } from 'hooks';

const useStyles = makeStyles(theme => ({
    link: {
        color: theme.palette.text.secondary,

        '&:hover, &:active': {
            color: theme.palette.text.primary,
        },
    },
}));

const LoginForm: React.SFC = () => {
    const [email, onEmailChange] = useEventValue();
    const [password, onPasswordChange] = useEventValue();
    const { onLogin, isLoading, error } = useLogin();
    const styles = useStyles();

    const onSubmit = (): void => onLogin(email, password);

    return (
        <UserForm
            header='Login'
            isLoading={isLoading}
            error={error}
            onSubmit={onSubmit}>
            <Link component={RouterLink} to='signup' className={styles.link}>
                Signup
            </Link>

            <TextField
                required
                variant='outlined'
                margin='normal'
                id='email'
                label='Email Address'
                name='email'
                type='email'
                autoComplete='email'
                value={email}
                onChange={onEmailChange}
                disabled={isLoading}
            />

            <TextField
                required
                variant='outlined'
                margin='normal'
                id='password'
                label='Password'
                name='password'
                type='password'
                autoComplete='password'
                value={password}
                onChange={onPasswordChange}
                disabled={isLoading}
            />

            <Button
                variant='outlined'
                type='submit'
                onClick={onSubmit}
                disabled={isLoading}>
                Login
            </Button>
        </UserForm>
    );
};

export default LoginForm;
