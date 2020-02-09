import React, { useEffect } from 'react';
import { graphql, QueryRenderer } from 'react-relay';

import Api from 'api';
import Environment from 'Environment';
import { useGlobalState } from 'hooks';

const query = graphql`
    query ConfigurationsQuery {
        configurations {
            name
        }
    }
`;

const Results: React.FC = () => {
    const [state, setGlobalState] = useGlobalState();

    useEffect(() => {
        Api.getHelloWorld()
            .then(result => setGlobalState({ result }))
            .catch(error => setGlobalState({ error }));
    }, [setGlobalState]);

    return (
        <QueryRenderer
            environment={Environment}
            query={query}
            variables={{}}
            render={({ error, props }) => {
                if (error) {
                    return <div>Error</div>;
                }

                if (!props) {
                    return <div>Loading</div>;
                }

                return (
                    <>
                        <div>Results view</div>
                        <pre>{JSON.stringify(state, null, 4)}</pre>
                        <pre>{JSON.stringify(props, null, 4)}</pre>
                    </>
                );
            }}
        />
    );
};

export default Results;
