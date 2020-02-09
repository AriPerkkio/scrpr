import React from 'react';

import ConfigurationForm from 'components/configurations/ConfigurationForm';
import ConfigurationsList from 'components/configurations/ConfigurationsList';

const Configurations: React.FC = () => (
    <>
        <ConfigurationForm />
        <ConfigurationsList />
    </>
);

export default Configurations;
