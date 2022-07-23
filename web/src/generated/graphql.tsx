import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
};

export type CreateIssueInput = {
  comment: Scalars['String'];
  isClosed: Scalars['Boolean'];
  territoryId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateRecordInput = {
  checkinDate?: InputMaybe<Scalars['DateTime']>;
  checkoutDate: Scalars['DateTime'];
  territoryId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateTerritoryInput = {
  isCompleted: Scalars['Boolean'];
  name: Scalars['String'];
  spreadsheetURL?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  hashedPassword: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  resetToken?: InputMaybe<Scalars['String']>;
  resetTokenExpiresAt?: InputMaybe<Scalars['DateTime']>;
  roles: Scalars['String'];
  salt: Scalars['String'];
};

export type Issue = {
  __typename?: 'Issue';
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isClosed: Scalars['Boolean'];
  territory: Territory;
  territoryId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createIssue: Issue;
  createRecord: Record;
  createTerritory: Territory;
  createUser: User;
  deleteIssue: Issue;
  deleteRecord: Record;
  deleteTerritory: Territory;
  deleteUser: User;
  sendMessage: MessageResponse;
  updateIssue: Issue;
  updateRecord: Record;
  updateRecordByTerritoryAndUserId: Record;
  updateTerritory: Territory;
  updateUser: User;
};


export type MutationCreateIssueArgs = {
  input: CreateIssueInput;
};


export type MutationCreateRecordArgs = {
  input: CreateRecordInput;
};


export type MutationCreateTerritoryArgs = {
  input: CreateTerritoryInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteIssueArgs = {
  id: Scalars['String'];
};


export type MutationDeleteRecordArgs = {
  id: Scalars['String'];
};


export type MutationDeleteTerritoryArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationSendMessageArgs = {
  message: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationUpdateIssueArgs = {
  id: Scalars['String'];
  input: UpdateIssueInput;
};


export type MutationUpdateRecordArgs = {
  id: Scalars['String'];
  input: UpdateRecordInput;
};


export type MutationUpdateRecordByTerritoryAndUserIdArgs = {
  input: UpdateRecordInput;
  territoryId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUpdateTerritoryArgs = {
  id: Scalars['String'];
  input: UpdateTerritoryInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  availableTerritories: Array<Territory>;
  issue?: Maybe<Issue>;
  issues: Array<Issue>;
  issuesByTerritory?: Maybe<Array<Issue>>;
  record?: Maybe<Record>;
  records: Array<Record>;
  redwood?: Maybe<Redwood>;
  searchTerritories: Array<Territory>;
  territories: Array<Territory>;
  territory?: Maybe<Territory>;
  user?: Maybe<User>;
  userTerritories: Array<Territory>;
  users: Array<User>;
};


export type QueryIssueArgs = {
  id: Scalars['String'];
};


export type QueryIssuesByTerritoryArgs = {
  territoryId: Scalars['String'];
};


export type QueryRecordArgs = {
  id: Scalars['String'];
};


export type QuerySearchTerritoriesArgs = {
  cardName?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};


export type QueryTerritoryArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUserTerritoriesArgs = {
  userId: Scalars['String'];
};

export type Record = {
  __typename?: 'Record';
  checkinDate?: Maybe<Scalars['DateTime']>;
  checkoutDate: Scalars['DateTime'];
  id: Scalars['String'];
  territory: Territory;
  territoryId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type Redwood = {
  __typename?: 'Redwood';
  currentUser?: Maybe<Scalars['JSON']>;
  prismaVersion?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type Territory = {
  __typename?: 'Territory';
  User?: Maybe<User>;
  id: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  name: Scalars['String'];
  spreadsheetURL?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type UpdateIssueInput = {
  comment?: InputMaybe<Scalars['String']>;
  isClosed?: InputMaybe<Scalars['Boolean']>;
  territoryId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateRecordInput = {
  checkinDate?: InputMaybe<Scalars['DateTime']>;
  checkoutDate?: InputMaybe<Scalars['DateTime']>;
  territoryId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateTerritoryInput = {
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  spreadsheetURL?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  hashedPassword?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  resetToken?: InputMaybe<Scalars['String']>;
  resetTokenExpiresAt?: InputMaybe<Scalars['DateTime']>;
  roles?: InputMaybe<Scalars['String']>;
  salt?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  hashedPassword: Scalars['String'];
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  resetToken?: Maybe<Scalars['String']>;
  resetTokenExpiresAt?: Maybe<Scalars['DateTime']>;
  roles: Scalars['String'];
  salt: Scalars['String'];
  territories: Array<Maybe<Territory>>;
};

export type CreateRecordMutationVariables = Exact<{
  input: CreateRecordInput;
}>;


export type CreateRecordMutation = { __typename?: 'Mutation', createRecord: { __typename?: 'Record', id: string } };

export type SendMessageMutationVariables = Exact<{
  phone: Scalars['String'];
  message: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'MessageResponse', success: boolean } };

export type UpdateRecordByIdsMutationVariables = Exact<{
  territoryId: Scalars['String'];
  userId: Scalars['String'];
  input: UpdateRecordInput;
}>;


export type UpdateRecordByIdsMutation = { __typename?: 'Mutation', updateRecordByTerritoryAndUserId: { __typename?: 'Record', id: string, checkinDate?: any | null } };

export type UpdateTerritoryMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateTerritoryInput;
}>;


export type UpdateTerritoryMutation = { __typename?: 'Mutation', updateTerritory: { __typename?: 'Territory', id: string } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String'];
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string } };

export type AllTerritoryNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTerritoryNamesQuery = { __typename?: 'Query', territories: Array<{ __typename?: 'Territory', id: string, name: string }> };

export type AllUsersSelectQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersSelectQuery = { __typename?: 'Query', users: Array<{ __typename: 'User', id: string, firstName?: string | null, lastName?: string | null }> };


export const CreateRecordDocument = gql`
    mutation CreateRecord($input: CreateRecordInput!) {
  createRecord(input: $input) {
    id
  }
}
    `;
export type CreateRecordMutationFn = Apollo.MutationFunction<CreateRecordMutation, CreateRecordMutationVariables>;

/**
 * __useCreateRecordMutation__
 *
 * To run a mutation, you first call `useCreateRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRecordMutation, { data, loading, error }] = useCreateRecordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRecordMutation(baseOptions?: Apollo.MutationHookOptions<CreateRecordMutation, CreateRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRecordMutation, CreateRecordMutationVariables>(CreateRecordDocument, options);
      }
export type CreateRecordMutationHookResult = ReturnType<typeof useCreateRecordMutation>;
export type CreateRecordMutationResult = Apollo.MutationResult<CreateRecordMutation>;
export type CreateRecordMutationOptions = Apollo.BaseMutationOptions<CreateRecordMutation, CreateRecordMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($phone: String!, $message: String!) {
  sendMessage(phone: $phone, message: $message) {
    success
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

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
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const UpdateRecordByIdsDocument = gql`
    mutation UpdateRecordByIds($territoryId: String!, $userId: String!, $input: UpdateRecordInput!) {
  updateRecordByTerritoryAndUserId(
    territoryId: $territoryId
    userId: $userId
    input: $input
  ) {
    id
    checkinDate
  }
}
    `;
export type UpdateRecordByIdsMutationFn = Apollo.MutationFunction<UpdateRecordByIdsMutation, UpdateRecordByIdsMutationVariables>;

/**
 * __useUpdateRecordByIdsMutation__
 *
 * To run a mutation, you first call `useUpdateRecordByIdsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecordByIdsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecordByIdsMutation, { data, loading, error }] = useUpdateRecordByIdsMutation({
 *   variables: {
 *      territoryId: // value for 'territoryId'
 *      userId: // value for 'userId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRecordByIdsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRecordByIdsMutation, UpdateRecordByIdsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRecordByIdsMutation, UpdateRecordByIdsMutationVariables>(UpdateRecordByIdsDocument, options);
      }
export type UpdateRecordByIdsMutationHookResult = ReturnType<typeof useUpdateRecordByIdsMutation>;
export type UpdateRecordByIdsMutationResult = Apollo.MutationResult<UpdateRecordByIdsMutation>;
export type UpdateRecordByIdsMutationOptions = Apollo.BaseMutationOptions<UpdateRecordByIdsMutation, UpdateRecordByIdsMutationVariables>;
export const UpdateTerritoryDocument = gql`
    mutation UpdateTerritory($id: String!, $input: UpdateTerritoryInput!) {
  updateTerritory(id: $id, input: $input) {
    id
  }
}
    `;
export type UpdateTerritoryMutationFn = Apollo.MutationFunction<UpdateTerritoryMutation, UpdateTerritoryMutationVariables>;

/**
 * __useUpdateTerritoryMutation__
 *
 * To run a mutation, you first call `useUpdateTerritoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTerritoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTerritoryMutation, { data, loading, error }] = useUpdateTerritoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTerritoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTerritoryMutation, UpdateTerritoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTerritoryMutation, UpdateTerritoryMutationVariables>(UpdateTerritoryDocument, options);
      }
export type UpdateTerritoryMutationHookResult = ReturnType<typeof useUpdateTerritoryMutation>;
export type UpdateTerritoryMutationResult = Apollo.MutationResult<UpdateTerritoryMutation>;
export type UpdateTerritoryMutationOptions = Apollo.BaseMutationOptions<UpdateTerritoryMutation, UpdateTerritoryMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: String!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

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
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const AllTerritoryNamesDocument = gql`
    query AllTerritoryNames {
  territories {
    id
    name
  }
}
    `;

/**
 * __useAllTerritoryNamesQuery__
 *
 * To run a query within a React component, call `useAllTerritoryNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTerritoryNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTerritoryNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTerritoryNamesQuery(baseOptions?: Apollo.QueryHookOptions<AllTerritoryNamesQuery, AllTerritoryNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllTerritoryNamesQuery, AllTerritoryNamesQueryVariables>(AllTerritoryNamesDocument, options);
      }
export function useAllTerritoryNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllTerritoryNamesQuery, AllTerritoryNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllTerritoryNamesQuery, AllTerritoryNamesQueryVariables>(AllTerritoryNamesDocument, options);
        }
export type AllTerritoryNamesQueryHookResult = ReturnType<typeof useAllTerritoryNamesQuery>;
export type AllTerritoryNamesLazyQueryHookResult = ReturnType<typeof useAllTerritoryNamesLazyQuery>;
export type AllTerritoryNamesQueryResult = Apollo.QueryResult<AllTerritoryNamesQuery, AllTerritoryNamesQueryVariables>;
export const AllUsersSelectDocument = gql`
    query AllUsersSelect {
  users {
    id
    firstName
    lastName
    __typename
  }
}
    `;

/**
 * __useAllUsersSelectQuery__
 *
 * To run a query within a React component, call `useAllUsersSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersSelectQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersSelectQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersSelectQuery, AllUsersSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersSelectQuery, AllUsersSelectQueryVariables>(AllUsersSelectDocument, options);
      }
export function useAllUsersSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersSelectQuery, AllUsersSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersSelectQuery, AllUsersSelectQueryVariables>(AllUsersSelectDocument, options);
        }
export type AllUsersSelectQueryHookResult = ReturnType<typeof useAllUsersSelectQuery>;
export type AllUsersSelectLazyQueryHookResult = ReturnType<typeof useAllUsersSelectLazyQuery>;
export type AllUsersSelectQueryResult = Apollo.QueryResult<AllUsersSelectQuery, AllUsersSelectQueryVariables>;
export const namedOperations = {
  Query: {
    AllTerritoryNames: 'AllTerritoryNames',
    AllUsersSelect: 'AllUsersSelect'
  },
  Mutation: {
    CreateRecord: 'CreateRecord',
    SendMessage: 'SendMessage',
    UpdateRecordByIds: 'UpdateRecordByIds',
    UpdateTerritory: 'UpdateTerritory',
    UpdateUser: 'UpdateUser'
  }
}