export const schema = gql`
  type Dnc {
    id: String!
    createdBy: User!
    createdAt: DateTime!
    territory: Territory!
    territoryId: String!
    userId: String!
  }

  type Query {
    dncs: [Dnc!]! @requireAuth
    dnc(id: String!): Dnc @requireAuth
  }

  input CreateDncInput {
    territoryId: String!
    userId: String!
  }

  input UpdateDncInput {
    territoryId: String
    userId: String
  }

  type Mutation {
    createDnc(input: CreateDncInput!): Dnc! @requireAuth
    updateDnc(id: String!, input: UpdateDncInput!): Dnc! @requireAuth
    deleteDnc(id: String!): Dnc! @requireAuth
  }
`
