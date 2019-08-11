import React, { useReducer }  from 'react';
import styled from 'styled-components';

import { white } from 'styles/variables';

export interface ButtonProps {
    children?: React.ReactNode;
    onClick?: (e: React.SyntheticEvent) => void;
}

const ButtonEl = styled.button`
    border-radius: 2rem;
    border: 1px solid ${white};
    padding: .2rem .5rem;
    color: ${white};
    background-color: transparent;
    outline: 0;

    &:hover, &:focus {
        box-shadow: 0 0 .3rem ${white};
    }
`;

const Button: React.SFC<ButtonProps> = ({ onClick, ...props }) => {
    const [clicked, setClicked] = useReducer(s => !s, false);

    const _onClick = (event: React.SyntheticEvent): void => {
        setClicked({});
        onClick && onClick(event);
    };

    return (
        <ButtonEl
            aria-pressed={clicked}
            onClick={_onClick}
            {...props}>
            {props.children}
        </ButtonEl>
    );
};

export default Button;
