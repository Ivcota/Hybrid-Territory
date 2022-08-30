export const schema = gql`
  type Territory {
    id: String!
    name: String!
    imageURL: String
    spreadsheetURL: String
    isCompleted: Boolean!
    User: User
    userId: String
    issues: [Issue]!
    Record: [Record]!
  }

  type Query {
    territories: [Territory!]! @requireAuth
    territory(id: String!): Territory @requireAuth
    userTerritories(userId: String!): [Territory!]! @requireAuth
    searchTerritories(
      cardName: String
      firstName: String
      lastName: String
    ): [Territory!]! @skipAuth
    availableTerritories: [Territory!]! @requireAuth
  }

  input CreateTerritoryInput {
    name: String!
    spreadsheetURL: String
    isCompleted: Boolean!
    userId: String
  }

  input UpdateTerritoryInput {
    name: String
    spreadsheetURL: String
    isCompleted: Boolean
    userId: String
  }

  type Mutation {
    createTerritory(input: CreateTerritoryInput!): Territory! @requireAuth
    updateTerritory(id: String!, input: UpdateTerritoryInput!): Territory!
      @requireAuth
    deleteTerritory(id: String!): Territory! @requireAuth
  }
`
