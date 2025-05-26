import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PRIORITY_ORDER = ['high', 'medium', 'low']
const PRIORITY_COLORS = {
  high: '#e74c3c',
  medium: '#f39c12',
  low: '#2ecc71',
}

function TodoList({ todos = [], onDelete, onToggleComplete, onPriorityToggle }) {
  const [openId, setOpenId] = useState(null)

  if (!Array.isArray(todos) || todos.length === 0) {
    return <p className="loading-text">No todos found.</p>
  }

  return (
    <ul className="todo-list">
      <AnimatePresence>
        {todos.map(todo => {
          if (!todo || !todo.id || !todo.task) return null
          const { id, task, completed, priority = 'medium' } = todo

          return (
            <motion.li
              key={id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="todo-item"
            >
              {/* Task Text */}
              <span
                className={`todo-text ${completed ? 'completed' : ''}`}
                onClick={() => onToggleComplete(id, !completed)}
                title="Click to mark complete/incomplete"
              >
                {task}
              </span>

              

              {/* Delete Button */}
              <motion.button
                onClick={() => onDelete(id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="delete-btn"
                title="Delete"
                aria-label="Delete todo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="delete-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 3V4H4V6H5V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V6H20V4H15V3H9ZM7 6H17V20H7V6ZM9 8V18H11V8H9ZM13 8V18H15V8H13Z" />
                </svg>
              </motion.button>
            </motion.li>
          )
        })}
      </AnimatePresence>
    </ul>
  )
}

export default TodoList
