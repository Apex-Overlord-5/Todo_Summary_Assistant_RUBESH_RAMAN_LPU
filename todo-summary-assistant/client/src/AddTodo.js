import React, { useState } from 'react'
import { motion } from 'framer-motion'

function AddTodo({ onAdd }) {
  const [task, setTask] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = task.trim()
    if (!trimmed) return

    setIsSubmitting(true)
    try {
      await onAdd(trimmed)
      setTask('')
    } catch (err) {
      console.error('Failed to add task:', err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="add-todo-container"
    >
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task..."
        className="add-todo-input"
        disabled={isSubmitting}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="add-todo-button"
        disabled={isSubmitting || !task.trim()}
      >
        {isSubmitting ? 'Adding...' : 'Add'}
      </motion.button>
    </motion.form>
  )
}

export default AddTodo
