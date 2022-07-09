export const schema = gql`
  type Issue {
    id: String!
    comment: String!
    isClosed: Boolean!
    user: User!
    territory: Territory!
    territoryId: String!
    userId: String!
  }

  type Query {
    issues: [Issue!]! @requireAuth
    issue(id: String!): Issue @requireAuth
  }

  input CreateIssueInput {
    comment: String!
    isClosed: Boolean!
    territoryId: String!
    userId: String!
  }

  input UpdateIssueInput {
    comment: String
    isClosed: Boolean
    territoryId: String
    userId: String
  }

  type Mutation {
    createIssue(input: CreateIssueInput!): Issue! @requireAuth
    updateIssue(id: String!, input: UpdateIssueInput!): Issue! @requireAuth
    deleteIssue(id: String!): Issue! @requireAuth
  }
`
