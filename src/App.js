import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About'

const App = () => {
  const [task, setTask] = useState([]);

  const [add, setAdd] = useState(false)


  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks()
      setTask(tasks);
    }
    getTasks()
  }, [])


  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = res.json()
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = res.json()
    return data;
  }


  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTask(task.filter((tasks) => tasks.id !== id))
  }

  const toggleReminder = async (id) => {
    const tastToToggle = await fetchTask(id);
    const updateTask = {...tastToToggle, reminder: !tastToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateTask)
      }
    )
    const data = await res.json()
    setTask(task.map(task => task.id === id 
      ? { ...task, reminder: data.reminder }: task))
  }

  const onAdd = async (taskAdd) => {
    const res = await fetch('http://localhost:5000/tasks',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(taskAdd)
    },
    );
    const data = await res.json()
    setTask([...task, data])
  }

  const toggleInput = () => {
    console.log('button toggled again')
    setAdd(!add);
  }

  return (
    <Router>
    <div className="App">
      <Header onShowAdd={toggleInput} onButton={add} />
        <Route path='/' exact render={(props) => (
          <>
            {add && <AddTask onAdd={onAdd} />}
            {task.length > 0 ? <Tasks tasks={task} 
            onDelete={deleteTask} onRemind={toggleReminder} />
            : 'No Task to show'}
          </>
        )}></Route>
        <Route path='/about' component={About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
