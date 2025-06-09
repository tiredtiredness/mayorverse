import {RefObject, useEffect} from "react";

export function useClickOutside<T extends HTMLDivElement | null>(
  ref: RefObject<T>,
  onClick: () => void,
) {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClick();
      }
    };

    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, [ref, onClick]);
}
