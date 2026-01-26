import { useEffect } from "react"

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  onOutsideClick: () => void        
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) return                     
      if (!ref.current.contains(event.target as Node)) {
        onOutsideClick()                           
      }
    }

    document.addEventListener("mousedown", handleClick)

    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [ref, onOutsideClick])
}
