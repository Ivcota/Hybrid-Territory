import { render } from '@redwoodjs/testing/web'

import DncModal from './DncModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DncModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DncModal />)
    }).not.toThrow()
  })
})
