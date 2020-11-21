import React from "react"
import GoTrue from "gotrue-js"

const AuthContext = React.createContext()
const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error("useAuth must be within the AuthProvider")
  return context
}
const AuthProvider = ({ children }) => {
  const auth = new GoTrue({
    APIUrl: process.env.REACT_APP_AUTH_URL,
    audience: "",
    setCookie: false,
  })
  auth.getUser = async () => {
    let user = null
    user = await auth.currentUser()
    return user
  }
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
export { useAuth, AuthProvider }
