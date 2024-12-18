import TaskList from './components/TaskList.jsx';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const convertFromApi = (apiTask) => {
  return {
    ...apiTask,
    isComplete: apiTask.is_complete,
  };
};

const App = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/tasks')
      .then(response => {
        const updatedTasks = response.data.map(convertFromApi);
        setTaskData(updatedTasks);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const toggleCompletedTask = (id, isComplete) => {
    const endpoint = isComplete ? `/tasks/${id}/mark_incomplete` : `/tasks/${id}/mark_complete`;

    axios.patch(`http://127.0.0.1:5000${endpoint}`)
      .then(() => {
        const updatedTasks = taskData.map((task) => {
          if (task.id === id) {
            return { ...task, isComplete: !task.isComplete };
          } else {
            return task;
          }
        });
        setTaskData(updatedTasks);
      })
      .catch((error) => {
        console.log('Toggle error:', error);
        throw error;
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:5000/tasks/${id}`)
      .then(() => {
        const updatedTasks = taskData.filter((task) => task.id !== id);
        setTaskData(updatedTasks);
      })
      .catch((error) => {
        console.log('Delete Task Error', error);
      });
  };

  
  const addTaskData = (newTask) => {
    axios.post(`http://127.0.0.1:5000/tasks`)
      .then(() => {
        const updatedTasks = taskData.map((task) => {
          return { ...task, newTask };
        });
        setTaskData(updatedTasks);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={taskData}
          onComplete={toggleCompletedTask}
          deleteTask={deleteTask} />}

          {<NewTaskForm onTaskAdd={addTaskData}

          />}

        </div>
      </main>
    </div>
  );
};

export default App;
