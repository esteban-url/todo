import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Todo from "./todo"
import TodoForm from "./todoForm"
import { client } from "utils/api-client"
import { useAsync } from "hooks/useAsync"
import Emoji from "./emoji"

const actionTypes = {
  add: "ADD",
  delete: "DELETE",
  edit: "EDIT",
  filter: "FILTER",
  addMultiple: "ADD_MULTIPLE",
}
const filterTypes = {
  all: "ALL",
  completed: "COMPLETED",
  pending: "PENDING",
}
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.add:
      return {
        ...state,
        filter: filterTypes.all,
        todos: [action.payload, ...state.todos],
      }
    case actionTypes.addMultiple:
      return {
        ...state,
        filter: filterTypes.all,
        todos: [...action.payload, ...state.todos],
      }
    case actionTypes.delete:
      return {
        ...state,
        filter: filterTypes.all,
        todos: [...state.todos.filter((x) => x.id !== action.payload.id)],
      }
    case actionTypes.edit:
      const todosCopy = [...state.todos]
      todosCopy[todosCopy.findIndex((x) => x.id === action.payload.id)] =
        action.payload
      return {
        ...state,
        filter: filterTypes.all,
        todos: todosCopy,
      }
    case actionTypes.filter:
      return {
        ...state,
        filter: action.payload,
      }

    default:
      return state
  }
}

const TodoList = ({ tenant = "esteban", listName = "main", ...rest }) => {
  const { error, run, isLoading, isError } = useAsync()
  const [state, dispatch] = React.useReducer(reducer, {
    todos: [],
    filter: filterTypes.all,
  })
  useEffect(() => {
    if (!listName || !tenant) return
    run(client(`t/${tenant}/${listName}`)).then((result) =>
      dispatch({ type: actionTypes.addMultiple, payload: result })
    )
  }, [run, tenant, listName])

  const todosCounts = {
    all: state.todos ? state.todos.length : 0,
    completed: state.todos ? state.todos.filter((x) => x.completed).length : 0,
    pending: state.todos ? state.todos.filter((x) => !x.completed).length : 0,
  }

  const filterTodos = (x) => {
    switch (state.filter) {
      case filterTypes.all:
        return true
      case filterTypes.completed:
        return x.completed
      case filterTypes.pending:
        return !x.completed
      default:
        return true
    }
  }

  const handleAdd = (todo) => {
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
    ).then((result) => dispatch({ type: actionTypes.add, payload: result }))
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
    ).then((result) => dispatch({ type: actionTypes.edit, payload: result }))
  }

  const handleDetele = (todo) => {
    run(
      client(todo.id, {
        method: "DELETE",
      })
    ).then((result) => dispatch({ type: actionTypes.delete, payload: result }))
  }

  const FilterButton = ({ filter = filterTypes.all, symbol }) => {
    return (
      <button
        onClick={() => dispatch({ type: actionTypes.filter, payload: filter })}
        className={`btn ${state.filter === filter ? "btn-blue" : "btn-gray"}`}
      >
        <Emoji symbol={symbol} label={filter} />
        <span className="ml-2">
          {filter.toLowerCase()} ({todosCounts[filter]}
        </span>
        )
      </button>
    )
  }

  return (
    <>
      <FilterButton symbol="📘" filter={filterTypes.all} />
      <FilterButton symbol="😎" filter={filterTypes.completed} />
      <FilterButton symbol="⏱" filter={filterTypes.pending} />
      {isLoading ? <span className="text-gray-500">loading....</span> : null}
      {isError ? (
        <p className="text-red-500">There's been an error: {error.message}</p>
      ) : null}

      <ul>
        <li>
          <TodoForm key="new" onSave={handleAdd} />
        </li>

        {state.todos.length > 0 ? (
          state.todos
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
              <Emoji label="smiling face with squinting eyes" symbol="😊" />
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
