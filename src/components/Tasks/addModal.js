import React from "react";
import './modalStyle.css';

function AddModal(props) {


    return (
        <div className={`modal__wrapper ${props.isOpened ? 'open' : 'close'}`}>
            <div className='modal__body'>
                <div className='modal__close' onClick={props.onModalClose}>×</div>
                <h2>{props.title}</h2>

            </div>
        </div>
    )
}

export default AddModal;