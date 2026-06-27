const { Router } = require('express')
const { connectDB } = require('../db')
const { Todo } = require('../models/Todo')

const router = Router()

router.get('/', async (_req, res) => {
  try {
    await connectDB()
    const todos = await Todo.find().sort({ createdAt: -1 })
    res.json(todos)
  } catch {
    res.status(500).json({ error: 'Failed to fetch todos' })
  }
})

router.post('/', async (req, res) => {
  try {
    await connectDB()
    const todo = await Todo.create({
      title: req.body.title,
      priority: req.body.priority || 'medium',
      dueDate: req.body.dueDate || null,
      category: req.body.category || 'personal',
    })
    res.status(201).json(todo)
  } catch {
    res.status(500).json({ error: 'Failed to create todo' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    await connectDB()
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!todo) return res.status(404).json({ error: 'Not found' })
    res.json(todo)
  } catch {
    res.status(500).json({ error: 'Failed to update todo' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await connectDB()
    const todo = await Todo.findByIdAndDelete(req.params.id)
    if (!todo) return res.status(404).json({ error: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch {
    res.status(500).json({ error: 'Failed to delete todo' })
  }
})

module.exports = router
