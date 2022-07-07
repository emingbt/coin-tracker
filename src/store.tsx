import create from "zustand"
import { persist } from "zustand/middleware"

interface CoinState {
  favoriteCoins: Array<string>
  addFavorite: (coin: string) => void
  removeFavorite: (newFavortieCoins: Array<string>) => void
}


const useStore = create(
  persist<CoinState>((set) => ({
    favoriteCoins: [],
    addFavorite: (coin: string) =>
      set((state) => ({ favoriteCoins: [...state.favoriteCoins, coin] })),
    removeFavorite: (newFavoriteCoins: Array<string>) =>
      set((state) => ({ favoriteCoins: [...newFavoriteCoins] }))
  }),
    {
      name: 'favorite-coin-storage'
    }
  )
)

export default useStore