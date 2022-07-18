import {
  records,
  record,
  createRecord,
  updateRecord,
  deleteRecord,
} from './records'
import type { StandardScenario } from './records.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('records', () => {
  scenario('returns all records', async (scenario: StandardScenario) => {
    const result = await records()

    expect(result.length).toEqual(Object.keys(scenario.record).length)
  })

  scenario('returns a single record', async (scenario: StandardScenario) => {
    const result = await record({ id: scenario.record.one.id })

    expect(result).toEqual(scenario.record.one)
  })

  scenario('creates a record', async (scenario: StandardScenario) => {
    const result = await createRecord({
      input: {
        userId: scenario.record.two.userId,
        territoryId: scenario.record.two.territoryId,
      },
    })

    expect(result.userId).toEqual(scenario.record.two.userId)
    expect(result.territoryId).toEqual(scenario.record.two.territoryId)
  })

  scenario('updates a record', async (scenario: StandardScenario) => {
    const original = await record({ id: scenario.record.one.id })
    const result = await updateRecord({
      id: original.id,
      input: { userId: scenario.record.two.userId },
    })

    expect(result.userId).toEqual(scenario.record.two.userId)
  })

  scenario('deletes a record', async (scenario: StandardScenario) => {
    const original = await deleteRecord({ id: scenario.record.one.id })
    const result = await record({ id: original.id })

    expect(result).toEqual(null)
  })
})
