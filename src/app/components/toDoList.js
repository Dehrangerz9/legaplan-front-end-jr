'use client'

import {useState} from 'react';
import Image from "next/image"
import './toDoList.scss';
import trashIcon from "../assets/trash-icon.png"

export default function ToDoList() {
    const [tasks,setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || ['Babidi','Ir ao HTML']);
    const [completedTasks,setCompletedTask] = useState(JSON.parse(localStorage.getItem('completedTasks')) || ['Fazer o site em next.js','Acordar']);
    
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
            <p>Tarefas finalizadas</p>
            <ul>
                {completedTasks.map((task,index)=>(
                    <li key={index}>
                        <input type="checkbox" className="complete-task checked"  onChange={()=> uncompleteTask(index)}/> <p className='checked'>{task}</p> <div><Image src={trashIcon} alt="deletar tarefa" width={24} height={24}/></div>
                    </li>
                ))}
            </ul>
        </div>
        <button className='button'>Adicionar Tarefa</button>
    </div>);
}