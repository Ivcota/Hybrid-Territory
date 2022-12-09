export const schema = gql`
  type FeatureFlag {
    id: String!
    name: String!
    deletedAt: DateTime
    createdAt: DateTime!
    user: [User]!
  }

  type Query {
    featureFlags: [FeatureFlag!]! @requireAuth
    featureFlag(id: String!): FeatureFlag @requireAuth
  }

  input CreateFeatureFlagInput {
    name: String!
    deletedAt: DateTime
  }

  input UpdateFeatureFlagInput {
    name: String
    deletedAt: DateTime
  }

  type Mutation {
    createFeatureFlag(input: CreateFeatureFlagInput!): FeatureFlag! @requireAuth
    updateFeatureFlag(
      id: String!
      input: UpdateFeatureFlagInput!
    ): FeatureFlag! @requireAuth
    deleteFeatureFlag(id: String!): FeatureFlag! @requireAuth
  }
`
