export const schema = gql`
  type Territory {
    id: String!
    name: String!
    spreadsheetURL: String
    isCheckedOut: Boolean!
    User: User
    userId: String
  }

  type Query {
    territories: [Territory!]! @requireAuth
    territory(id: String!): Territory @requireAuth
    userTerritories(userId: String!): [Territory!]!
  }

  input CreateTerritoryInput {
    name: String!
    spreadsheetURL: String
    isCheckedOut: Boolean!
    userId: String
  }

  input UpdateTerritoryInput {
    name: String
    spreadsheetURL: String
    isCheckedOut: Boolean
    userId: String
  }

  type Mutation {
    createTerritory(input: CreateTerritoryInput!): Territory! @requireAuth
    updateTerritory(id: String!, input: UpdateTerritoryInput!): Territory!
      @requireAuth
    deleteTerritory(id: String!): Territory! @requireAuth
  }
`
