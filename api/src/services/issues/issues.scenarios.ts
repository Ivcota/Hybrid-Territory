import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.IssueCreateArgs>({
  issue: {
    one: {
      data: {
        comment: 'String',
        isClosed: true,
        user: {
          create: {
            email: 'String9325880',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        territory: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        comment: 'String',
        isClosed: true,
        user: {
          create: {
            email: 'String2058308',
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
