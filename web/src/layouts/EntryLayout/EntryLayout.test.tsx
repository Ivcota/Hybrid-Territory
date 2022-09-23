import { render } from '@redwoodjs/testing/web'

import EntryLayout from './EntryLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EntryLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EntryLayout />)
    }).not.toThrow()
  })
})
