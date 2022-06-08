export const schema = gql`
  type Territory {
    id: String!
    name: String!
    spreadsheetURL: String
    User: User
    userId: String
  }

  type Query {
    territories: [Territory!]! @requireAuth
    territory(id: String!): Territory @requireAuth
  }

  input CreateTerritoryInput {
    name: String!
    spreadsheetURL: String
    userId: String
  }

  input UpdateTerritoryInput {
    name: String
    spreadsheetURL: String
    userId: String
  }

  type Mutation {
    createTerritory(input: CreateTerritoryInput!): Territory! @requireAuth
    updateTerritory(id: String!, input: UpdateTerritoryInput!): Territory!
      @requireAuth
    deleteTerritory(id: String!): Territory! @requireAuth
  }
`
