import { render } from '@redwoodjs/testing/web'

import MyTerritoriesPage from './MyTerritoriesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MyTerritoriesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MyTerritoriesPage />)
    }).not.toThrow()
  })
})
