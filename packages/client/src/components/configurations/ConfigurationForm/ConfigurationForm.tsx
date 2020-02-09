import React, { useState, useReducer } from 'react';
import { graphql, commitMutation } from 'react-relay';

import Form, { Input } from 'components/Form';
import Button from 'components/Button';
import Environment from 'Environment';

interface ConfigurationFormState {
    name: string;
    url: string;
}

const initialState = { name: '', url: '' };
const reducer = (
    state: ConfigurationFormState,
    next: {}
): ConfigurationFormState => ({ ...state, ...next });

const mutation = graphql`
    mutation ConfigurationFormMutation($name: String!, $url: String!) {
        createConfiguration(name: $name, url: $url) {
            name
            url
        }
    }
`;

const ConfigurationForm = () => {
    const [configuration, updateConfiguration] = useReducer(
        reducer,
        initialState
    );
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    return (
        <Form header='Create Configuration' isLoading={isLoading} error={error}>
            <Input
                id='name'
                type='text'
                value={configuration.name}
                onChange={updateConfiguration}>
                Name
            </Input>

            <Input
                id='url'
                type='text'
                value={configuration.url}
                onChange={updateConfiguration}>
                URL
            </Input>

            <Button
                onClick={() => {
                    setLoading(true);
                    commitMutation(Environment, {
                        mutation,
                        variables: configuration,
                        onCompleted: () => {
                            setLoading(false);
                            updateConfiguration(initialState);
                        },
                        onError: () => setError(true),
                    });
                }}>
                Create configuration
            </Button>
        </Form>
    );
};

export default ConfigurationForm;
