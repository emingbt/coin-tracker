import create from "zustand"

type State = {
  favoriteCoins: Array<string>
  addFavorite: (coin:string) => void
  removeFavorite: (newFavortieCoins:Array<string>) => void
}

const useStore = create<State>((set) => ({
  favoriteCoins: [],
  addFavorite: (coin:string) =>
    set((state) => ({favoriteCoins: [...state.favoriteCoins, coin] })),
  removeFavorite: (newFavoriteCoins:Array<string>) => 
    set((state) => ({favoriteCoins: [...newFavoriteCoins]}))
}))

export default useStore