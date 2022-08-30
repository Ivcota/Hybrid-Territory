import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.DNCCreateArgs>({
  dnc: {
    one: {
      data: {
        createdBy: {
          create: {
            email: 'String6747750',
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
            email: 'String3507200',
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
