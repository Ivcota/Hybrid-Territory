import create from 'zustand'

interface Zustate {
  territoryId: string | null
  setTerritoryId: (territoryId: string) => void
}

export const useTerritoryId = create<Zustate>((set) => ({
  territoryId: null,
  setTerritoryId: (territoryId) => {
    set({
      territoryId: territoryId,
    })
  },
}))
