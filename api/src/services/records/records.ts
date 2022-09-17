import type {
  QueryResolvers,
  MutationResolvers,
  RecordResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const records: QueryResolvers['records'] = () => {
  return db.record.findMany({
    orderBy: [
      {
        checkinDate: 'asc',
      },
      {
        isResolved: 'asc',
      },
    ],
  })
}

export const record: QueryResolvers['record'] = ({ id }) => {
  return db.record.findUnique({
    where: { id },
  })
}

export const createRecord: MutationResolvers['createRecord'] = ({ input }) => {
  return db.record.create({
    data: input,
  })
}

export const updateRecord: MutationResolvers['updateRecord'] = ({
  id,
  input,
}) => {
  return db.record.update({
    data: input,
    where: { id },
  })
}

export const deleteRecord: MutationResolvers['deleteRecord'] = ({ id }) => {
  return db.record.delete({
    where: { id },
  })
}

export const updateRecordByTerritoryAndUserId: MutationResolvers['updateRecordByTerritoryAndUserId'] =
  async ({ territoryId, userId, input }) => {
    const record = await db.record.findFirst({
      where: {
        userId,
        territoryId,
        checkinDate: null,
      },
    })

    return db.record.update({ where: { id: record.id }, data: input })
  }

export const Record: RecordResolvers = {
  user: (_obj, { root }) =>
    db.record.findUnique({ where: { id: root.id } }).user(),
  territory: (_obj, { root }) =>
    db.record.findUnique({ where: { id: root.id } }).territory(),
}
