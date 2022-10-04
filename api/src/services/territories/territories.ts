import type {
  QueryResolvers,
  MutationResolvers,
  TerritoryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const territories: QueryResolvers['territories'] = () => {
  return db.territory.findMany()
}

export const territory: QueryResolvers['territory'] = ({ id }) => {
  return db.territory.findUnique({
    where: { id },
  })
}

export const createTerritory: MutationResolvers['createTerritory'] = ({
  input,
}) => {
  return db.territory.create({
    data: input,
  })
}

export const updateTerritory: MutationResolvers['updateTerritory'] = ({
  id,
  input,
}) => {
  return db.territory.update({
    data: input,
    where: { id },
  })
}

export const deleteTerritory: MutationResolvers['deleteTerritory'] = ({
  id,
}) => {
  return db.territory.delete({
    where: { id },
  })
}

export const userTerritories: QueryResolvers['userTerritories'] = ({
  userId,
}) => {
  return db.territory.findMany({ where: { userId } })
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Territory: TerritoryResolvers = {
  User: (_obj, { root }) =>
    db.territory.findUnique({ where: { id: root.id } }).User(),
  lastWorkedDate: async (_obj, { root }) => {
    const date = await db.record.findFirst({
      where: { territoryId: root.id },
      orderBy: { checkinDate: 'desc' },
      select: {
        checkinDate: true,
      },
    })

    return date?.checkinDate
  },
}

export const searchTerritories: QueryResolvers['searchTerritories'] = async ({
  cardName,
}) => {
  return db.territory.findMany({
    where: {
      name: {
        contains: cardName ? cardName : '',
      },
    },
  })
}

export const availableTerritories: QueryResolvers['availableTerritories'] =
  () => {
    return db.territory.findMany({ where: { userId: null } })
  }
