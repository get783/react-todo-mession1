import { useTodos } from '../context/TodoContext'

function TodoItem({ todo }) {
    const { removeTodo, toggleTodo } = useTodos()
    return (
        <li key={todo.id}>
            <input
                type="checkbox"
                onChange={() => {
                    toggleTodo(todo.id)
                }}
                checked={todo.checked}
            />
            <span
                style={{
                    textDecoration: todo.checked ? 'line-through' : 'none',
                }}
            >
                {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>X</button>
        </li>
    )
}

export default TodoItem
