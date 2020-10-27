import React from "react"
import PropTypes from "prop-types"
import TodoForm from "./todoForm"
const Todo = ({ todo, onDelete, onEdit, ...rest }) => {
  const [editMode, setEditMode] = React.useState(false)
  const handleDelete = () => {
    onDelete(todo)
  }
  const handleSave = (editedTodo) => {
    setEditMode(false)
    onEdit(editedTodo)
  }
  const handleComplete = () => {
    onEdit({ ...todo, completed: !todo.completed })
  }
  const CompleteButton = () => {
    return (
      <button
        className={`btn flex-none ${
          todo.completed ? " btn-green" : "btn-gray"
        }`}
        onClick={handleComplete}
      >
        <svg
          className={`w-6 h-6`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {todo.completed ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          )}
        </svg>
      </button>
    )
  }
  return (
    <li key={todo.id} className="group flex py-1">
      <CompleteButton />

      {editMode ? (
        <>
          <TodoForm className="flex-grow" todo={todo} onSave={handleSave} />
          <button
            className="btn btn-gray flex-none"
            onClick={() => setEditMode(false)}
          >
            <svg
              className={`w-6 h-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </>
      ) : (
        <>
          <span
            className={`flex-grow pl-4 py-2 ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </span>
          <div className="opacity-0 group-hover:opacity-100 group-focus:opacity-100">
            <CompleteButton />

            <button
              className="btn btn-gray flex-none"
              onClick={() => setEditMode(true)}
            >
              <svg
                className={`w-6 h-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button className="btn btn-red flex-none" onClick={handleDelete}>
              <svg
                className={`w-6 h-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </li>
  )
}
Todo.propTypes = {
  todo: PropTypes.object,
  onSave: PropTypes.func,
}
Todo.defaultProps = {
  todo: { id: null, title: "asd", completed: false },
}
export default Todo
