import Card from "@material-ui/core/Card";
import {CardContent, Typography} from "@material-ui/core";
import React from "react";

{tasks.map(task => {
    return (
        <Card className={classes.card} key={task.id}>
            <CardContent>
                <Typography className={classes.title}>
                    {task.title}
                </Typography>
                <Typography color="textSecondary"
                            dangerouslySetInnerHTML={{__html: task.task_text}}
                />
            </CardContent>
        </Card>
    )
})}