import React, { useState } from "react";
import './modalStyle.css';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";


let task = {};

function AddModal(props) {
        const [ errors, setErrors ] = useState({
            taskName: false,
            taskText: false,
            taskSolution: false,
            taskBd: false,
            taskDif: false,
        });
        const [ dif, setDif ] = useState('');
        const [ dat, setDat ] = useState('');
        console.log(dif);

    const onSubmitForm = (event) => {
        setErrors({
                taskName: false,
                taskText: false,
                taskSolution: false,
                taskBd: false,
                taskDif: false,
            }
        );
        props.onModalClose();
        event.preventDefault();
        props.onSubmitModal(task);
        task = {};
    }

    const onHandleChange = (event) => {
        task[event.target.name] = event.target.value;
    }

    const onHandleDifChange = (event) => {
        setDif(event.target.value);
        task[event.target.name] = dif;
        setErrors({
            ...errors,
            taskDif: true,
        })
    }

    const onHandleDatChange = (event) => {
        setDat(event.target.value);
        task[event.target.name] = dat;
        setErrors({
            ...errors,
            taskBd: true,
        });
    }

    const onHandleBlur = (e) => {
        setErrors({
                ...errors,
                [e.target.name]: e.target.value.length !== 0,
        });
    }
        const disable = errors.taskName && errors.taskText
            && errors.taskBd && errors.taskSolution;
        const { Difficulty, Databases } = props;
        if (Difficulty[0][0] == "Все") Difficulty.shift();
        if (Databases[0][0] == "Все") Databases.shift();

        return (
            <div className={`modal__wrapper ${props.isOpened ? 'open' : 'close'}`}>
                <div className='modal__body'>
                    <div className='modal__close' onClick={ () => {
                        task = {};
                        setErrors({
                                taskName: false,
                                taskText: false,
                                taskSolution: false,
                                taskBd: false,
                                taskDif: false,
                        });
                        props.onModalClose();
                    }}>×</div>
                    <h2>{props.title}</h2>
                    <br/>
                    <form onSubmit={onSubmitForm}>
                        <label>
                            Название:
                            <input type="text" onBlur={onHandleBlur} name="taskName" onChange={onHandleChange}/>
                        </label>
                        <label>
                            Текст задания:
                            <input type="textarea" onBlur={onHandleBlur} name="taskText" onChange={onHandleChange}/>
                        </label>
                        <label>
                            Решение:
                            <input type="text" onBlur={onHandleBlur} name="taskSolution" onChange={onHandleChange}/>
                        </label>
                        <label>
                            База данных:
                            <Select
                                style={{ width: '308px' }}
                                id="db"
                                value={dat}
                                onChange={onHandleDatChange}
                                name="sandbox_db"
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
                                value={dif}
                                onChange={onHandleDifChange}
                                name="difficulty"
                                >
                                {Difficulty.map((el) => {
                                    return (
                                        <MenuItem value={el[1]} key={el[0]}>{el[0]}</MenuItem>
                                    )
                                })}
                            </Select>
                        </label>
                        <input type="submit" style={{marginTop: '20px', width: '300px'}} disabled={!disable} value="Добавить"/>
                    </form>
                </div>
            </div>
        )
}

export default AddModal;