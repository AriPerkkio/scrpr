import React from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import {
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    makeStyles,
} from '@material-ui/core';
import { Configuration } from 'scrpr-api/types/schema';

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

            const { Configurations: configurations } = props as {
                Configurations: Configuration[];
            };

            return (
                <ConfigurationsTable>
                    {configurations.map(configuration => (
                        <TableRow key={configuration.name}>
                            <TableCell>{configuration.name}</TableCell>
                            <TableCell>{configuration.url}</TableCell>
                        </TableRow>
                    ))}
                </ConfigurationsTable>
            );
        }}
    />
);

const useStyles = makeStyles(() => ({ wrapper: { margin: '2rem' } }));

const ConfigurationsTable: React.FC = props => {
    const styles = useStyles();

    return (
        <div className={styles.wrapper}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>URL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{props.children}</TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ConfigurationsList;
