import { render } from '@redwoodjs/testing/web'

import SelfCheckoutPage from './SelfCheckoutPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SelfCheckoutPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SelfCheckoutPage />)
    }).not.toThrow()
  })
})
