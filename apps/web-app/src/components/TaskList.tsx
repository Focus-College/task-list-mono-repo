import React, { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ITask, useTaskList } from '../data/useTaskList';

function TaskList(){

    const { taskList, setTaskList, create, markDone } = useTaskList();
    const [ newTaskDescription, setNewTaskDescription ] = useState<string>("");
    

    function onClickAdd(){
        newTaskDescription.split("\n").filter(d=>!!d).forEach(( description:string ) => create( description ));
        setNewTaskDescription("");
    }

    function onChangeNewTaskDescription( event:ChangeEvent<HTMLTextAreaElement> ){
        setNewTaskDescription(event.target.value);
    }

    function onCheckTaskHandler( task:ITask ){
        
        return function( event:ChangeEvent<HTMLInputElement> ){
            markDone(task.id, event.target.checked);
        }

    }

    function onDeleteTaskHandler( index:number ){
        return function(){
            setTaskList(taskList.filter((task, i) => i !== index));
        }
    }

    function onUpdateDescriptionHandler( index:number ){
        return function( event:ChangeEvent<HTMLInputElement> ){
            const newTask = { ...taskList[index] };
            const newList = [ ...taskList ];

            newTask.description = event.target.value;
            newList[index] = newTask;
            
            setTaskList( newList );
        }
    }

    return (
        <div className="task-list-container">
            <h1>To Do List</h1>
            <div className="task-list">
                { taskList.map(( task, index ) => <div key={index} style={{ textAlign: 'left' }}>
                    <input type="checkbox" onChange={onCheckTaskHandler(task)}/>
                    <input type="textbox" value={task.description} onChange={onUpdateDescriptionHandler(index)}/>
                    <button onClick={onDeleteTaskHandler(index)}>Delete Item</button>
                </div> )}
            </div>

            <h1>Create To Do List Item</h1>
            <div className="task-create-form">
                <textarea value={newTaskDescription} style={{ width: '100%', height:"150px" }} onChange={onChangeNewTaskDescription} />
                <button onClick={onClickAdd}>Add to Task List</button>
            </div>
        </div>
    );


}

export default TaskList;