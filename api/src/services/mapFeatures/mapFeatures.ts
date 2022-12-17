import type {
  QueryResolvers,
  MutationResolvers,
  MapFeatureRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const mapFeatures: QueryResolvers['mapFeatures'] = () => {
  return db.mapFeature.findMany()
}

export const mapFeature: QueryResolvers['mapFeature'] = ({ id }) => {
  return db.mapFeature.findUnique({
    where: { id },
  })
}

export const createMapFeature: MutationResolvers['createMapFeature'] = ({
  input,
}) => {
  return db.mapFeature.create({
    data: input,
  })
}

export const updateMapFeature: MutationResolvers['updateMapFeature'] = ({
  id,
  input,
}) => {
  return db.mapFeature.update({
    data: input,
    where: { id },
  })
}

export const deleteMapFeature: MutationResolvers['deleteMapFeature'] = ({
  id,
}) => {
  return db.mapFeature.delete({
    where: { id },
  })
}

export const MapFeature: MapFeatureRelationResolvers = {
  Territory: (_obj, { root }) => {
    return db.mapFeature.findUnique({ where: { id: root?.id } }).Territory()
  },
}
