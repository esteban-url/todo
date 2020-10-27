import React from "react"
import PropTypes from "prop-types"
import TodoForm from "./todoForm"
import Emoji from "./emoji"
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
  const CompleteButton = ({ indicator }) => {
    return (
      <button
        className={`btn flex-none ${
          todo.completed ? " btn-green" : "btn-gray"
        }`}
        onClick={handleComplete}
        title={todo.completed ? "Mark as pending" : "Mark as completed"}
      >
        {todo.completed ? (
          <Emoji symbol={indicator ? "😎" : "🧽"} label="completed" />
        ) : (
          <Emoji symbol={indicator ? "⏱" : "💫"} label="pending" />
        )}
      </button>
    )
  }
  return (
    <li key={todo.id} className="group flex py-1">
      <CompleteButton indicator={true} />

      {editMode ? (
        <>
          <TodoForm className="flex-grow" todo={todo} onSave={handleSave} />
          <button
            className="btn btn-gray flex-none"
            onClick={() => setEditMode(false)}
          >
            <Emoji symbol="✖️" label="cancel" />
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
              <Emoji symbol="🛠" label="edit" />
            </button>
            <button className="btn btn-red flex-none" onClick={handleDelete}>
              <Emoji symbol="🧨" label="delete" />
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
