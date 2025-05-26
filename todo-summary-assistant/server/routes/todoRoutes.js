// server/routes/todoRoutes.js

import express from 'express';
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  summarizeAndSend
} from '../controllers/todoController.js';

const router = express.Router();

// CRUD routes
router.get('/', getTodos);
router.post('/', addTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id', updateTodo);

// Summarize & send to Slack
router.post('/summarize', summarizeAndSend);

export default router;
