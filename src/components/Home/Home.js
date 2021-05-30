import React from "react";
import API, {config} from '../../service/API';
import {Redirect} from "react-router";

import Card from '@material-ui/core/Card';
import styles from './styles';
import withStyles from "@material-ui/core/styles/withStyles";
import {CardContent, Typography} from "@material-ui/core";

import UserService from "../../service/user-service";
import {appRouter} from "../../service/router-service";

const userService = UserService.factory();

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        API.get('api/courses', config)
            .then(res => {
                const courses = res.data.results;
                this.setState({
                    courses: courses,
                })
            });
    }

    render() {
        if (!userService.isAuth) return <Redirect to={appRouter.getSignInRoute()} />;
        const {classes} = this.props;
        const courses = this.state.courses;
        console.log(this.state.courses[1]);
        return (
            <div className={classes.root}>
                {courses.map(course => {
                    return (
                        <Card className={classes.card} key={course.id}>
                              <CardContent>
                                  <Typography className={classes.title}>
                                      {course.title}
                                  </Typography>
                                  <Typography className={classes.description}
                                              color="textSecondary"
                                              dangerouslySetInnerHTML={{__html: course.description}}
                                              />
                              </CardContent>
                        </Card>
                    )
                })}
            </div>
        )
    }
}

export default withStyles(styles)(Home);