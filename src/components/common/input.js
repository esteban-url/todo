import React from "react"

const Input = ({ ...rest }) => {
  return (
    <input
      class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-green focus:border-green-300 focus:z-10 sm:text-sm sm:leading-5"
      {...rest}
    />
  )
}
export default Input
