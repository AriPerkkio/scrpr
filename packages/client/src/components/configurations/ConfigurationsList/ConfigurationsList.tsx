import React from 'react';
import { useQuery, graphql } from 'relay-hooks';
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

interface ConfigurationQuery {
    response: {
        Configurations: Configuration[];
    };
}

const query = graphql`
    query ConfigurationsListQuery {
        Configurations {
            name
            url
        }
    }
`;

const ConfigurationsList: React.FC = () => {
    const { props, error } = useQuery<ConfigurationQuery>(query);

    if (error) {
        return <div>Error</div>;
    }

    if (!props) {
        return <div>Loading</div>;
    }

    return (
        <ConfigurationsTable>
            {props.Configurations.map(configuration => (
                <TableRow key={configuration.name}>
                    <TableCell>{configuration.name}</TableCell>
                    <TableCell>{configuration.url}</TableCell>
                </TableRow>
            ))}
        </ConfigurationsTable>
    );
};

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
