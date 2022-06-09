import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  TerritoryResolvers,
} from 'types/graphql'

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


export const userTerritories: QueryResolvers['userTerritories']  = ({userId}) => {
  return db.territory.findMany({where: {userId}})
  }

export const Territory: TerritoryResolvers = {
  User: (_obj, { root }) =>
    db.territory.findUnique({ where: { id: root.id } }).User(),
}


