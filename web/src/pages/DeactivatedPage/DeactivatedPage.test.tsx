import { render } from '@redwoodjs/testing/web'

import DeactivatedPage from './DeactivatedPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DeactivatedPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeactivatedPage />)
    }).not.toThrow()
  })
})
