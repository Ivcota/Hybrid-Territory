import type {
  QueryResolvers,
  MutationResolvers,
  FeatureFlagRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const featureFlags: QueryResolvers['featureFlags'] = () => {
  return db.featureFlag.findMany()
}

export const featureFlag: QueryResolvers['featureFlag'] = ({ id }) => {
  return db.featureFlag.findUnique({
    where: { id },
  })
}

export const createFeatureFlag: MutationResolvers['createFeatureFlag'] = ({
  input,
}) => {
  return db.featureFlag.create({
    data: input,
  })
}

export const updateFeatureFlag: MutationResolvers['updateFeatureFlag'] = ({
  id,
  input,
}) => {
  return db.featureFlag.update({
    data: input,
    where: { id },
  })
}

export const deleteFeatureFlag: MutationResolvers['deleteFeatureFlag'] = ({
  id,
}) => {
  return db.featureFlag.delete({
    where: { id },
  })
}

export const FeatureFlag: FeatureFlagRelationResolvers = {
  user: (_obj, { root }) => {
    return db.featureFlag.findUnique({ where: { id: root?.id } }).user()
  },
}
