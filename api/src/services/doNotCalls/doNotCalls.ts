import type {
  QueryResolvers,
  MutationResolvers,
  DoNotCallResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const doNotCalls: QueryResolvers['doNotCalls'] = () => {
  return db.doNotCall.findMany()
}

export const doNotCall: QueryResolvers['doNotCall'] = ({ id }) => {
  return db.doNotCall.findUnique({
    where: { id },
  })
}

export const territoryDoNotCalls: QueryResolvers['territoryDoNotCalls'] = ({
  territoryId,
}) => {
  return db.doNotCall.findMany({
    where: {
      territoryId: {
        equals: territoryId,
      },
    },
  })
}

export const createDoNotCall: MutationResolvers['createDoNotCall'] = ({
  input,
}) => {
  return db.doNotCall.create({
    data: input,
  })
}

export const updateDoNotCall: MutationResolvers['updateDoNotCall'] = ({
  id,
  input,
}) => {
  return db.doNotCall.update({
    data: input,
    where: { id },
  })
}

export const deleteDoNotCall: MutationResolvers['deleteDoNotCall'] = ({
  id,
}) => {
  return db.doNotCall.delete({
    where: { id },
  })
}

export const DoNotCall: DoNotCallResolvers = {
  createdBy: (_obj, { root }) =>
    db.doNotCall.findUnique({ where: { id: root.id } }).createdBy(),
  territory: (_obj, { root }) =>
    db.doNotCall.findUnique({ where: { id: root.id } }).territory(),
}
