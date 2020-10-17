import React from "react"
import PropTypes from "prop-types"

const Input = ({ defaultValue = "", onChange, ...rest }) => {
  const [value, setValue] = React.useState(defaultValue)
  const handleChange = (event) => {
    setValue(event.target.value)
    onChange(event.target.value)
  }
  return (
    <input
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-green focus:border-green-300 focus:z-10 sm:text-sm sm:leading-5"
      value={value}
      onChange={handleChange}
      {...rest}
    />
  )
}
Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
}
Input.defaultProps = {
  placeholder: "...",
}

export default Input
