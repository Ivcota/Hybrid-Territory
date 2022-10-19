import { render, renderHook } from '@redwoodjs/testing/web'

import ThemeToggle from './ThemeToggle'
import { useThemeToggle } from '../../hooks/useTheme'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ThemeToggle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThemeToggle />)
    }).not.toThrow()
  })

  it('has the correct initial state', () => {
    const { result } = renderHook(() => useThemeToggle())
    expect(result.current.theme).toBe('light')
  })
})
