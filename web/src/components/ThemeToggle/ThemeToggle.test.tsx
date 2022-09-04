import { render } from '@redwoodjs/testing/web'

import ThemeToggle from './ThemeToggle'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ThemeToggle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThemeToggle />)
    }).not.toThrow()
  })
})
