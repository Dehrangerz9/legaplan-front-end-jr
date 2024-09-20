'use client'

import { useState, useEffect } from 'react';
import Image from "next/image"
import './toDoList.scss';
import trashIcon from "../assets/trash-icon.png"
import Popup from './popup';


export default function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isCreateTaskPopup, setCreateTaskPopup] = useState(false);
    const [isDeleteTaskPopup, setDeleteTaskPopup] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [deleteFromCompleted, setDeleteFromCompleted] = useState(false);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTasks = JSON.parse(localStorage.getItem('tasks'));
            const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks'));
            
            
            if (storedTasks) {
                setTasks(storedTasks);
            } else {
                setTasks(['Lavar as mãos', 'Fazer um Bolo', 'Lavar a louça'])
            }
            if (storedCompletedTasks) {
                setCompletedTasks(storedCompletedTasks);
            } else {
                setCompletedTasks(['Levar o lixo para fora'])
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
        }
    }, [tasks, completedTasks]);

    function addTask() {
        if (newTask.trim()) {
            setTasks([...tasks, newTask.trim()]);
            setNewTask("");
            setCreateTaskPopup(false);
        }
    }

    function confirmDeleteTask() {
        if (deleteFromCompleted) {
            const updatedCompletedTasks = completedTasks.filter((_, i) => i !== taskToDelete);
            setCompletedTasks(updatedCompletedTasks);
        } else {
            const updatedTasks = tasks.filter((_, i) => i !== taskToDelete);
            setTasks(updatedTasks);
        }
        setTaskToDelete(null);
        setDeleteFromCompleted(false);
        setDeleteTaskPopup(false);
    }

    function completeTask(index) {
        const completedTask = tasks[index];
        const updatedTasks = tasks.filter((_, i) => i !== index);
        const updatedCompletedTasks = [...completedTasks, completedTask];

        setTasks(updatedTasks);
        setCompletedTasks(updatedCompletedTasks);
    }

    function uncompleteTask(index) {
        const uncompletedTask = completedTasks[index];
        const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index);
        const updatedTasks = [...tasks, uncompletedTask];

        setCompletedTasks(updatedCompletedTasks);
        setTasks(updatedTasks);
    }

    return (
        <div className='toDoList'>
            <div className='tasks'>
                <p>Suas Tarefas Hoje</p>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            <div style={{display:'flex',gap:'16px',alignItems:'center'}}>
                                <input type="checkbox" className="complete-task" onChange={() => completeTask(index)} />
                                <p>{task}</p>
                            </div>
                            <div onClick={() => { setDeleteTaskPopup(true); setTaskToDelete(index); setDeleteFromCompleted(false);}} className='delete-task'>
                                <Image src={trashIcon} alt="deletar tarefa" width={24} height={24} />
                            </div>
                        </li>
                    ))}
                </ul>
                <p>Tarefas Finalizadas</p>
                <ul>
                    {completedTasks.map((task, index) => (
                        <li key={index}>
                            <div style={{display:'flex',gap:'16px',alignItems:'center'}}>
                                <input type="checkbox" className="complete-task checked" onChange={() => uncompleteTask(index)} />
                                <p className='checked'>{task}</p>
                            </div>
                            <div onClick={() => { setDeleteTaskPopup(true); setTaskToDelete(index); setDeleteFromCompleted(true); }} className='delete-task'>
                                <Image src={trashIcon} alt="deletar tarefa" width={24} height={24} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <button className='button confirm' onClick={() => { setCreateTaskPopup(true) }}>Adicionar Tarefa</button>
            
            {isCreateTaskPopup && (
                <Popup
                    title="Nova Tarefa"
                    onClose={() => setCreateTaskPopup(false)}
                    buttons={[
                        { label: 'Adicionar tarefa', onClick: addTask, type: 'confirm' },
                        { label: 'Cancelar', onClick: () => setCreateTaskPopup(false),  type:'popup-close'}
                    ]}
                >
                    <div style={{display:'flex',flexDirection:"column", gap:"8px"}}>
                        <label htmlFor="new-task">Título</label>
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Digite"
                            name="new-task"
                        />
                    </div>
                </Popup>)}

            {isDeleteTaskPopup && (
                <Popup
                    title="Deletar Tarefa"
                    onClose={() => setDeleteTaskPopup(false)}
                    buttons={[
                        { label: 'Deletar', onClick: confirmDeleteTask, type: 'alert' },
                        { label: 'Cancelar', onClick: () => setDeleteTaskPopup(false), type:'popup-close' }
                    ]}
                >
                    <p>Tem certeza que você deseja deletar essa tarefa?</p>
                </Popup>
            )}
        </div>
    );
}
