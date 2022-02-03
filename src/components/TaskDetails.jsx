import React, {useState, useEffect, useRef} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {FiEdit} from 'react-icons/fi'

import UserContext from '../UserContext'


import Button from './Button'
import "./TaskDetails.css"

const TaskDetails = () => {

    
    const params = useParams();
    const tasks = React.useContext(UserContext)
    const element = tasks.tasks.find(element => element.id === params.taskId);
    
    
    const history = useHistory();
    
    const handleBackButtonClick = () => {
        history.goBack()
    }
    

    const [isEditing, setIsEditing] = useState(false)
    const edit = () => { setIsEditing(true)}
    const done = () => { setIsEditing(false)}
    const inputRef = useRef()


    useEffect(() => {
        if(isEditing) {
            inputRef.current.focus()
        }
    }, [isEditing]) 
    if(isEditing){
        return <input type="text" onBlur={done} ref={inputRef} className="input-edit"/>
    }else{
    return ( 
        <>
            <div className="back-edit-button-container">
                <Button onClick={handleBackButtonClick}>voltar</Button>
            </div>
            <div className="task-details-container">
                 
                <div className="header-task">
                    <h2>{element.title}</h2>
                    <div className="edit-button" onClick={edit}><FiEdit/></div>
                </div>
                <p>{element.taskInfo}</p>
            </div>
        </>
     );
    }
}
 
export default TaskDetails;