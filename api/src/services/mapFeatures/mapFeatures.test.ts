import type { MapFeature } from '@prisma/client'

import {
  mapFeatures,
  mapFeature,
  createMapFeature,
  updateMapFeature,
  deleteMapFeature,
} from './mapFeatures'
import type { StandardScenario } from './mapFeatures.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('mapFeatures', () => {
  scenario('returns all mapFeatures', async (scenario: StandardScenario) => {
    const result = await mapFeatures()

    expect(result.length).toEqual(Object.keys(scenario.mapFeature).length)
  })

  scenario(
    'returns a single mapFeature',
    async (scenario: StandardScenario) => {
      const result = await mapFeature({ id: scenario.mapFeature.one.id })

      expect(result).toEqual(scenario.mapFeature.one)
    }
  )

  scenario('creates a mapFeature', async () => {
    const result = await createMapFeature({
      input: { name: 'String', type: 'String', coordinates: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.type).toEqual('String')
    expect(result.coordinates).toEqual('String')
  })

  scenario('updates a mapFeature', async (scenario: StandardScenario) => {
    const original = (await mapFeature({
      id: scenario.mapFeature.one.id,
    })) as MapFeature
    const result = await updateMapFeature({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a mapFeature', async (scenario: StandardScenario) => {
    const original = (await deleteMapFeature({
      id: scenario.mapFeature.one.id,
    })) as MapFeature
    const result = await mapFeature({ id: original.id })

    expect(result).toEqual(null)
  })
})
