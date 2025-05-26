import React, { useEffect, useState } from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import SummaryButton from './SummaryButton'
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  summarizeAndSend,
  updateTodo,
  updatePriority  
} from './api/todos'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import sunIcon from './assets/sun.png'
import moonIcon from './assets/moon.png'

function App() {
  const [todos, setTodos] = useState([])
  const [theme, setTheme] = useState('light')
  const [summary, setSummary] = useState('')
  const [typedSummary, setTypedSummary] = useState('')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const loadTodos = async () => {
    try {
      const { data } = await fetchTodos()
      setTodos(Array.isArray(data) ? data : [])
    } catch (err) {
      toast.error('Failed to load todos')
    }
  }

  useEffect(() => {
    loadTodos()
  }, [])

  const handleAdd = async (task) => {
    try {
      const { todo } = await addTodo({ task })
      setTodos(prev => [...prev, todo])
      toast.success('Added')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id)
      setTodos(prev => prev.filter(t => t.id !== id))
      toast.info('Deleted')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleToggleComplete = async (id, completed) => {
    try {
      const { todo } = await updateTodo(id, completed)
      setTodos(prev => prev.map(t => t.id === id ? todo : t))
    } catch (err) {
      toast.error(err.message)
    }
  }

  // ✅ NEW: Handle priority toggle using updatePriority
  const handlePriorityToggle = async (id, currentPriority) => {
    const priorities = ['low', 'medium', 'high']
    const currentIndex = priorities.indexOf(currentPriority)
    const nextPriority = priorities[(currentIndex + 1) % priorities.length]

    try {
      const updatedTodo = await updatePriority(id, nextPriority)
      setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t))
    } catch (err) {
      toast.error('Failed to update priority')
    }
  }

  const handleSummarize = async () => {
  try {
    const res = await summarizeAndSend()
    setSummary(res.summary)
    setTypedSummary('')
    toast.success('Summary sent to Slack!') // ✅ Add success toast here
  } catch (err) {
    toast.error('Failed to summarize')
  }
}


  useEffect(() => {
    let i = 0
    if (summary) {
      const interval = setInterval(() => {
        setTypedSummary(prev => prev + summary.charAt(i))
        i++
        if (i >= summary.length) clearInterval(interval)
      }, 25)
      return () => clearInterval(interval)
    }
  }, [summary])

  return (
    <div className="app-wrapper">
      <div className="theme-toggle">
        <label className="theme-switch">
          <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
          <span className="slider">
            <span className="ball">
              <img src={theme === 'dark' ? moonIcon : sunIcon} alt="Theme" className="icon-img" />
            </span>
          </span>
        </label>
      </div>

      <div className="todo-box">
        <h1 className="app-title">📝 Todo Summary Assistant</h1>
        <AddTodo onAdd={handleAdd} />
        <TodoList
          todos={todos}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
          onPriorityToggle={handlePriorityToggle} // ✅ pass down
        />
        <div className="summary-btn-container">
          <SummaryButton onClick={handleSummarize} />
        </div>

        <div className="summary-section">
          <h2>📄 Summary</h2>
          <pre className="summary-text">{typedSummary}</pre>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default App
