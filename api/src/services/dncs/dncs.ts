import type {
  QueryResolvers,
  MutationResolvers,
  DncResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const dncs: QueryResolvers['dncs'] = () => {
  return db.dnc.findMany()
}

export const dnc: QueryResolvers['dnc'] = ({ id }) => {
  return db.dnc.findUnique({
    where: { id },
  })
}

export const createDnc: MutationResolvers['createDnc'] = ({ input }) => {
  return db.dnc.create({
    data: input,
  })
}

export const updateDnc: MutationResolvers['updateDnc'] = ({ id, input }) => {
  return db.dnc.update({
    data: input,
    where: { id },
  })
}

export const deleteDnc: MutationResolvers['deleteDnc'] = ({ id }) => {
  return db.dnc.delete({
    where: { id },
  })
}

export const Dnc: DncResolvers = {
  createdBy: (_obj, { root }) =>
    db.dnc.findUnique({ where: { id: root.id } }).createdBy(),
  territory: (_obj, { root }) =>
    db.dnc.findUnique({ where: { id: root.id } }).territory(),
}
