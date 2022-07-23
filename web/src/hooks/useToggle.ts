import { useState } from "react"


export const useToggle = ({ defaultActive }: { defaultActive: boolean }) => {
  const [isActive, setIsActivew] = useState(defaultActive)
  const toggle = () => {
    setIsActivew(!isActive)
  }
  return {
    isActive,
    toggle,
  }
}