const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Get all todos for a user
router.get('/:userEmail', todoController.getAllTodos);

// Create a new todo
router.post('/', todoController.createTodo);

// Edit a todo
router.put('/:id', todoController.editTodo);

// Delete a todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
