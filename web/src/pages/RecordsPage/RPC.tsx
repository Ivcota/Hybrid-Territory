import { createContext } from 'react'

interface IRPFC {
  territoryName: string
}

export const RecordsPageFilterContext = createContext<IRPFC | null>(null)
