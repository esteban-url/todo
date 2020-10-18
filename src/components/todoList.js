import React from "react"
import PropTypes from "prop-types"
import Todo from "./todo"
import TodoForm from "./todoForm"
import { useLocalStorageState } from "hooks/useLocalStorageState"

const TodoList = ({ listName, ...rest }) => {
  const [todos, setTodos] = useLocalStorageState(`todos:${listName}`, [])
  const [showFilter, setShowFilter] = React.useState("all")

  const todosCounts = {
    all: todos.length,
    completed: todos.filter((x) => x.completed).length,
    pending: todos.filter((x) => !x.completed).length,
  }
  const getNextId = (id) => {
    if (id) return id
    return todos.length === 0 ? 1 : Math.max(...todos.map((x) => x.id)) + 1
  }

  const filterTodos = (x) => {
    switch (showFilter) {
      case "all":
        return true
      case "completed":
        return x.completed
      case "pending":
        return !x.completed
      default:
        return true
    }
  }
  const handleAdd = (todo) => {
    setShowFilter("all")
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
  const FilterButton = ({ filter = "all" }) => {
    filter = filter.toLowerCase()
    return (
      <button
        onClick={() => setShowFilter(filter)}
        className={`btn ${showFilter === filter ? "btn-blue" : "btn-gray"}`}
      >
        {filter} ({todosCounts[filter]})
      </button>
    )
  }
  return (
    <>
      <FilterButton filter="all" />
      <FilterButton filter="completed" />
      <FilterButton filter="pending" />

      <ul>
        <li>
          <TodoForm key="new" onSave={handleAdd} />
        </li>
        {todos.length > 0
          ? todos
              .filter((x) => filterTodos(x))
              .map((todo) => (
                <Todo
                  key={todo.id}
                  onDelete={handleDetele}
                  onEdit={handleEdit}
                  todo={todo}
                />
              ))
          : null}
      </ul>
    </>
  )
}
TodoList.propTypes = {
  todos: PropTypes.array,
}
TodoList.defaultProps = {
  todos: [],
}

export default TodoList
