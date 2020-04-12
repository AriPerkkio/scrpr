import React from 'react';
import { CircularProgress, Typography, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

interface UserFormProps {
    onSubmit: () => void;
    isLoading: boolean;
    error: {} | null;
    header: string;
    children: React.ReactNode;
}

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: 'relative',
        margin: '0 auto',
        'max-width': '16rem',
    },
    form: {
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'flex-end',
    },
    loadingWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    errorAlert: {
        'margin-top': '2rem',
    },
    heading: {
        color: theme.palette.text.primary,
        'margin-left': '0.5rem',
    },
}));

const UserForm: React.SFC<UserFormProps> = (props: UserFormProps) => {
    const { onSubmit, isLoading, error, header, children } = props;
    const styles = useStyles();

    const _onSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        onSubmit();
    };

    return (
        <div className={styles.wrapper}>
            <Typography className={styles.heading} component='h2' variant='h4'>
                {header}
            </Typography>

            <form className={styles.form} onSubmit={_onSubmit}>
                {children}
            </form>

            {error && (
                <Alert
                    className={styles.errorAlert}
                    variant='filled'
                    severity='error'>
                    Error occured.
                    <br />
                    TODO parse error message here
                </Alert>
            )}

            {isLoading && (
                <div className={styles.loadingWrapper}>
                    <CircularProgress />
                </div>
            )}
        </div>
    );
};

export default UserForm;
