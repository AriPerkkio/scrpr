import React from 'react';
import { Button, TextField } from '@material-ui/core';

import UserForm from 'components/user/UserForm';
import { useSignup, useEventValue } from 'hooks';

const SignupForm: React.SFC = () => {
    const [email, onEmailChange] = useEventValue();
    const [password, onPasswordChange] = useEventValue();
    const [verificationCode, onVerificationCodeChange] = useEventValue();
    const { isLoading, isVerifying, error, onSignup, onVerify } = useSignup();

    const onSubmit = (): void => {
        isVerifying
            ? onVerify(email, verificationCode)
            : onSignup(email, password);
    };

    return (
        <UserForm
            header='Signup'
            isLoading={isLoading}
            error={error}
            onSubmit={onSubmit}>
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

            {isVerifying ? (
                <TextField
                    required
                    variant='outlined'
                    margin='normal'
                    id='verificationCode'
                    label='Verification code'
                    name='verificationCode'
                    type='text'
                    value={verificationCode}
                    onChange={onVerificationCodeChange}
                    disabled={isLoading}
                />
            ) : (
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
            )}

            <Button
                variant='outlined'
                type='submit'
                onClick={onSubmit}
                disabled={isLoading}>
                Submit
            </Button>
        </UserForm>
    );
};

export default SignupForm;
