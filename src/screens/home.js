import React from "react"
import TodoList from "components/todoList"
import { useAsync } from "hooks/useAsync"
import Spinner from "components/spinner"
import Login from "components/login"
import { useAuth } from "utils/auth-provider"

const Home = () => {
  const auth = useAuth()
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    run(auth.getUser())
  }, [run, auth])

  const logout = () => {
    auth.currentUser().logout()
    setData(null)
  }

  const login = (email, password) =>
    auth.login(email, password).then((user) => setData(user))
  const register = (email, password) =>
    auth.signup(email, password).then((user) => setData(user))
  const handleLogout = (event) => {
    event.preventDefault()
    logout()
  }
  if (isLoading || isIdle) {
    return <Spinner />
  }
  if (isError) {
    return (
      <div className="text-red-500">
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  }
  if (isSuccess) {
    return user ? (
      <>
        <div className=" flex justify-between">
          <h1 className="p-3 text-2xl font-bold">TO DO</h1>
          <button onClick={handleLogout}>logout</button>
        </div>
        <TodoList tenant={auth.currentUser().email} listName="main" />
        <TodoList tenant={auth.currentUser().email} listName="second" />
      </>
    ) : (
      <Login login={login} register={register} />
    )
  }
}
export default Home
