import { Territory } from 'types/graphql'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  availableTerritories: [
    {
      id: 'fefr223f23',
      name: 'T1',
      imageURL: 'https://www.google.com',
      isCompleted: false,
    },
    {
      id: 'fefr223f23',
      name: 'T3',
      imageURL: null,
      isCompleted: false,
    },
    {
      id: 'fefr223f23',
      name: 'T4',
      imageURL: 'https://www.google.com',
      isCompleted: false,
    },
    {
      id: 'fefr223f23',
      name: 'T5',
      imageURL: null,
      isCompleted: false,
    },
  ] as Territory[],
})
