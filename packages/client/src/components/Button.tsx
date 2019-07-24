import React, { useReducer } from 'react';

export interface IButtonProps {
  children?: React.ReactNode,
  onClick?: (e: React.SyntheticEvent) => void
}

const Button: React.SFC<IButtonProps> = (props) => {
    return (
  <button onClick={props.onClick} type="button">
    {props.children}
  </button>
)};

Button.defaultProps = {
  children: null,
  onClick: () => {}
};

export default Button;