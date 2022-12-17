export const schema = gql`
  type MapFeature {
    id: String!
    name: String!
    type: String!
    coordinates: String!
    metadata: String
    imageURL: String
    createdAt: DateTime!
    deletedAt: DateTime
    Territory: Territory
    territoryId: String
  }

  type Query {
    mapFeatures: [MapFeature!]! @requireAuth
    mapFeature(id: String!): MapFeature @requireAuth
  }

  input CreateMapFeatureInput {
    name: String!
    type: String!
    coordinates: String!
    metadata: String
    imageURL: String
    deletedAt: DateTime
    territoryId: String
  }

  input UpdateMapFeatureInput {
    name: String
    type: String
    coordinates: String
    metadata: String
    imageURL: String
    deletedAt: DateTime
    territoryId: String
  }

  type Mutation {
    createMapFeature(input: CreateMapFeatureInput!): MapFeature! @requireAuth
    updateMapFeature(id: String!, input: UpdateMapFeatureInput!): MapFeature!
      @requireAuth
    deleteMapFeature(id: String!): MapFeature! @requireAuth
  }
`
