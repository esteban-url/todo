import React from "react"

const Button = ({ children, ...rest }) => {
  return (
    <button className="px-4 py-2 rounded-lg bg-green-500 text-white">
      {children}
    </button>
  )
}
export default Button
