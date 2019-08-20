import React from 'react';
import styled from 'styled-components';

import ErrorField from 'components/ErrorField';
import { green, yellow } from 'styles/variables';

export interface FormProps {
    isLoading: boolean;
    error: {} | undefined | null;
    header: React.ReactNode;
}

const Wrapper = styled.div`
    padding: 1rem 2rem;
    margin: 20% auto;
    width: 80%;
`;

const Header = styled.h1`
    font-size: 1.5rem;
    color: ${green};
    margin-bottom: 2rem;
`;

const Loading = styled.div`
    color: ${yellow};
    margin: 2rem 0;
`;

const Form: React.SFC<FormProps> = ({ isLoading, error, header, children }) => (
    <Wrapper>
        <Header>{header}</Header>

        {isLoading && <Loading>Loading...</Loading>}
        {error && <ErrorField>{error}</ErrorField>}

        <form onSubmit={e => e.preventDefault()}>{children}</form>
    </Wrapper>
);

export default Form;
