import React from 'react';
import styled from 'styled-components';

import { white } from 'styles/variables';

export interface InputProps {
    type: string;
    id: string;
    value: string;
    children: React.ReactNode;
    onChange: (value: {}) => void;
}

const InputEl = styled.input`
    border-radius: 2rem;
    display: block;
    min-width: 15rem;
    margin-bottom: 1rem;
    outline: 0;
    padding-left: 0.5rem;
    padding-top: 0.1rem;
`;

const Label = styled.label`
    color: ${white};
    display: block;
    margin-bottom: 0.5rem;
`;

const Input: React.SFC<InputProps> = ({ onChange, children, id, ...props }) => (
    <>
        <Label htmlFor={id}>{children}</Label>
        <InputEl
            {...props}
            id={id}
            onChange={({ target: { value } }) => onChange({ [id]: value })}
        />
    </>
);

export default Input;
