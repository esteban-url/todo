import React from "react"
import PropTypes from "prop-types"
import Todo from "./todo"
import TodoForm from "./todoForm"
import { useLocalStorageState } from "hooks/useLocalStorageState"

const TodoList = ({ listName, ...rest }) => {
  const getNextId = (id) => {
    if (id) return id
    return todos.length === 0 ? 1 : Math.max(...todos.map((x) => x.id)) + 1
  }
  const [todos, setTodos] = useLocalStorageState(`todos:${listName}`, [])

  const handleAdd = (todo) => {
    setTodos([
      {
        id: getNextId(todo.id),
        text: todo.text,
        completed: todo.completed,
      },
      ...todos.filter((x) => x.id !== todo.id),
    ])
  }
  const handleEdit = (todo) => {
    const todosCopy = [...todos]
    todosCopy[todosCopy.findIndex((x) => x.id === todo.id)] = todo
    setTodos(todosCopy)
  }
  const handleDetele = (todo) => {
    setTodos([...todos.filter((x) => x.id !== todo.id)])
  }
  return (
    <ul>
      <li>
        <TodoForm key="new" onSave={handleAdd} />
      </li>
      {todos.length > 0
        ? todos.map((todo) => (
            <Todo
              key={todo.id}
              onDelete={handleDetele}
              onEdit={handleEdit}
              todo={todo}
            />
          ))
        : null}
    </ul>
  )
}
TodoList.propTypes = {
  todos: PropTypes.array,
}
TodoList.defaultProps = {
  todos: [],
}

export default TodoList
