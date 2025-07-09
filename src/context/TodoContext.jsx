import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getStorage, setStorage } from '../utils/storage'

const TodoContext = createContext()

export function TodoProvider({ children }) {
    // Initialize lastId based on existing todos in storage
    const initialTodos = getStorage("todos", []);
    const initialLastId = initialTodos.length > 0
        ? Math.max(...initialTodos.map(todo => todo.id)) + 1
        : 0;
    // const initialLastId = initialTodos.length > 0
    //     ? initialTodos.at(-1).id + 1
    //     : 0;
    const lastId = useRef(initialLastId)

    const [todos, setTodos] = useState(initialTodos)

    useEffect(() => {
        setStorage("todos", JSON.stringify(todos))
        // Ensure lastId is always one more than the max id in todos
        if (todos.length > 0) {
            lastId.current = Math.max(...todos.map(todo => todo.id)) + 1;
        } else {
            lastId.current = 0;
        }
    }, [todos])

    const createTodo = (text) => ({
        id: lastId.current++,
        text,
        checked: false
    })

    const addTodo = (text) => {
        const newTodo = createTodo(text)
        setTodos([newTodo, ...todos])
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