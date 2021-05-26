import React from 'react';

import {MuiThemeProvider} from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';

import Header from '../components/Header';

import theme from './themeMaterialUi';

import styles from './Layout.styles';


function Layout(props) {
        const { classes } = props;

        return (
                <MuiThemeProvider theme={theme}>
                    <Header/>
                    <div className={classes.root}>
                        <div className={classes.content}>
                            {props.children}
                        </div>
                    </div>
                </MuiThemeProvider>
        );
}



export default withStyles(styles)(Layout);
