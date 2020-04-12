import styled from 'styled-components';
import { withTheme } from '@material-ui/core';

export const RootContainer = withTheme(styled.div`
    height: 100%;
    background-color: ${props => props.theme.palette.background.default};
    font-family: Roboto;
    transition: background-color 0.5s;
`);
