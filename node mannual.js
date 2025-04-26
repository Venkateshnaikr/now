const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
// Middleware
app.use(bodyParser.json());
// In-memory To-Do List
let todos = [
    { id: 1, task: "Learn Node.js" },
    { id: 2, task: "Create To-Do API" }
];
// GET all tasks
app.get('/todos', (req, res) => {
    res.json(todos);
});
// GET a specific task
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    todo ? res.json(todo) : res.status(404).send("Task not found");
});
// POST a new task
app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});
// PUT (update) a task
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.task = req.body.task;
        res.json(todo);
    } else {
        res.status(404).send("Task not found");
    }
});
// DELETE a task
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
        const deleted = todos.splice(index, 1);
        res.json(deleted[0]);
    } else {
        res.status(404).send("Task not found");
    }
});
// Start the server
app.listen(port, () => {
    console.log(`To-Do API server running at http://localhost:${port}`);
});
