import React from 'react';
import styled from 'styled-components';

import { red } from 'styles/variables';

export interface ErrorProps {
    children: {};
}

const Pre = styled.pre`
    color: ${red};
    margin: 1rem;
`;

const ErrorField: React.SFC<ErrorProps> = ({ children, ...props }) => (
    <Pre>{JSON.stringify(children, null, 2)}</Pre>
);

export default ErrorField;
