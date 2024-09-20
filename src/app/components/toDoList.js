'use client'

import {useState} from 'react';
import Image from "next/image"
import './toDoList.scss';
import trashIcon from "../assets/trash-icon.png"

export default function ToDoList() {
    const [tasks,setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || ['Babidi','Ir ao HTML']);
    const [completedTasks,setCompletedTask] = useState(JSON.parse(localStorage.getItem('completedTasks')) || ['Fazer o site em next.js','Acordar']);
    const [isCreateTaskPopup,setCreateTaskPopup] = useState(false);
    const [isDeleteTaskPopup,setDeleteTaskPopup] = useState(false);
    const [taskToDelete,setTaskToDelete] = useState(null)
    const [newTask,setNewTask] = useState("")
    
    function addTask(){
        setTasks([...tasks,newTask])
        setNewTask("")
        setCreateTaskPopup(false)
    }

    function completeTask(index){
        const completedTask = tasks[index];
        const updatedTasks = tasks.filter((_, i) => i !== index); 
        const updatedCompletedTasks = [...completedTasks, completedTask];
    
        setTasks(updatedTasks);
        setCompletedTask(updatedCompletedTasks);
    
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
    }

    function uncompleteTask(index){
        const uncompletedTask = completedTasks[index];
        const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index); 
        const updatedTasks = [...tasks, uncompletedTask];

        setCompletedTask(updatedCompletedTasks);
        setTasks(updatedTasks);
        
    
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
    }

    return(<div className='toDoList'>
        <div className='tasks'>
            <p>Suas Tarefas Hoje</p>      
            <ul>
                {tasks.map((task,index)=>(
                    <li key={index}>
                        <input type="checkbox" className="complete-task" onChange={()=> completeTask(index)}/> <p>{task}</p>  <div><Image src={trashIcon} alt="deletar tarefa" width={24} height={24}/></div>
                    </li>
                ))}
            </ul>
            <p>Tarefas Finalizadas</p>
            <ul>
                {completedTasks.map((task,index)=>(
                    <li key={index}>
                        <input type="checkbox" className="complete-task checked"  onChange={()=> uncompleteTask(index)}/> <p className='checked'>{task}</p> <div><Image src={trashIcon} alt="deletar tarefa" width={24} height={24}/></div>
                    </li>
                ))}
            </ul>
        </div>
        <button className='button' onClick={()=>{setCreateTaskPopup(true)}}>Adicionar Tarefa</button>
        {isCreateTaskPopup ? (
            <div className="popup">
                <div className="popup-inner">
                    <p className='popup-title'>Nova Tarefa</p>
                    <input 
                        type="text" 
                        value={newTask} 
                        onChange={(e) => setNewTask(e.target.value)} 
                        placeholder="Digite" 
                    />
                    <button className="button" onClick={addTask}>Adicionar tarefa</button>
                    <button className="button" onClick={() => {setCreateTaskPopup(false); setCreateTaskPopup(false)}}>X</button>
                </div>
            </div>
        ) : null }
    </div>);
}