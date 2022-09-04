import {
  doNotCalls,
  doNotCall,
  createDoNotCall,
  updateDoNotCall,
  deleteDoNotCall,
} from './doNotCalls'
import type { StandardScenario } from './doNotCalls.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('doNotCalls', () => {
  scenario('returns all doNotCalls', async (scenario: StandardScenario) => {
    const result = await doNotCalls()

    expect(result.length).toEqual(Object.keys(scenario.doNotCall).length)
  })

  scenario('returns a single doNotCall', async (scenario: StandardScenario) => {
    const result = await doNotCall({ id: scenario.doNotCall.one.id })

    expect(result).toEqual(scenario.doNotCall.one)
  })

  scenario('creates a doNotCall', async (scenario: StandardScenario) => {
    const result = await createDoNotCall({
      input: {
        territoryId: scenario.doNotCall.two.territoryId,
        userId: scenario.doNotCall.two.userId,
      },
    })

    expect(result.territoryId).toEqual(scenario.doNotCall.two.territoryId)
    expect(result.userId).toEqual(scenario.doNotCall.two.userId)
  })

  scenario('updates a doNotCall', async (scenario: StandardScenario) => {
    const original = await doNotCall({ id: scenario.doNotCall.one.id })
    const result = await updateDoNotCall({
      id: original.id,
      input: { userId: scenario.doNotCall.two.territoryId },
    })

    expect(result.userId).toEqual(scenario.doNotCall.two.territoryId)
  })

  scenario('deletes a doNotCall', async (scenario: StandardScenario) => {
    const original = await deleteDoNotCall({ id: scenario.doNotCall.one.id })
    const result = await doNotCall({ id: original.id })

    expect(result).toEqual(null)
  })
})
