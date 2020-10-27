import React from "react"
import PropTypes from "prop-types"
import Emoji from "./emoji"
const TodoForm = ({ todo: initialTodo, onSave, ...rest }) => {
  const [todo, setTodo] = React.useState(initialTodo)

  const handleChange = (event) => {
    setTodo({ ...todo, title: event.target.value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (todo.title.trim() === "") return
    setTodo({ id: null, title: "", completed: false })

    onSave(todo)
  }
  return (
    <form onSubmit={handleSubmit} {...rest}>
      {/* {todo.id === null ? <p>Add a new To Do Item:</p> : null} */}
      <div className="flex">
        <input
          className="input"
          value={todo.title}
          placeholder="add a new item..."
          onChange={handleChange}
          type="text"
        />
        <button type="submit" className="btn btn-blue flex-none">
          <Emoji symbol="💾" label="save" />
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
  todo: { id: null, title: "", completed: false },
}

export default TodoForm
