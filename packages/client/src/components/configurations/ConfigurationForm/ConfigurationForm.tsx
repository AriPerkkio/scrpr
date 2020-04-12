import React, { useState } from 'react';
import { graphql, commitMutation } from 'react-relay';
import { Button, TextField, makeStyles } from '@material-ui/core';

import Environment from 'Environment';
import { useEventValue } from 'hooks';
import { RESET_EVENT } from 'hooks/useEventValue';

const mutation = graphql`
    mutation ConfigurationFormMutation($name: String!, $url: String!) {
        createConfiguration(name: $name, url: $url) {
            name
            url
        }
    }
`;

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
    },
}));

const ConfigurationForm: React.FC = () => {
    const styles = useStyles();
    const [name, onNameChange] = useEventValue();
    const [url, onUrlChange] = useEventValue();
    const [isLoading, setLoading] = useState(false);
    const [, setError] = useState(false);

    return (
        <form className={styles.form}>
            <TextField
                required
                variant='outlined'
                margin='normal'
                id='name'
                label='Name'
                name='name'
                type='text'
                value={name}
                onChange={onNameChange}
                disabled={isLoading}>
                Name
            </TextField>

            <TextField
                required
                variant='outlined'
                margin='normal'
                id='url'
                label='URL'
                name='url'
                type='text'
                value={url}
                onChange={onUrlChange}
                disabled={isLoading}>
                URL
            </TextField>

            <Button
                variant='outlined'
                type='submit'
                disabled={isLoading}
                onClick={() => {
                    setLoading(true);
                    setError(false);

                    commitMutation(Environment, {
                        mutation,
                        variables: { name, url },
                        onCompleted: () => {
                            onNameChange(RESET_EVENT);
                            onUrlChange(RESET_EVENT);
                        },
                        onError: () => {
                            setError(true);
                            setLoading(false);
                        },
                    });
                }}>
                Create configuration
            </Button>
        </form>
    );
};

export default ConfigurationForm;
