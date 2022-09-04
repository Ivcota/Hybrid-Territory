export const schema = gql`
  type DoNotCall {
    id: String!
    address: String!
    createdBy: User!
    createdAt: DateTime!
    territory: Territory!
    territoryId: String!
    userId: String!
  }

  type Query {
    doNotCalls: [DoNotCall!]! @requireAuth
    doNotCall(id: String!): DoNotCall @requireAuth
    territoryDoNotCalls(territoryId: String): [DoNotCall!]! @requireAuth
  }

  input CreateDoNotCallInput {
    territoryId: String!
    userId: String!
    address: String!
  }

  input UpdateDoNotCallInput {
    territoryId: String
    userId: String
  }

  type Mutation {
    createDoNotCall(input: CreateDoNotCallInput!): DoNotCall! @requireAuth
    updateDoNotCall(id: String!, input: UpdateDoNotCallInput!): DoNotCall!
      @requireAuth
    deleteDoNotCall(id: String!): DoNotCall! @requireAuth
  }
`
