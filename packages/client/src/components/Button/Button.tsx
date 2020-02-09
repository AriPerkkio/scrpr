import React, { useReducer } from 'react';
import styled from 'styled-components';

import { green } from 'styles/variables';

export interface ButtonProps {
    children?: React.ReactNode;
    onClick?: (e: React.SyntheticEvent) => void;
}

const ButtonEl = styled.button`
    border-radius: 2rem;
    border: 1px solid ${green};
    padding: 0.25rem 0.75rem;
    color: ${green};
    background-color: transparent;
    outline: 0;
    cursor: pointer;

    &:hover,
    &:focus {
        box-shadow: 0 0 0.3rem ${green};
    }
`;

const Button: React.SFC<ButtonProps> = ({ onClick, ...props }) => {
    const [clicked, setClicked] = useReducer(s => !s, false);

    const _onClick = (event: React.SyntheticEvent): void => {
        setClicked();
        onClick && onClick(event);
    };

    return (
        <ButtonEl aria-pressed={clicked} onClick={_onClick} {...props}>
            {props.children}
        </ButtonEl>
    );
};

export default Button;
