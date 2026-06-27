import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Todo } from '@/lib/models/Todo'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    await connectDB()
    const todo = await Todo.findByIdAndUpdate(id, body, { new: true })
    if (!todo) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(todo)
  } catch {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    const todo = await Todo.findByIdAndDelete(id)
    if (!todo) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ message: 'Deleted' })
  } catch {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 })
  }
}
