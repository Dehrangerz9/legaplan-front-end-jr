'use client'

import { useState, useEffect, useTransition } from 'react';
import Image from "next/image"
import './toDoList.scss';
import trashIcon from "../assets/trash-icon.png"

export default function ToDoList() {
    const [tasks, setTasks] = useState(['Lavar as mãos','Fazer um Bolo','Lavar a louça']);
    const [completedTasks, setCompletedTasks] = useState(['Levar o lixo para fora']);
    const [isCreateTaskPopup, setCreateTaskPopup] = useState(false);
    const [isDeleteTaskPopup, setDeleteTaskPopup] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [deleteFromCompleted, setDeleteFromCompleted] = useState(false);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const storedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
        setTasks(storedTasks);
        setCompletedTasks(storedCompletedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }, [completedTasks]);

    function addTask() {
        setTasks([...tasks, newTask]);
        setNewTask("");
        setCreateTaskPopup(false);
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

    function closePopup() {
        setCreateTaskPopup(false);
        setDeleteTaskPopup(false);    
    }

    return (
        <div className='toDoList'>
            <div className='tasks'>
                <p>Suas Tarefas Hoje</p>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            <input type="checkbox" className="complete-task" onChange={() => completeTask(index)} />
                            <p>{task}</p>
                            <div onClick={() => { setDeleteTaskPopup(true); setTaskToDelete(index); setDeleteFromCompleted(false); }}>
                                <Image src={trashIcon} alt="deletar tarefa" width={24} height={24} />
                            </div>
                        </li>
                    ))}
                </ul>
                <p>Tarefas Finalizadas</p>
                <ul>
                    {completedTasks.map((task, index) => (
                        <li key={index}>
                            <input type="checkbox" className="complete-task checked" onChange={() => uncompleteTask(index)} />
                            <p className='checked'>{task}</p>
                            <div onClick={() => { setDeleteTaskPopup(true); setTaskToDelete(index); setDeleteFromCompleted(true); }}>
                                <Image src={trashIcon} alt="deletar tarefa" width={24} height={24} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <button className='button confirm' onClick={() => { setCreateTaskPopup(true) }}>Adicionar Tarefa</button>

            {isCreateTaskPopup ? (
                <div className={'popup'}>
                    <div className="popup-inner">
                        <p className='popup-title'>Nova Tarefa</p>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor="new-task"> Título</label>
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                placeholder="Digite"
                                name='new-task'
                            />
                        </div>
                        <div className='popup-buttons'>
                            <button className="button confirm" onClick={addTask}>Adicionar tarefa</button>
                            <button className="button" onClick={closePopup}>Cancelar</button>
                        </div>
                    </div>
                </div>
            ) : null}

            {isDeleteTaskPopup ? (
                <div className={'popup'}>
                    <div className="popup-inner">
                        <p className='popup-title'>Deletar tarefa</p>
                        <p className='popup-description'>Tem certeza que você deseja deletar essa tarefa?</p>
                        <div className='popup-buttons'>
                            <button className="button alert" onClick={confirmDeleteTask}>Deletar Tarefa</button>
                            <button className="button" onClick={closePopup}>Cancelar</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
