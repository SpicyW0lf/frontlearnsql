import React, { useState } from "react";
import './modalStyle.css';
import {MenuItem, Select} from "@material-ui/core";

let isUpdated = false;

function UpdModal(props) {
    const [task, setTask] = useState({});
    const [errors, setErrors] = useState({
        taskName: true,
        taskText: true,
        taskSolution: false,
        taskBd: true,
        taskDif: true,
    });

    const { Difficulty, Databases, prevTask} = props;
    if (Difficulty[0][0] == "Все") Difficulty.shift();
    if (Databases[0][0] == "Все") Databases.shift();

    const updatePrev = () => {
            setTask({
                taskId: prevTask.id,
                taskName: prevTask.title,
                taskText: prevTask.task_text,
                taskBd: prevTask.sandbox_db,
                taskDif: prevTask.difficulty,
                taskSolution: "",
            });
            setErrors({
                taskName: true,
                taskText: true,
                taskSolution: false,
                taskBd: true,
                taskDif: true,
            });
            isUpdated = true;
    };

    const onSubmitForm = (event) => {
        isUpdated = false;
        props.onSubmitModal(task);
        props.onModalClose();
        event.preventDefault();
    };

    const onHandleChange = (event) => {
        setTask({
            ...task,
            [event.target.name]: event.target.value,
        })
    };

    const onHandleBlur = (e) => {
        setErrors({
                ...errors,
                [e.target.name]: e.target.value.length !== 0,
        });
    };

    if (task.taskId === undefined && prevTask.taskId !== undefined) {
        setTask({
            taskId: prevTask.id,
            taskName: prevTask.title,
            taskText: prevTask.task_text,
            taskBd: prevTask.sandbox_db,
            taskDif: prevTask.difficulty,
            taskSolution: "",
        });
        setErrors({
            taskName: true,
            taskText: true,
            taskSolution: false,
            taskBd: true,
            taskDif: true,
        });
    }
        const disable = errors.taskName && errors.taskText
            && errors.taskBd && errors.taskSolution;
        console.log(prevTask.taskId);

        return (
            <div className={`modal__wrapper ${props.isOpened ? 'open' : 'close'}`}>
                <div className='modal__body'>
                    <div className='modal__close' onClick={() => {
                        isUpdated = false;
                        props.onModalClose();
                    }}>×</div>
                    <h2>{props.title}</h2>
                    <br/>
                    <form onSubmit={onSubmitForm}>
                        <label>
                            Название:
                            <input type="text" onBlur={onHandleBlur} name="taskName" value={task.taskName || ''} onChange={onHandleChange}/>
                        </label>
                        <label>
                            Текст задания:
                            <input type="textarea" name="taskText" onBlur={onHandleBlur} value={task.taskText || ''} onChange={onHandleChange}/>
                        </label>
                        <label>
                            Решение:
                            <input type="text" name="taskSolution" onBlur={onHandleBlur} value={"" || task.taskSolution} onChange={onHandleChange}/>
                        </label>
                        <label>
                            База данных:
                            <Select
                                style={{ width: '308px' }}
                                id="db"
                                value={task.taskBd}
                                onChange={onHandleChange}
                                name="taskBd"
                            >
                                {Databases.map((el) => {
                                    return (
                                        <MenuItem value={el[1]} key={el[0]}>{el[0]}</MenuItem>
                                    )
                                })}
                            </Select>
                        </label>
                        <label>
                            Сложность:
                            <Select
                                style={{ width: '308px' }}
                                id="dif"
                                value={task.taskDif}
                                onChange={onHandleChange}
                                name="taskDif"
                            >
                                {Difficulty.map((el) => {
                                    return (
                                        <MenuItem value={el[1]} key={el[0]}>{el[0]}</MenuItem>
                                    )
                                })}
                            </Select>
                        </label>
                        <input type="submit" style={{marginTop: '20px', width: '300px'}} disabled={!disable} value="Изменить"/>
                    </form>
                </div>
            </div>
        )
}

export default UpdModal;