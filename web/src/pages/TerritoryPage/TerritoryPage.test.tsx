import { render } from '@redwoodjs/testing/web'

import TerritoryPage from './TerritoryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TerritoryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TerritoryPage />)
    }).not.toThrow()
  })
})
