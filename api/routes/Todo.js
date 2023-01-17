const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

//Get all todos for a user
router.get('/:email', async (req, res) => {
    const todos = await Todo.find({email: req.params.email});

    res.json(todos);
});

//Delete todo
router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await Todo.findByIdAndDelete(req.params.id);
        res.json(response);
    } catch(err) {
        res.json(err);
    }
});

//Post todo
router.post('/create', async (req, res) => {
    const todo = new Todo({
        email: req.body.email,
        text: req.body.text
    });

    todo.save();

    res.json(todo);
});

//Complete Todo
router.put('/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.completed = !todo.completed;

    todo.save();

    res.json(todo);
})

//Edit Todo
router.put('/edit/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.text = req.body.text;

    todo.save();

    res.json(todo);
})

module.exports = router;
