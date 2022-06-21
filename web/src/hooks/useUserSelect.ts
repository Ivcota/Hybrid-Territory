import create from "zustand";


interface Zustate {
  userId: string | null
  setUserId: (userId: string) => void
}

export const useUserSelect = create<Zustate>((set => ({
  userId: null,
  setUserId(userId) {
    set({
      userId
    })
  },
})))