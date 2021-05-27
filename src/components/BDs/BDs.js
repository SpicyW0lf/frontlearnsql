import React from "react";
import API from '../../service/API';

import Card from '@material-ui/core/Card';
import styles from './styles';
import withStyles from "@material-ui/core/styles/withStyles";
import {CardContent, Typography} from "@material-ui/core";

class BDs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bds: [],
        }
    }

    componentDidMount() {
        let bdi = [];
        for (let i = 1; i < 6; i++) {
            API.get(`/api/databases/${i}/`)
                .then(res => {
                    bdi.push(res.data);
                    this.setState({
                        bds: bdi,
                    })
                })
        }
    }

    render() {
        const {classes} = this.props;
        const bds = this.state.bds;
        return (
            <div>
                {bds.map(bd => {
                    return (
                        <Card className={classes.card} key={bd.id}>
                            <CardContent>
                                <Typography className={classes.title}>
                                    {bd.title}
                                </Typography>
                                <Typography color="textSecondary"
                                            dangerouslySetInnerHTML={{__html: bd.description}}
                                />
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        )
    }
}

export default withStyles(styles)(BDs);