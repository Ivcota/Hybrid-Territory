export const schema = gql`
  type Record {
    id: String!
    checkoutDate: DateTime!
    checkinDate: DateTime
    isResolved: Boolean!
    user: User!
    territory: Territory!
    userId: String!
    territoryId: String!
  }

  type Query {
    records: [Record!]! @requireAuth
    record(id: String!): Record @requireAuth
  }

  input CreateRecordInput {
    checkoutDate: DateTime!
    checkinDate: DateTime
    userId: String!
    territoryId: String!
  }

  input UpdateRecordInput {
    checkoutDate: DateTime
    checkinDate: DateTime
    userId: String
    territoryId: String
    isResolved: Boolean
  }

  type Mutation {
    createRecord(input: CreateRecordInput!): Record! @requireAuth
    updateRecord(id: String!, input: UpdateRecordInput!): Record! @requireAuth
    deleteRecord(id: String!): Record! @requireAuth
    updateRecordByTerritoryAndUserId(
      territoryId: String!
      userId: String!
      input: UpdateRecordInput!
    ): Record! @requireAuth
  }
`
