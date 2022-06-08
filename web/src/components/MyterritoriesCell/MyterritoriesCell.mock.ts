// Define your own mock data here:

interface Territory {
  id: string
  name: string
  spreadsheetURL: string
}

interface Response {
  territories: Territory[]
}

export const standard = (/* vars, { ctx, req } */) => {
  return {
    territories: [
      {
        id: 'fewfe',
        name: 'T1',
        spreadsheetURL: 'https://www.jw.org',
      },
      {
        id: 'fewfewf',
        name: 'T2',
        spreadsheetURL: 'https://www.jw.org',
      },
      {
        id: 'fewfewfew',
        name: 'T3',
        spreadsheetURL: 'https://www.jw.org',
      },
      {
        id: 'fewfewfew',
        name: 'T4',
        spreadsheetURL: 'https://www.jw.org',
      },
    ],
  } as Response
}
