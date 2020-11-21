import React from "react"
import ReactDOM from "react-dom"
import "./styles.css"
import Home from "./screens/home"
import * as serviceWorker from "./serviceWorker"
import { AuthProvider } from "utils/auth-provider"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <div className="container mx-auto">
        <Home />
      </div>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
