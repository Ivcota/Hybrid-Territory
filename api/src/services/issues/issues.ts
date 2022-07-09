import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  IssueResolvers,
} from 'types/graphql'

export const issues: QueryResolvers['issues'] = () => {
  return db.issue.findMany()
}

export const issue: QueryResolvers['issue'] = ({ id }) => {
  return db.issue.findUnique({
    where: { id },
  })
}

export const createIssue: MutationResolvers['createIssue'] = ({ input }) => {
  return db.issue.create({
    data: input,
  })
}

export const updateIssue: MutationResolvers['updateIssue'] = ({
  id,
  input,
}) => {
  return db.issue.update({
    data: input,
    where: { id },
  })
}

export const deleteIssue: MutationResolvers['deleteIssue'] = ({ id }) => {
  return db.issue.delete({
    where: { id },
  })
}
export const issuesByTerritory: QueryResolvers['issuesByTerritory'] = ({
  territoryId,
}) => {
  return db.issue.findMany({
    where: {
      territoryId: {
        equals: territoryId,
      },
    },
  })
}

export const Issue: IssueResolvers = {
  user: (_obj, { root }) =>
    db.issue.findUnique({ where: { id: root.id } }).user(),
  territory: (_obj, { root }) =>
    db.issue.findUnique({ where: { id: root.id } }).territory(),
}
