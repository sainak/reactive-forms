import { useEffect, useRef } from "react"

function useTitle(title: string) {
  const prevTitleRef = useRef(document.title)

  useEffect(() => {
    if (document.title !== title) document.title = `${title} | Reactive Forms`

    return () => {
      document.title = prevTitleRef.current
    }
  }, [])
}

export default typeof document !== "undefined" ? useTitle : (_title: string) => {}
