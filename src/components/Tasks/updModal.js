import React from "react";
import './modalStyle.css';


class UpdModal extends React.Component {
    constructor(props) {
        super(props);
        this.isUpdate = false;
        this.state = {
            taskId: '',
            taskName: '',
            taskText: '',
            taskBd: '',
            errors: {
                taskName: true,
                taskText: true,
                taskSolution: false,
                taskBd: true,
            }
        }
    }

    updatePrev = (s) => {
        if (s !== this.isUpdate) {
            this.setState({
                taskId: this.props.prevTask.id,
                taskName: this.props.prevTask.title,
                taskText: this.props.prevTask.task_text,
                taskBd: this.props.prevTask.sandbox_db,
                taskSolution: "",
                errors: {
                    taskName: true,
                    taskText: true,
                    taskSolution: false,
                    taskBd: true,
                }
            });
            this.isUpdate = true;
        }
    }

    onSubmitForm = (event) => {
        this.isUpdate = false;
        this.props.onModalClose();
        event.preventDefault();
        this.props.onSubmitModal(this.state);
    }

    onHandleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    onHandleBlur = (e) => {
        this.setState({
            errors: {
                ...this.state.errors,
                [e.target.name]: e.target.value.length !== 0,
            }
        });
    }

    render() {
        this.updatePrev(this.props.isOpened);
        const disable = this.state.errors.taskName && this.state.errors.taskText
            && this.state.errors.taskBd && this.state.errors.taskSolution;

        return (
            <div className={`modal__wrapper ${this.props.isOpened ? 'open' : 'close'}`}>
                <div className='modal__body'>
                    <div className='modal__close' onClick={() => {
                        this.isUpdate = false;
                        this.props.onModalClose();
                    }}>×</div>
                    <h2>{this.props.title}</h2>
                    <br/>
                    <form onSubmit={this.onSubmitForm}>
                        <label>
                            Название:
                            <input type="text" onBlur={this.onHandleBlur} name="taskName" value={this.state.taskName} onChange={this.onHandleChange}/>
                        </label>
                        <label>
                            Текст задания:
                            <input type="textarea" name="taskText" onBlur={this.onHandleBlur} value={this.state.taskText} onChange={this.onHandleChange}/>
                        </label>
                        <label>
                            Решение:
                            <input type="text" name="taskSolution" onBlur={this.onHandleBlur} value={"" || this.state.taskSolution} onChange={this.onHandleChange}/>
                        </label>
                        <label>
                            Номер бд:
                            <input type="text" name="taskBd" onBlur={this.onHandleBlur} value={this.state.taskBd} onChange={this.onHandleChange}/>
                        </label>
                        <input type="submit" style={{marginTop: '20px', width: '300px'}} disabled={!disable} value="Изменить"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default UpdModal;