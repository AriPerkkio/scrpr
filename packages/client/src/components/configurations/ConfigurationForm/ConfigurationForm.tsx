import React from 'react';
import { useMutation, graphql } from 'relay-hooks';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';

import { useEventValue } from 'hooks';
import { RESET_EVENT } from 'hooks/useEventValue';
import { Configuration } from 'scrpr-api/types/schema';

interface ConfigurationMutation {
    variables: Configuration;
    response: Configuration;
}

const mutation = graphql`
    mutation ConfigurationFormMutation($name: String!, $url: String!) {
        createConfiguration(name: $name, url: $url) {
            name
            url
        }
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ConfigurationForm: React.FC = () => {
    const [name, onNameChange] = useEventValue();
    const [url, onUrlChange] = useEventValue();
    const [mutate, { loading, error }] = useMutation<ConfigurationMutation>(
        mutation
    );

    return (
        <Form>
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
                disabled={loading}>
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
                disabled={loading}>
                URL
            </TextField>

            <Button
                variant='outlined'
                type='submit'
                disabled={loading}
                onClick={() =>
                    mutate({
                        variables: { name, url },
                        onCompleted: () => {
                            onNameChange(RESET_EVENT);
                            onUrlChange(RESET_EVENT);
                        },
                    })
                }>
                Create configuration
            </Button>

            {error && 'TODO ERROR indicator'}
        </Form>
    );
};

export default ConfigurationForm;
