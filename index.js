const express = require('express');

const app = express();
app.use(express.json())
const PORT = 3000;

// Middleware to parse form data (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// All tasks list
let todos = [
    { id: 1, task: "Library visit" },
    { id: 2, task: "Selecting the book" },
    { id: 3, task: "Issue of book" },
    { id: 4, task: "Checkout" },
    { id: 5, task: "Reading book" }
];

// 1. GET - Display all tasks
app.get('/todos', (req, res) => {
    let response = `<h2>Library Tasks</h2><ul>`;
    todos.forEach(todo => { 
        response += `<li>${todo.id}. ${todo.task}</li>`; 
    });
    response += `</ul>`;
    res.send(response);
});

// 2. POST - Add a new task (Form Data: task=<task name>)
app.post('/todos/add', (req, res) => {
    const newTask = req.body.task; // Extracting task from form data

    if (!newTask) {
        return res.send("<p>Task cannot be empty</p>");
    }

    const newId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const newTodo = {
        id: newId,
        task: newTask
    };

    todos.push(newTodo);

    res.send(`<p>Task '${newTask}' added successfully!</p>`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
