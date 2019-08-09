import React from 'react';

export interface InputProps {
    className?: string;
    type: string;
    id: string;
    value: string;
    children: React.ReactNode;
    onChange: (value: {}) => void;
}

const Input: React.SFC<InputProps> = ({
    className,
    onChange,
    children,
    id,
    ...props
}) => (
    <>
        <input
            {...props}
            id={id}
            onChange={({ target: { value } }) => onChange({ [id]: value })}
        />
        <label htmlFor={id}>{children}</label>
    </>
);

export default Input;
