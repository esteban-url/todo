import React from "react"

const useLocalStorageState = (
  key,
  defaultValue = "",
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue
  })
  const keyRef = React.useRef(key)
  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    const prevKey = keyRef.current
    if (key !== prevKey) {
      window.localStorage.removeItem(key)
    }
    keyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])
  return [state, setState]
}
export { useLocalStorageState }
