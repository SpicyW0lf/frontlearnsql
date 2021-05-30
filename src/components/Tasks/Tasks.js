import React from "react";
import {Redirect} from "react-router";
import API, {config} from '../../service/API';

import Card from '@material-ui/core/Card';
import styles from './styles';
import './modalStyle.css';
import withStyles from "@material-ui/core/styles/withStyles";
import {Button, CardContent, Typography} from "@material-ui/core";
import AddModal from "./addModal";
import UpdModal from "./updModal";

import UserService from "../../service/user-service";
import {appRouter} from "../../service/router-service";

const userService = UserService.factory();

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: {},
            tasks: [],
            addModal: false,
            updModal: false,
        };
        this.filtired = null;
        this.taskes = [];
    }


    onAddModalClick = () => {
        this.setState({
            addModal: true,
        });
    }

    onUpdModalClick = (index) => {
        this.setState({
            updModal: true,
            task: this.state.tasks[index],
        });
    }

    onAddModalClose = () => {
        this.setState({
            addModal: false,
        });
    }

    onUpdModalClose = () => {
        this.setState({
            updModal: false,
        })
    }

    onSubmitAddModal = (task) => {
        const formData = new FormData();
        formData.append('title', task.taskName);
        formData.append('reference_solution', task.taskSolution);
        formData.append('task_text', task.taskText);
        formData.append('sandbox_db', task.taskBd);
        formData.append('owner', 1);
        API.post('/api/tasks_for_petrov/', formData, config)
            .then(res => {
                alert('Задание успешно добавлено!');
                this.componentDidMount();
            })
            .catch(error => alert('Не удалось добавить задание!'));
    }

    onSubmitUpdModal = (task) => {
        const formData = new FormData();
        formData.append('id', task.taskId);
        formData.append('title', task.taskName);
        formData.append('task_text', task.taskText);
        formData.append('reference_solution', task.taskSolution);
        formData.append('sandbox_db', task.taskBd);
        formData.append('owner', 1);

        API.put(`/api/tasks_for_petrov/${task.taskId}/`, formData, config)
            .then(res => {
                alert('Задание успешно изменено!');
                this.componentDidMount();
            })
            .catch(error => alert('Не удалось изменить задание!'));
    }

    componentDidMount() {
        API.get(`/api/tasks_for_petrov/`, config)
            .then(res => {
                this.taskes = res.data.results;
                this.setState({
                    tasks: this.taskes,
                })
            });
    }

    getTasks = () => {
        API.get(`/api/tasks_for_petrov/`, config)
            .then(res => {
                this.taskes = res.data.results;
            });
    }

    onDeleteClick = (id) => {
        API.delete(`/api/tasks_for_petrov/${id}/`, config)
            .then(res => {
                alert("Вы успешно удалили задание!");
                this.componentDidMount();
            })
            .catch(error => alert(`Ошибка! Не удалось удалить задание.`));

    }

    onSearchHandler = (e) => {
        this.getTasks();
        const text = e.target.value.toLowerCase() || '';
        const tasks = this.taskes;

        this.filtired = tasks.filter((el, index) => {
            const tit = el.title.toLowerCase();

            return tit.includes(text);
        })

        this.setState({
            tasks: this.filtired,
        })
    }

    render() {
        if (!userService.isAuth) return <Redirect to={appRouter.getSignInRoute()} />;
        const {classes} = this.props;
        const tasks = this.filtired || this.state.tasks;

        return (
            <div>
                <Button onClick={this.onAddModalClick}
                        style={{backgroundColor: '#1d51a3', color: 'white', marginBottom: '20px'}}
                >
                    Добавить задание
                </Button>
                    <input
                        type="text"
                        id="header-search"
                        placeholder="Поиск задания"
                        name="s"
                        onChange={this.onSearchHandler}
                    />
                <AddModal
                    title={`Добавьте задание`}
                    isOpened={this.state.addModal}
                    onModalClose={this.onAddModalClose}
                    onSubmitModal={this.onSubmitAddModal}
                    />
                <UpdModal
                    title={'Измените задание'}
                    prevTask={this.state.task}
                    isOpened={this.state.updModal}
                    onModalClose={this.onUpdModalClose}
                    onSubmitModal={this.onSubmitUpdModal}
                    />
            {tasks.map((task, index) => {
                    return (
                        <Card className={classes.card} key={task.id} style={{display: 'grid', gridTemplateColumns: "80% 20%"}}>
                            <CardContent>
                                <Typography className={classes.title}>
                                    {task.title}
                                </Typography>
                                <Typography color="textSecondary"
                                            dangerouslySetInnerHTML={{__html: task.task_text}}
                                />
                            </CardContent>
                            <div style={{placeSelf: "end"}}>
                            <Button
                                onClick={() => this.onDeleteClick(task.id)}
                                style={{backgroundColor: 'red', width: "12ch"}}
                            >
                                Удалить
                            </Button>
                            <Button
                                onClick={() => this.onUpdModalClick(index)}
                                style={{backgroundColor: 'yellow', width: "12ch", margin: '10px'}}
                            >
                                Изменить
                            </Button>
                            </div>
                        </Card>
                    )
                })}

            </div>
        )
    }
}

export default withStyles(styles)(Tasks);