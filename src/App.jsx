import React, {useState/* , useEffect */} from 'react'
import {v4 as uuidv4} from 'uuid'
import {BrowserRouter as Router, Route, /* useParams */} from 'react-router-dom'

import UserContext from './UserContext';


import "./App.css"
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Header from './components/Header'
import TaskDetails from './components/TaskDetails'


const App = () => {

  // const params = useParams();
  // const assignments = React.useContext(UserContext)
  //const element = assignments.tasks.find(element => element.id === params.taskId);

  // const handleEditTaskInfo = (taskInfo) => {
  //   const element = assignments.tasks.find(element => element.id === params.taskId);
  //   const newTasks = () => {
  //      
  //   } 

  //   setTasks(newTasks)

  // }

  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Estudar Programação',
      completed: false,
      taskInfo: 'Estudo de tecnologias de programação orientada a objeto',
    },
    {
      id: '2',
      title: 'Ler Livros',
      completed: false,
      taskInfo: 'Ler Livros 1984 de George orwell e segundo livro da série trono de vidro'
    },
  ])


  const handleTaskAddition = (taskTitle) => {
    const newTasks = [...tasks, {
      title: taskTitle,
      id: uuidv4(),
      completed: false,
      taskInfo: '',
    },
  ];

    setTasks(newTasks)

  }

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if(task.id === taskId) {
        return{ ...task, completed: !task.completed}
      }
      return task;
    })

    setTasks(newTasks)
  }

  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)

    setTasks(newTasks)
  }

  


  return (
    <>
      <UserContext.Provider value={{ tasks }} >
        <Router>
          <div className="container">
            <Header />
            <Route
              path="/"
              exact
              render={() => (
                <>
                  <AddTask handleTaskAddition={handleTaskAddition} />
                  <Tasks
                    tasks={tasks}
                    handleTaskClick={handleTaskClick}
                    handleTaskDeletion={handleTaskDeletion} />
                </>
              )} />
            <Route
              path="/:taskId"
              exact
              component={TaskDetails} />
          </div>
        </Router>
      </UserContext.Provider>
    </>
          
  )
}

export default App;