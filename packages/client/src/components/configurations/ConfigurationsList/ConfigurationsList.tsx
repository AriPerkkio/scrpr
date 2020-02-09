import React from 'react';
import { graphql, QueryRenderer } from 'react-relay';

import Environment from 'Environment';

const query = graphql`
    query ConfigurationsListQuery {
        Configurations {
            name
            url
        }
    }
`;

const ConfigurationsList: React.FC = () => (
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

            return <pre>{JSON.stringify(props, null, 4)}</pre>;
        }}
    />
);

export default ConfigurationsList;
