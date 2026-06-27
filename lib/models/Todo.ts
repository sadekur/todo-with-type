import mongoose, { Schema, Document } from 'mongoose'

export interface ITodo extends Document {
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate: string | null
  category: string
  createdAt: Date
}

const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    dueDate: { type: String, default: null },
    category: { type: String, default: 'personal' },
  },
  { timestamps: true }
)

export const Todo = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema)
