import type { Prisma, MapFeature } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MapFeatureCreateArgs>({
  mapFeature: {
    one: { data: { name: 'String', type: 'String', coordinates: 'String' } },
    two: { data: { name: 'String', type: 'String', coordinates: 'String' } },
  },
})

export type StandardScenario = ScenarioData<MapFeature, 'mapFeature'>
