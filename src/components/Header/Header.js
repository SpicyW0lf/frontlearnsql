import React from "react";
import logo from './logo.svg';
import styles from './Header.styles';

import withStyles from '@material-ui/core/styles/withStyles';
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";

import {appRouter} from "../../service/router-service";
import {Link, Redirect} from "react-router-dom";
import UserService from "../../service/user-service";

const userService = UserService.factory();

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {auth: true}
    }

    Handler = () => {
        if (userService.isUserAuth()) userService.logout();

        this.setState({
            auth: !this.state.auth,
        })
    }

    render() {
    const { classes } = this.props;
    return (
        <AppBar position="fixed" className={classes.header}>
            <Toolbar>
                <img src={logo} className={classes.logo}/>
                <Link to={appRouter.getCoursesRoute()}>
                    <Typography className={classes.panels}> Курсы </Typography>
                </Link>
                <Link to={appRouter.getTasksRoute()}>
                    <Typography className={classes.panels}> Задания </Typography>
                </Link>
                <Link to={appRouter.getBdRoute()}>
                    <Typography className={classes.panels}> Базы данных </Typography>
                </Link>
                <Button
                    onClick={this.Handler}
                    style={{
                        backgroundColor: 'orange',
                        color: 'white',
                        marginBottom: '20px',
                        position: 'absolute',
                        right: '5rem',
                        top: '1rem'
                    }}
                >
                    Выйти
                </Button>
            </Toolbar>
            {!userService.isUserAuth() && <Redirect to={appRouter.getSignInRoute()} />}
        </AppBar>
    )
}
}

export default withStyles(styles)(Header);