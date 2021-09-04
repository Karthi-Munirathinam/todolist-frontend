import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

function ToDoCards({ mytodo, handleEdit, handleDelete, handlecheckbox }) {


    return (
        <div className="col-md-10">
            <div className="card card-todo">
                <div className="content-wrapper">
                    <div className="checkbtn">
                        <IconButton aria-label="edit" type="checkbox" color="primary" onClick={() => handlecheckbox(mytodo._id)}>
                            {mytodo.status ? <CheckCircleRoundedIcon style={{ color: "#00e676" }} /> :
                                <RadioButtonUncheckedIcon style={{ color: "#42a5f5" }} />
                            }
                        </IconButton>
                    </div>
                    <span className={`content ${mytodo.status ? 'checked' : ''}`}>{mytodo.task}</span>
                </div>
                <div>
                    <IconButton aria-label="edit" color="secondary" onClick={() => handleEdit(mytodo._id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => handleDelete(mytodo._id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default ToDoCards
