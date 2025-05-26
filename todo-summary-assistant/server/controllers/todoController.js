// server/controllers/todoController.js

import supabase from '../supabaseClient.js';
import llmService from '../services/llmService.js';
import slackService from '../services/slackService.js';

// GET /todos (optional ?completed=false)
export async function getTodos(req, res) {
  try {
    const filter = req.query.completed === 'false' ? { completed: false } : {};
    let query = supabase.from('todos').select('*');
    if ('completed' in filter) query = query.eq('completed', false);

    const { data, error } = await query;
    if (error) throw error;

    res.json({ data });
  } catch (err) {
    console.error('Get todos error:', err.message);
    res.status(500).json({ message: 'Failed to get todos' });
  }
}

// POST /todos
export async function addTodo(req, res) {
  try {
    const { task } = req.body;
    if (!task?.trim()) {
      return res.status(400).json({ message: 'Task cannot be empty' });
    }

    const { data, error } = await supabase
      .from('todos')
      .insert([{ task, completed: false }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ todo: data });
  } catch (err) {
    console.error('Add todo error:', err.message);
    res.status(500).json({ message: 'Failed to add todo' });
  }
}

// DELETE /todos/:id
export async function deleteTodo(req, res) {
  try {
    const id = req.params.id;

    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Todo not found' });

    res.json({ message: 'Todo deleted', todo: data });
  } catch (err) {
    console.error('Delete todo error:', err.message);
    res.status(500).json({ message: 'Failed to delete todo' });
  }
}

// PATCH /todos/:id
export async function updateTodo(req, res) {
  try {
    const id = req.params.id;
    const { completed } = req.body;

    if (typeof completed !== 'boolean') {
      return res.status(400).json({ message: '`completed` must be boolean' });
    }

    const { data, error } = await supabase
      .from('todos')
      .update({ completed })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ todo: data });
  } catch (err) {
    console.error('Update todo error:', err.message);
    res.status(500).json({ message: 'Failed to update todo' });
  }
}

// POST /todos/summarize
export async function summarizeAndSend(req, res) {
  try {
    const { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .eq('completed', false);

    if (error) throw error;

    if (!todos || todos.length === 0) {
      return res.status(400).json({ message: 'No pending todos to summarize' });
    }

    const summary = await llmService.summarizeTodos(todos);
    await slackService.postToSlack(summary);

    res.json({ summary, message: 'Summary sent to Slack successfully' });
  } catch (err) {
    if (err.message === 'no_service') {
      res.status(500).json({ message: 'Slack not configured in .env' });
    } else {
      console.error('Summarize error:', err.message);
      res.status(500).json({ message: 'Failed to summarize or send to Slack' });
    }
  }
}
