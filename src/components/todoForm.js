import React from "react"
import PropTypes from "prop-types"
const TodoForm = ({ todo: initialTodo, onSave, ...rest }) => {
  const [todo, setTodo] = React.useState(initialTodo)

  const handleChange = (event) => {
    setTodo({ ...todo, text: event.target.value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (todo.text === "") return
    setTodo({ id: null, text: "", completed: false })

    onSave(todo)
  }
  return (
    <form onSubmit={handleSubmit} {...rest}>
      {/* {todo.id === null ? <p>Add a new To Do Item:</p> : null} */}
      <div className="flex">
        <input
          className="input"
          value={todo.text}
          placeholder="add a new item..."
          onChange={handleChange}
          type="text"
        />
        <button type="submit" className="btn btn-blue flex-none">
          <svg
            className={`w-4 h-4`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}
TodoForm.propTypes = {
  todo: PropTypes.object,
  onSave: PropTypes.func,
}
TodoForm.defaultProps = {
  todo: { id: null, text: "", completed: false },
}

export default TodoForm
