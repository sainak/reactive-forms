import { RefObject, useEffect, useRef } from "react"

const defaultEvents = ["mousedown", "touchstart"]

const useClickAway = <E extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: E) => void,
  triggerOwnClick: boolean = false,
  events: string[] = defaultEvents
) => {
  const savedCallback = useRef(onClickAway)
  useEffect(() => {
    savedCallback.current = onClickAway
  }, [onClickAway])
  useEffect(() => {
    const handler = (event: Event) => {
      const { current: el } = ref
      el && !el.contains(event.target as Node) && savedCallback.current(event as E)
      // trigger click event if the target has its own click handler
      if (
        triggerOwnClick &&
        event.target instanceof HTMLElement &&
        event.target.click
      ) {
        event.target.click()
      }
    }
    for (const eventName of events) {
      document.addEventListener(eventName, handler)
    }
    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handler)
      }
    }
  }, [events, ref])
}

export default useClickAway
