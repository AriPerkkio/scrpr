import React, { useReducer } from 'react';
import classNames from 'classnames';

export interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: (e: React.SyntheticEvent) => void;
}

const Button: React.SFC<ButtonProps> = ({ onClick, className, ...props }) => {
    const [clicked, toggle] = useReducer(s => !s, false);

    const _onClick = (event: React.SyntheticEvent): void => {
        toggle({});
        onClick && onClick(event);
    };

    const _className = classNames('button', className, { clicked });

    return (
        <button
            onClick={_onClick}
            className={_className}
            type='button'
            {...props}>
            {props.children}
        </button>
    );
};

export default Button;
