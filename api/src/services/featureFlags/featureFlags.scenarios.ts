import type { Prisma, FeatureFlag } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FeatureFlagCreateArgs>({
  featureFlag: {
    one: { data: { name: 'String' } },
    two: { data: { name: 'String' } },
  },
})

export type StandardScenario = ScenarioData<FeatureFlag, 'featureFlag'>
