import { createContext, useContext, useRef, useState } from 'react'

const TodoContext = createContext()

export function TodoProvider({ children }) {
    const lastId = useRef(0)

    const [todos, setTodos] = useState([])

    const createTodo = (text) => ({
        id: lastId.current++,
        text,
        checked: false
    })

    const addTodo = (text) => {
        const todo = createTodo(text);
        setTodos([todo, ...todos])
    }

    const removeTodo = (seletedId) => {
        const filterTodos = todos.filter((todo) => todo.id != seletedId)
        setTodos(filterTodos)
    }

    const toggleTodo = (seletedId) => {
        const updateTodos = todos.map((todo) => (todo.id == seletedId ? { ...todo, checked: !todo.checked } : todo))
        setTodos(updateTodos)
    }

    const value = {
        todos,
        addTodo,
        removeTodo,
        toggleTodo,
    }

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodos() {
    const context = useContext(TodoContext)

    return context
}