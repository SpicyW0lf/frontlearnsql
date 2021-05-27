import React from "react";
import logo from './logo.svg';
import styles from './Header.styles';

import withStyles from '@material-ui/core/styles/withStyles';
import {AppBar, Toolbar, Typography} from "@material-ui/core";

import {appRouter} from "../../service/router-service";
import {Link} from "react-router-dom";

function Header(props) {
    const { classes } = props;

    return (
        <AppBar position="fixed" className={classes.header}>
            <Toolbar>
                <img src={logo} className={classes.logo} />
                <Link to={appRouter.getCoursesRoute()}>
                    <Typography className={classes.panels}> Курсы </Typography>
                </Link>
                <Link to={appRouter.getTasksRoute()}>
                    <Typography className={classes.panels}> Задания </Typography>
                </Link>
                <Link to={appRouter.getBdRoute()}>
                    <Typography className={classes.panels}> Базы данных </Typography>
                </Link>

            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(Header);