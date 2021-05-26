import React from "react";
import API from '../../service/API';

import Card from '@material-ui/core/Card';
import styles from './styles';
import withStyles from "@material-ui/core/styles/withStyles";
import {CardContent, Typography} from "@material-ui/core";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        API.get('api/courses')
            .then(res => {
                const courses = res.data.results;
                this.setState({ courses })
            })
    }

    render() {
        const classes = this.props;
        const courses = this.state.courses;
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