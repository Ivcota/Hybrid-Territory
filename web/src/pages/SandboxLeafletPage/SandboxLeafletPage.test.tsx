import { render } from '@redwoodjs/testing/web'

import SandboxLeafletPage from './SandboxLeafletPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SandboxLeafletPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SandboxLeafletPage />)
    }).not.toThrow()
  })
})
