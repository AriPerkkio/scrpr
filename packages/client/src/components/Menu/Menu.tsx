import React, { useReducer } from 'react';
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    makeStyles,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import MenuDrawer from './MenuDrawer';
import ThemeToggle from 'components/theme/ThemeToggle';
import { useAuthentication } from 'hooks';

interface MenuProps {
    children?: React.ReactChild;
}

const useStyles = makeStyles(theme => ({
    contentWrapper: {
        display: 'flex',
        'flex-direction': 'column',
        width: '100%',
    },
    appBar: {
        'background-color': theme.palette.background.paper,
        transition: theme.transitions.create('background-color', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    content: {
        width: '100%',
        'padding-top': '2rem',
    },
    themeButton: {
        'margin-left': 'auto',
    },
    heading: {
        color: theme.palette.text.primary,
        'margin-left': '2rem',
    },
}));

const Menu: React.FC<MenuProps> = props => {
    const styles = useStyles();
    const [isDrawerOpen, toggleDrawer] = useReducer(s => !s, false);
    const isAuthenticated = useAuthentication();

    return (
        <>
            <MenuDrawer
                open={isDrawerOpen}
                anchor='left'
                onClose={toggleDrawer}
            />

            <div className={styles.contentWrapper}>
                <AppBar position='static' className={styles.appBar}>
                    <Toolbar>
                        {isAuthenticated && (
                            <IconButton onClick={toggleDrawer}>
                                <MenuIcon />
                            </IconButton>
                        )}

                        <Typography
                            component='h1'
                            variant='h5'
                            className={styles.heading}>
                            Scrpr
                        </Typography>

                        <ThemeToggle className={styles.themeButton} />
                    </Toolbar>
                </AppBar>

                <div className={styles.content}>{props.children}</div>
            </div>
        </>
    );
};

export default Menu;
