import React, { useReducer, createContext, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

export const LIGHT = 'light';
export const DARK = 'dark';

const ThemeToggleContext = createContext<[string, () => void]>([
    LIGHT,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
]);

const ThemeProvider: React.FC = (props: any) => {
    const [isBrightMode, toggleMode] = useReducer(s => !s, false);

    const type = isBrightMode ? LIGHT : DARK;
    const theme = createMuiTheme({ palette: { type } });

    return (
        <ThemeToggleContext.Provider value={[type, toggleMode]}>
            <MuiThemeProvider theme={theme} {...props} />
        </ThemeToggleContext.Provider>
    );
};

export default ThemeProvider;
export const useThemeToggle = (): [string, () => void] =>
    useContext(ThemeToggleContext);
