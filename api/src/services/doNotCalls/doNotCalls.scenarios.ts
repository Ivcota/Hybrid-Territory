import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.DoNotCallCreateArgs>({
  doNotCall: {
    one: {
      data: {
        createdBy: {
          create: {
            email: 'String9068249',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        territory: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        createdBy: {
          create: {
            email: 'String9674567',
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
