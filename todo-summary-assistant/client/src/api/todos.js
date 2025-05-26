const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// ✅ Fetch only incomplete todos
export async function fetchTodos() {
  const res = await fetch(`${API_BASE}/todos?completed=false`);
  if (!res.ok) throw new Error('Failed to fetch todos');
  const json = await res.json();
  return Array.isArray(json) ? { data: json } : json;
}

// ✅ Add new todo
export async function addTodo({ task }) {
  const res = await fetch(`${API_BASE}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to add todo');
  }
  const json = await res.json();
  return json; // { todo }
}

// ✅ Delete a todo
export async function deleteTodo(id) {
  const res = await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete todo');
  }
  return res.json(); // { message, todo }
}

// ✅ Update completed status
export async function updateTodo(id, completed) {
  const res = await fetch(`${API_BASE}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update todo');
  }
  const json = await res.json();
  return { todo: json };
}

// ✅ Final and correct updatePriority function
export async function updatePriority(id, priority) {
  try {
    const res = await fetch(`${API_BASE}/todos/${id}/priority`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priority }),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || 'Failed to update priority');

    return result.todo; // return updated todo
  } catch (error) {
    console.error('Update priority failed:', error.message);
    return null;
  }
}

// ✅ Summarize and send to Slack
export async function summarizeAndSend() {
  const res = await fetch(`${API_BASE}/todos/summarize`, { method: 'POST' });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to summarize: ${errorText}`);
  }
  return res.json(); // { summary: '...' }
}
