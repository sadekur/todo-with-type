const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    dueDate: { type: String, default: null },
    category: { type: String, default: 'personal' },
  },
  { timestamps: true }
)

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema)

module.exports = { Todo }
