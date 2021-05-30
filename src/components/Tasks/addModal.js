import React from "react";
import './modalStyle.css';


class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.task = {};
        this.state = {
            errors: {
                taskName: false,
                taskText: false,
                taskSolution: false,
                taskBd: false,
            }
        };
    }

    onSubmitForm = (event) => {
        this.setState({
            errors: {
                taskName: false,
                taskText: false,
                taskSolution: false,
                taskBd: false,
            }
        });
        this.props.onModalClose();
        event.preventDefault();
        this.props.onSubmitModal(this.task);
        this.task = {};
    }

    onHandleChange = (event) => {
        this.task[event.target.name] = event.target.value;
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
        const disable = this.state.errors.taskName && this.state.errors.taskText
            && this.state.errors.taskBd && this.state.errors.taskSolution;

        return (
            <div className={`modal__wrapper ${this.props.isOpened ? 'open' : 'close'}`}>
                <div className='modal__body'>
                    <div className='modal__close' onClick={ () => {
                        this.task = {};
                        this.setState({
                            errors: {
                                taskName: false,
                                taskText: false,
                                taskSolution: false,
                                taskBd: false,
                            }
                        });
                        this.props.onModalClose();
                    }}>×</div>
                    <h2>{this.props.title}</h2>
                    <br/>
                    <form onSubmit={this.onSubmitForm}>
                        <label>
                            Название:
                            <input type="text" onBlur={this.onHandleBlur} name="taskName" onChange={this.onHandleChange}/>
                        </label>
                        <label>
                            Текст задания:
                            <input type="textarea" onBlur={this.onHandleBlur} name="taskText" onChange={this.onHandleChange}/>
                        </label>
                        <label>
                            Решение:
                            <input type="text" onBlur={this.onHandleBlur} name="taskSolution" onChange={this.onHandleChange}/>
                        </label>
                        <label>
                            Номер бд:
                            <input type="text" onBlur={this.onHandleBlur} name="taskBd" onChange={this.onHandleChange}/>
                        </label>
                        <input type="submit" style={{marginTop: '20px', width: '300px'}} disabled={!disable} value="Добавить"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddModal;