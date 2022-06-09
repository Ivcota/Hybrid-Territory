export const schema = gql`
  type MessageResponse {
    success: Boolean!
  }

  type Mutation {
    sendMessage(phone: String!, message: String!): MessageResponse! @requireAuth
  }
`
