import React from 'react';
import classNames from 'classnames';
import {
    Brightness4 as IconLight,
    Brightness5 as IconDark,
} from '@material-ui/icons';
import { IconButton, makeStyles } from '@material-ui/core';

import { useThemeToggle, LIGHT } from 'components/theme/ThemeProvider';

interface ThemeToggleProps {
    className?: string;
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: 0,
    },
}));

const ThemeToggle: React.FC<ThemeToggleProps> = props => {
    const { root } = useStyles();
    const [theme, toggle] = useThemeToggle();
    const Icon = theme === LIGHT ? IconLight : IconDark;

    return (
        <IconButton
            onClick={toggle}
            className={classNames(root, props.className)}
            aria-label='Toggle theme'>
            <Icon />
        </IconButton>
    );
};

export default ThemeToggle;
