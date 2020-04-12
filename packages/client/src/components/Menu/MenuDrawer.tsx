import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    DrawerProps,
} from '@material-ui/core';
import {
    ExitToApp as LogoutIcon,
    Close as CloseIcon,
} from '@material-ui/icons';

import Api from 'api';
import { authenticatedRoutes } from 'views/Routes';

interface MenuDrawerProps extends DrawerProps {
    onClose: () => void;
}

const useStyles = makeStyles(theme => ({
    closeButton: {
        'align-self': 'flex-end',
    },
    list: {
        'border-top': `1px solid ${theme.palette.grey[700]}`,
    },
    logout: {
        'margin-bottom': '1rem',
    },
}));

const Menu: React.FC<MenuDrawerProps> = ({ onClose, ...props }) => {
    const styles = useStyles();

    const onLogout = (): void => {
        Api.logout();
        onClose();
    };

    return (
        <Drawer {...props}>
            <IconButton
                onClick={onClose}
                aria-label='Close menu'
                className={styles.closeButton}>
                <CloseIcon />
            </IconButton>

            <List className={styles.list}>
                <ListItem button onClick={onLogout} className={styles.logout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </ListItem>

                {authenticatedRoutes.map(({ icon: Icon, ...route }) => (
                    <ListItem
                        button
                        key={route.navigationName}
                        to={`/auth${trimPath(route.path)}`}
                        onClick={onClose}
                        component={RouterLink}>
                        <ListItemIcon>
                            <Icon />
                        </ListItemIcon>

                        <ListItemText>{route.navigationName}</ListItemText>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

const removeRegex = /(\(|\)|\|)/g;
const trimPath = (path: string): string => path.replace(removeRegex, '');

export default Menu;
