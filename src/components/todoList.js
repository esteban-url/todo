import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Todo from "./todo"
import TodoForm from "./todoForm"
import { client } from "utils/api-client"
import { useAsync } from "hooks/useAsync"
import Emoji from "./emoji"

const TodoList = ({ tenant = "esteban", listName = "main", ...rest }) => {
  const { error, run, isLoading, isError } = useAsync()

  useEffect(() => {
    if (!listName || !tenant) return
    run(client(`t/${tenant}/${listName}`)).then((result) => setTodos(result))
  }, [run, tenant, listName])

  const [todos, setTodos] = useState([])
  const [showFilter, setShowFilter] = React.useState("all")

  const todosCounts = {
    all: todos ? todos.length : 0,
    completed: todos ? todos.filter((x) => x.completed).length : 0,
    pending: todos ? todos.filter((x) => !x.completed).length : 0,
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
    run(
      client(``, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenant,
          list: listName,
          title: todo.title,
          completed: todo.completed,
        }),
      })
    ).then((result) => setTodos([result, ...todos]))
  }
  const handleEdit = (todo) => {
    run(
      client(todo.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenant,
          list: listName,
          title: todo.title,
          completed: todo.completed,
        }),
      })
    ).then((result) => {
      const todosCopy = [...todos]
      todosCopy[todosCopy.findIndex((x) => x.id === todo.id)] = result
      setTodos(todosCopy)
    })
  }
  const handleDetele = (todo) => {
    run(
      client(todo.id, {
        method: "DELETE",
      })
    ).then((result) => {
      setTodos([...todos.filter((x) => x.id !== result.id)])
    })
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
      {isLoading ? <span className="text-gray-500">loading....</span> : null}
      {isError ? (
        <p className="text-red-500">There's been an error: {error.message}</p>
      ) : null}
      <ul>
        <li>
          <TodoForm key="new" onSave={handleAdd} />
        </li>

        {todos.length > 0 ? (
          todos
            .filter((x) => filterTodos(x))
            .map((todo) => (
              <Todo
                key={todo.id}
                onDelete={handleDetele}
                onEdit={handleEdit}
                todo={todo}
              />
            ))
        ) : (
          <li>
            <p className="p-5 mx-auto text-gray-500 ">
              There's nothing to do, go take a nap or call a friend{" "}
              <Emoji
                label="smiling face with squinting eyes"
                symbol="😊"
              ></Emoji>
            </p>
          </li>
        )}
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
