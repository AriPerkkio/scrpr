import styled from 'styled-components';
import { foreground, background, firaCode } from './variables';

export const RootContainer = styled.div`
    height: 100%;
    background-color: ${background};
    display: flex;

    color: ${foreground};
    font-family: ${firaCode};
`;

export const MainContent = styled.main`
    margin: 2rem;
`;
