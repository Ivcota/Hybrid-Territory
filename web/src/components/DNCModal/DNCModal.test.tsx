import { render } from '@redwoodjs/testing/web'

import { ViewTerritoryCellContext } from '../ViewTerritoryCell'

import DncModal from './DncModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

jest.mock('@redwoodjs/auth', () => ({
  useAuth: () => ({
    currentUser: {
      id: '1',
    },
  }),
}))

describe('DncModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <ViewTerritoryCellContext.Provider
          value={{
            territoryId: '1',
          }}
        >
          <DncModal />
        </ViewTerritoryCellContext.Provider>
      )
    }).not.toThrow()
  })
})
