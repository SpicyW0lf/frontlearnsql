import React from 'react';
import {Redirect} from "react-router";
import {Link} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import {appRouter} from '../../service/router-service';
import UserService from "../../service/user-service";

import styles from './SignIn.styles';

const userService = UserService.factory();

class SignIn extends React.PureComponent{
    componentWillUnmount() {
        this.props.actions.signInPageDown();
    }

    changeLogin = (e) => {
        this.props.actions.signInChangeField({destination: Enum.USERNAME_FIELD, value: get(e, 'target.value', '')})
    };

    changePassword = (e) => {
        this.props.actions.signInChangeField({destination: Enum.PASSWORD_FIELD, value: get(e, 'target.value', '')})
    };

    signIn(password, username){

    };

    render() {
        const {classes, disableButton} = this.props;
        const isAuth = userService.isUserAuth();

        if (isAuth) return <Redirect to={appRouter.getHomeRoute()} />;

        return(
            <div className={classes.root}>
                <div className={classes.form}>
                    <TextField label="Логин"
                               className={classes.textField}
                               onChange={this.changeLogin}
                    />
                    <TextField label="Пароль"
                               className={classes.textField}
                               type="password"
                               onChange={this.changePassword}
                    />
                    <Button color="primary"
                            variant="contained"
                            className={classes.button}
                            disabled={disableButton}
                            onClick={this.clickButtonHandler}
                    >
                        Войти
                    </Button>
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(SignIn);