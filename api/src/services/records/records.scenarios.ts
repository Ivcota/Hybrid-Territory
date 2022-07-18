import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.RecordCreateArgs>({
  record: {
    one: {
      data: {
        user: {
          create: {
            email: 'String3718632',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        territory: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        user: {
          create: {
            email: 'String7578908',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        territory: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
