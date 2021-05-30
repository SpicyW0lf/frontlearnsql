import React from 'react';
import {Redirect} from "react-router";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import {appRouter} from '../../service/router-service';
import UserService from "../../service/user-service";

import styles from './SignIn.styles';

const userService = UserService.factory();

class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            disable: true,
        }
    }

    changeLogin = (e) => {
        this.setState({
            login: e.target.value,
            disable: false,
        })
        if (e.target.value.length) this.setState({disable: true});
    };

    changePassword = (e) => {
        this.setState({
            password: e.target.value,
            disable: false,
        })
        if (e.target.value.length) this.setState({disable: true});
    };

    signIn(username, password){
        if (userService.match(username, password)) {
            userService.setAuth();
        } else {
            alert("Не удалось войти!");
        }
        this.setState({
            auth: 'YOS!',
        })
    };

    render() {
        const {classes} = this.props;
        const isAuth = userService.isUserAuth();

        if (isAuth) return <Redirect to={appRouter.getCoursesRoute()} />;

        return(
            <div className={classes.root}>
                <div className={classes.form}>
                    <TextField label="Логин"
                               className={classes.textField}
                               value={this.state.login}
                               onChange={this.changeLogin}
                    />
                    <TextField label="Пароль"
                               className={classes.textField}
                               type="password"
                               value={this.state.password}
                               onChange={this.changePassword}
                    />
                    <Button color="primary"
                            variant="contained"
                            className={classes.button}
                            disabled={!this.state.disable}
                            onClick={ () => this.signIn(this.state.login, this.state.password)}
                    >
                        Войти
                    </Button>
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(SignIn);