import { render } from '@redwoodjs/testing/web'

import AssignTerritoryPage from './AssignTerritoryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AssignTerritoryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AssignTerritoryPage />)
    }).not.toThrow()
  })
})
