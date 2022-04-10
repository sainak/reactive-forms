import React, { useEffect } from "react"
import useTimeout from "./useTimeout"

const useDebounceTimeout = (
  callback: () => void,
  delay: number,
  dependencies: React.DependencyList = []
) => {
  const { reset, clear } = useTimeout(callback, delay)

  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [clear])

  return { reset, clear }
}

export default useDebounceTimeout
