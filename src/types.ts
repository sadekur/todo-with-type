export type TodoType = {
    id: number;
    title: string;
}

export type Props = {
    todo: TodoType,
    handleDelete: Function
}

export type TodosType = {
    todos: TodoType[]
    handleDelete: Function
}
