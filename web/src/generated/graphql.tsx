import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any
}

export type CreateTerritoryInput = {
  isCheckedOut: Scalars['Boolean']
  name: Scalars['String']
  spreadsheetURL?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['String']>
}

export type CreateUserInput = {
  email: Scalars['String']
  firstName?: InputMaybe<Scalars['String']>
  hashedPassword: Scalars['String']
  lastName?: InputMaybe<Scalars['String']>
  phone?: InputMaybe<Scalars['String']>
  resetToken?: InputMaybe<Scalars['String']>
  resetTokenExpiresAt?: InputMaybe<Scalars['DateTime']>
  roles: Scalars['String']
  salt: Scalars['String']
}

export type MessageResponse = {
  __typename?: 'MessageResponse'
  success: Scalars['Boolean']
}

export type Mutation = {
  __typename?: 'Mutation'
  createTerritory: Territory
  createUser: User
  deleteTerritory: Territory
  deleteUser: User
  sendMessage: MessageResponse
  updateTerritory: Territory
  updateUser: User
}

export type MutationCreateTerritoryArgs = {
  input: CreateTerritoryInput
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationDeleteTerritoryArgs = {
  id: Scalars['String']
}

export type MutationDeleteUserArgs = {
  id: Scalars['String']
}

export type MutationSendMessageArgs = {
  message: Scalars['String']
  phone: Scalars['String']
}

export type MutationUpdateTerritoryArgs = {
  id: Scalars['String']
  input: UpdateTerritoryInput
}

export type MutationUpdateUserArgs = {
  id: Scalars['String']
  input: UpdateUserInput
}

export type Query = {
  __typename?: 'Query'
  redwood?: Maybe<Redwood>
  territories: Array<Territory>
  territory?: Maybe<Territory>
  user?: Maybe<User>
  userTerritories: Array<Territory>
  users: Array<User>
}

export type QueryTerritoryArgs = {
  id: Scalars['String']
}

export type QueryUserArgs = {
  id: Scalars['String']
}

export type QueryUserTerritoriesArgs = {
  userId: Scalars['String']
}

export type Redwood = {
  __typename?: 'Redwood'
  currentUser?: Maybe<Scalars['JSON']>
  prismaVersion?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type Territory = {
  __typename?: 'Territory'
  User?: Maybe<User>
  id: Scalars['String']
  isCheckedOut: Scalars['Boolean']
  name: Scalars['String']
  spreadsheetURL?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
}

export type UpdateTerritoryInput = {
  isCheckedOut?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  spreadsheetURL?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['String']>
}

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  hashedPassword?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
  phone?: InputMaybe<Scalars['String']>
  resetToken?: InputMaybe<Scalars['String']>
  resetTokenExpiresAt?: InputMaybe<Scalars['DateTime']>
  roles?: InputMaybe<Scalars['String']>
  salt?: InputMaybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']
  firstName?: Maybe<Scalars['String']>
  hashedPassword: Scalars['String']
  id: Scalars['String']
  lastName?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  resetToken?: Maybe<Scalars['String']>
  resetTokenExpiresAt?: Maybe<Scalars['DateTime']>
  roles: Scalars['String']
  salt: Scalars['String']
  territories: Array<Maybe<Territory>>
}

export type SendMessageMutationVariables = Exact<{
  phone: Scalars['String']
  message: Scalars['String']
}>

export type SendMessageMutation = {
  __typename?: 'Mutation'
  sendMessage: { __typename?: 'MessageResponse'; success: boolean }
}

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String']
  input: UpdateUserInput
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser: { __typename?: 'User'; id: string }
}

export type MyTerritoriesQueryVariables = Exact<{
  userId: Scalars['String']
}>

export type MyTerritoriesQuery = {
  __typename?: 'Query'
  userTerritories: Array<{
    __typename?: 'Territory'
    id: string
    name: string
    spreadsheetURL?: string | null
  }>
}

export const SendMessageDocument = gql`
  mutation SendMessage($phone: String!, $message: String!) {
    sendMessage(phone: $phone, message: $message) {
      success
    }
  }
`
export type SendMessageMutationFn = Apollo.MutationFunction<
  SendMessageMutation,
  SendMessageMutationVariables
>

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendMessageMutation,
    SendMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(
    SendMessageDocument,
    options
  )
}
export type SendMessageMutationHookResult = ReturnType<
  typeof useSendMessageMutation
>
export type SendMessageMutationResult =
  Apollo.MutationResult<SendMessageMutation>
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<
  SendMessageMutation,
  SendMessageMutationVariables
>
export const UpdateUserDocument = gql`
  mutation UpdateUser($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  )
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const MyTerritoriesDocument = gql`
  query MyTerritories($userId: String!) {
    userTerritories(userId: $userId) {
      id
      name
      spreadsheetURL
    }
  }
`

/**
 * __useMyTerritoriesQuery__
 *
 * To run a query within a React component, call `useMyTerritoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTerritoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTerritoriesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMyTerritoriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    MyTerritoriesQuery,
    MyTerritoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MyTerritoriesQuery, MyTerritoriesQueryVariables>(
    MyTerritoriesDocument,
    options
  )
}
export function useMyTerritoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyTerritoriesQuery,
    MyTerritoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MyTerritoriesQuery, MyTerritoriesQueryVariables>(
    MyTerritoriesDocument,
    options
  )
}
export type MyTerritoriesQueryHookResult = ReturnType<
  typeof useMyTerritoriesQuery
>
export type MyTerritoriesLazyQueryHookResult = ReturnType<
  typeof useMyTerritoriesLazyQuery
>
export type MyTerritoriesQueryResult = Apollo.QueryResult<
  MyTerritoriesQuery,
  MyTerritoriesQueryVariables
>
export const namedOperations = {
  Query: {
    MyTerritories: 'MyTerritories',
  },
  Mutation: {
    SendMessage: 'SendMessage',
    UpdateUser: 'UpdateUser',
  },
}
