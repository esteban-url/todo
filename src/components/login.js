import { useAsync } from "hooks/useAsync"
import React from "react"
import Spinner from "./spinner"

const LoginForm = ({ onSubmit, submitText, toggleView }) => {
  const { isLoading, isError, error, run } = useAsync()
  const handleToggle = (event) => {
    event.preventDefault()
    toggleView()
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const { email, password } = event.target.elements

    run(onSubmit(email.value, password.value))
  }

  return (
    <>
      <h1 className="py-3 text-2xl font-bold">{submitText}</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="email">Email</label>
          <input className="input" type="text" id="email" placeholder="email" />
        </div>
        <div className="my-3">
          <label htmlFor="password">Password</label>
          <input
            className="input"
            id="password"
            type="password"
            placeholder="password"
          />
        </div>
        <div className="my-3">
          <button
            className="rounded-md text-white w-40 bg-blue-500 py-2 px-3 mr-5 "
            type="submit"
          >
            {submitText}
            {isLoading ? <Spinner /> : null}
          </button>
          <button className="text-gray-500" onClick={handleToggle}>
            {submitText.toLowerCase() === "login"
              ? "Register as a new user"
              : "Login"}{" "}
            instead
          </button>
        </div>
        {isError ? (
          <div className="py-2 px-3 text-center rounded-md bg-red-200 text-red-600">
            {error.json.error_description || error.json.msg}
          </div>
        ) : null}
      </form>
    </>
  )
}
const Login = ({ login, register }) => {
  const [view, setView] = React.useState("login")
  const toggleView = () => {
    setView(view === "login" ? "register" : "login")
  }
  return view === "login" ? (
    <LoginForm onSubmit={login} submitText="Login" toggleView={toggleView} />
  ) : (
    <LoginForm
      onSubmit={register}
      submitText="Register"
      toggleView={toggleView}
    />
  )
}
export default Login
