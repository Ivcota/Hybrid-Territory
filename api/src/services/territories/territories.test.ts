import {
  territories,
  territory,
  createTerritory,
  updateTerritory,
  deleteTerritory,
} from './territories'
import type { StandardScenario } from './territories.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('territories', () => {
  scenario('returns all territories', async (scenario: StandardScenario) => {
    const result = await territories()

    expect(result.length).toEqual(Object.keys(scenario.territory).length)
  })

  scenario('returns a single territory', async (scenario: StandardScenario) => {
    const result = await territory({ id: scenario.territory.one.id })

    expect(result).toEqual(scenario.territory.one)
  })

  scenario('creates a territory', async () => {
    const result = await createTerritory({
      input: { name: 'String', isCompleted: false },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a territory', async (scenario: StandardScenario) => {
    const original = await territory({ id: scenario.territory.one.id })
    const result = await updateTerritory({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a territory', async (scenario: StandardScenario) => {
    const original = await deleteTerritory({ id: scenario.territory.one.id })
    const result = await territory({ id: original.id })

    expect(result).toEqual(null)
  })
})
