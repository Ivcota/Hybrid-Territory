import { render } from '@redwoodjs/testing/web'

import IssueTrackerPage from './IssueTrackerPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('IssueTrackerPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IssueTrackerPage />)
    }).not.toThrow()
  })
})
