import React from "react"
import TodoList from "components/todoList"

const Home = () => {
  return (
    <div className="container  mx-auto">
      <h1 className="p-3 text-2xl font-bold">TO DO</h1>
      <TodoList listName="main" />
    </div>
  )
}
export default Home
