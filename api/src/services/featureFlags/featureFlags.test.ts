import type { FeatureFlag } from '@prisma/client'

import {
  featureFlags,
  featureFlag,
  createFeatureFlag,
  updateFeatureFlag,
  deleteFeatureFlag,
} from './featureFlags'
import type { StandardScenario } from './featureFlags.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('featureFlags', () => {
  scenario('returns all featureFlags', async (scenario: StandardScenario) => {
    const result = await featureFlags()

    expect(result.length).toEqual(Object.keys(scenario.featureFlag).length)
  })

  scenario(
    'returns a single featureFlag',
    async (scenario: StandardScenario) => {
      const result = await featureFlag({ id: scenario.featureFlag.one.id })

      expect(result).toEqual(scenario.featureFlag.one)
    }
  )

  scenario('creates a featureFlag', async () => {
    const result = await createFeatureFlag({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a featureFlag', async (scenario: StandardScenario) => {
    const original = (await featureFlag({
      id: scenario.featureFlag.one.id,
    })) as FeatureFlag
    const result = await updateFeatureFlag({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a featureFlag', async (scenario: StandardScenario) => {
    const original = (await deleteFeatureFlag({
      id: scenario.featureFlag.one.id,
    })) as FeatureFlag
    const result = await featureFlag({ id: original.id })

    expect(result).toEqual(null)
  })
})
