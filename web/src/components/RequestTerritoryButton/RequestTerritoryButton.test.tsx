import { render } from '@redwoodjs/testing/web'

import RequestTerritoryButton from './RequestTerritoryButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

class ResizeObserver {
  observe() {}
  unobserve() {}
}

const menuSetup = (getByText) => {
  const button = getByText('Request New Territory')
  expect(button).toBeInTheDocument()
  button.click()
}

describe('RequestTerritoryButton', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.ResizeObserver = ResizeObserver

  it('renders successfully', () => {
    expect(() => {
      render(<RequestTerritoryButton />)
    }).not.toThrow()
  })

  it('opens menu when clicked', async () => {
    const { getByText } = render(<RequestTerritoryButton />)

    menuSetup(getByText)

    expect(getByText(/request territory type/i)).toBeInTheDocument()
  })

  it('contains option to request letter writing territory', async () => {
    const { getByText } = render(<RequestTerritoryButton />)

    menuSetup(getByText)

    expect(getByText(/Letter Writing/i)).toBeInTheDocument()
  })

  it('contains option to request door-to-door territory', async () => {
    const { getByText } = render(<RequestTerritoryButton />)

    menuSetup(getByText)

    expect(getByText(/Normal Territory/i)).toBeInTheDocument()
  })
})
