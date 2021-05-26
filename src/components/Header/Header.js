import React from "react";
import logo from './logo.svg';
import styles from './Header.styles';

import withStyles from '@material-ui/core/styles/withStyles';
import {AppBar, Toolbar, Typography} from "@material-ui/core";

function Header(props) {
    const { classes } = props;

    return (
        <AppBar position="fixed" className={classes.header}>
            <Toolbar>
                <img src={logo} className={classes.logo} />
                <Typography> Курсы </Typography>
                <Typography> Задания </Typography>
                <Typography> Базы данных </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(Header);