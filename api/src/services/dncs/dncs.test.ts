import { dncs, dnc, createDnc, updateDnc, deleteDnc } from './dncs'
import type { StandardScenario } from './dncs.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('dncs', () => {
  scenario('returns all dncs', async (scenario: StandardScenario) => {
    const result = await dncs()

    expect(result.length).toEqual(Object.keys(scenario.dnc).length)
  })

  scenario('returns a single dnc', async (scenario: StandardScenario) => {
    const result = await dnc({ id: scenario.dnc.one.id })

    expect(result).toEqual(scenario.dnc.one)
  })

  scenario('creates a dnc', async (scenario: StandardScenario) => {
    const result = await createDnc({
      input: {
        territoryId: scenario.dnc.two.territoryId,
        userId: scenario.dnc.two.userId,
      },
    })

    expect(result.territoryId).toEqual(scenario.dnc.two.territoryId)
    expect(result.userId).toEqual(scenario.dnc.two.userId)
  })

  scenario('updates a dnc', async (scenario: StandardScenario) => {
    const original = await dnc({ id: scenario.dnc.one.id })
    const result = await updateDnc({
      id: original.id,
      input: { userId: scenario.dnc.two.territoryId },
    })

    expect(result.userId).toEqual(scenario.dnc.two.territoryId)
  })

  scenario('deletes a dnc', async (scenario: StandardScenario) => {
    const original = await deleteDnc({ id: scenario.dnc.one.id })
    const result = await dnc({ id: original.id })

    expect(result).toEqual(null)
  })
})
