const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Student = require('./models/student');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
// ✅ Replace <username>, <password>, and <dbname> in the URI
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));
// CRUD APIs
// GET all students
app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});
// GET one student by ID
app.get('/students/:id', async (req, res) => {
    const student = await Student.findById(req.params.id);
    student ? res.json(student) : res.status(404).send("Not found");
});
// POST - add new student
app.post('/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
});
// PUT - update student
app.put('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    student ? res.json(student) : res.status(404).send("Not found");
});
// DELETE - remove student
app.delete('/students/:id', async (req, res) => {
    const result = await Student.findByIdAndDelete(req.params.id);
    result ? res.json(result) : res.status(404).send("Not found");
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});




