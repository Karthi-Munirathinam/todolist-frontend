import React, { useEffect, useState } from 'react';
import './todocard.css';
import Button from '@material-ui/core/Button';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ToDoCards from './card';
import axios from '../connections/axios.js';
import EditIcon from '@material-ui/icons/Edit';

function Todocard() {
    const [addTask, setAddTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentid, setCurrentid] = useState('');
    const handlecheckbox = async (id) => {
        let stats = '';
        const selectedIndex = tasks.findIndex(obj => obj._id === id);
        if (tasks[selectedIndex]?.status !== true) stats = true;
        else stats = false;
        let obj = {
            task: tasks[selectedIndex].task,
            status: stats
        }
        await axios.put(`/updatetask/${id}`, obj);
        fetchData();
    }

    const fetchData = async () => {
        let task = await axios.get('/', (err) => {
            if (err) console.log(err);
        });
        setTasks(task.data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    let handlechange = (e) => {
        setAddTask(e.target.value)
    }

    let handlecreate = async () => {
        try {
            let obj = {
                task: addTask,
                status: false
            }
            await axios.post('/createtask', obj);
            setAddTask('');
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }

    let handleedit = (id) => {
        setEdit(true);
        setCurrentid(id);
        let selectedObj = tasks.findIndex(obj => obj._id === id);
        let selectedtask = tasks[selectedObj]
        setAddTask(selectedtask.task);
    }

    const handleedittask = async (id) => {
        const selectedIndex = tasks.findIndex(obj => obj._id === id);
        let obj = {
            task: addTask,
            status: tasks[selectedIndex]?.status
        }
        await axios.put(`/updatetask/${id}`, obj);
        setEdit(false);
        setAddTask('');
        fetchData();
    }

    let handledelete = async (id) => {
        try {
            let confirm = window.confirm('Are you sure to delete?');
            if (confirm) {
                await axios.delete(`/deletetask/${id}`);
                fetchData();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container todoarea">
            <div className="row addtodo">
                <div className="col-md-10">
                    <div className="input-group">
                        <input type="text" value={addTask} onChange={(e) => handlechange(e)} className="form-control inputtodo" placeholder="todos..." aria-label="todo input box with add button" />
                        <Button variant="contained" color="secondary" onClick={() => !edit ? handlecreate() : handleedittask(currentid)}>
                            {edit ? <EditIcon /> : <AddRoundedIcon />}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="row addtodo">
                {
                    tasks.map((todo) => {
                        return <ToDoCards key={`${todo._id}`} mytodo={todo} handleEdit={handleedit} handleDelete={handledelete} handlecheckbox={handlecheckbox} />
                    })
                }
            </div>
        </div>
    )
}

export default Todocard
