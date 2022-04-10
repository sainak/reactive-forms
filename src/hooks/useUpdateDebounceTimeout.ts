import React, { useEffect } from "react"
import useTimeout from "./useTimeout"
import useUpdateEffect from "./useUpdateEffect"

const useUpdateDebounceTimeout = (
  callback: () => void,
  delay: number,
  dependencies: React.DependencyList = []
) => {
  const { reset, clear } = useTimeout(callback, delay)

  useUpdateEffect(reset, [...dependencies, reset])
  useEffect(clear, [clear])

  return { reset, clear }
}

export default useUpdateDebounceTimeout
