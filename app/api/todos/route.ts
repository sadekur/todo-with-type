import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Todo } from '@/lib/models/Todo'

export async function GET() {
  try {
    await connectDB()
    const todos = await Todo.find().sort({ createdAt: -1 })
    return NextResponse.json(todos)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    await connectDB()
    const todo = await Todo.create({
      title: body.title,
      priority: body.priority || 'medium',
      dueDate: body.dueDate || null,
      category: body.category || 'personal',
    })
    return NextResponse.json(todo, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 })
  }
}
