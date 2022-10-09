import { render } from '@redwoodjs/testing/web'

import { Loading, Empty, Failure, Success } from './RecordsCell'
import { standard } from './RecordsCell.mock'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('RecordsCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  // When you're ready to test the actual output of your component render
  // you could test that, for example, certain text is present:
  //
  // 1. import { screen } from '@redwoodjs/testing/web'
  // 2. Add test: expect(screen.getByText('Hello, world')).toBeInTheDocument()

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success records={standard().records} />)
    }).not.toThrow()
  })

  it('shows user name', async () => {
    // mock testing components should be as easy as passing mocked data into them — that's why it's good to have a wrapper in certain cases
    const { findAllByText } = render(<Success records={standard().records} />)

    const jamesDoes = await findAllByText('James Doe')

    expect(jamesDoes[0]).toHaveTextContent(/James Doe/)
    expect(jamesDoes[1]).toHaveTextContent(/James Doe/)
  })

  it('has resolved states', async () => {
    const { findAllByText } = render(<Success records={standard().records} />)

    const resolvedRecords = await findAllByText('Unresolved')

    resolvedRecords.map((record) => {
      expect(record).toHaveTextContent(/unresolved/i)
    })
  })
})
