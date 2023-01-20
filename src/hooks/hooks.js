import { useRef, useEffect } from "react";

export function useEventListener(eventName, handler, element) {
  if (!element) element = window;
  const savedHandler = useRef();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
    // Only call effect if parameters changes
  }, [eventName, element]);
}
