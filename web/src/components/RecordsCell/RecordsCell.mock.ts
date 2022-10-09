import dayjs from 'dayjs'

import { Record } from 'src/generated/graphql'

export const standard = (/* vars, { ctx, req } */) => ({
  records: [
    {
      id: '123',
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      checkoutDate: dayjs(new Date()).subtract(34, 'days'),
      checkinDate: new Date(),
      isResolved: false,
      territory: {
        name: 'T3',
      },
      territoryId: 'fewf25r2523',
      userId: 're32r23532r',
      __typename: 'Record',
    },
    {
      id: '6546',
      user: {
        firstName: 'James',
        lastName: 'Doe',
      },
      checkoutDate: dayjs(new Date()).subtract(20, 'days'),
      checkinDate: new Date(),
      isResolved: false,
      territory: {
        name: 'T5',
      },
      territoryId: 'fewf25r2523',
      userId: 're32r23532r',
      __typename: 'Record',
    },
    {
      id: 'regret643',
      user: {
        firstName: 'Lady',
        lastName: 'Doe',
      },
      checkoutDate: dayjs(new Date()).subtract(5, 'days'),
      checkinDate: new Date(),
      isResolved: false,
      territory: {
        name: 'T3',
      },
      territoryId: 'fewf25r2523',
      userId: 're32r23532r',
      __typename: 'Record',
    },
  ] as Record[],
})
