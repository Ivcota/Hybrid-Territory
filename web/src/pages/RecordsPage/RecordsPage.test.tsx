import { render } from '@redwoodjs/testing/web'

import RecordsPage from './RecordsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('RecordsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecordsPage />)
    }).not.toThrow()
  })
})
