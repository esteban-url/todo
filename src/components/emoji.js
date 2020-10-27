import React from "react"

const Emoji = ({ label, symbol, rest }) => {
  return (
    <span
      className="emoji text-xl "
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
      {...rest}
    >
      {symbol}
    </span>
  )
}
export default Emoji
