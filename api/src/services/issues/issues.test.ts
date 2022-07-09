import { issues, issue, createIssue, updateIssue, deleteIssue } from './issues'
import type { StandardScenario } from './issues.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('issues', () => {
  scenario('returns all issues', async (scenario: StandardScenario) => {
    const result = await issues()

    expect(result.length).toEqual(Object.keys(scenario.issue).length)
  })

  scenario('returns a single issue', async (scenario: StandardScenario) => {
    const result = await issue({ id: scenario.issue.one.id })

    expect(result).toEqual(scenario.issue.one)
  })

  scenario('creates a issue', async (scenario: StandardScenario) => {
    const result = await createIssue({
      input: {
        comment: 'String',
        isClosed: true,
        territoryId: scenario.issue.two.territoryId,
        userId: scenario.issue.two.userId,
      },
    })

    expect(result.comment).toEqual('String')
    expect(result.isClosed).toEqual(true)
    expect(result.territoryId).toEqual(scenario.issue.two.territoryId)
    expect(result.userId).toEqual(scenario.issue.two.userId)
  })

  scenario('updates a issue', async (scenario: StandardScenario) => {
    const original = await issue({ id: scenario.issue.one.id })
    const result = await updateIssue({
      id: original.id,
      input: { comment: 'String2' },
    })

    expect(result.comment).toEqual('String2')
  })

  scenario('deletes a issue', async (scenario: StandardScenario) => {
    const original = await deleteIssue({ id: scenario.issue.one.id })
    const result = await issue({ id: original.id })

    expect(result).toEqual(null)
  })
})
