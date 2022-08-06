import { render } from '@redwoodjs/testing/web'

import UserListTerritoryCard from './UserListTerritoryCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserListTerritoryCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserListTerritoryCard />)
    }).not.toThrow()
  })
})
