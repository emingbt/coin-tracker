import React from 'react'
import AllCoins from './pages/AllCoins'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Search from './pages/Search'
import Coin from './pages/Coin'
import Watchlist from './pages/Watchlist'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/allcoins/:page' element={<AllCoins />} />
      <Route path='/search/:query' element={<Search />} />
      <Route path='/coin/:coinId' element={<Coin />} />
      <Route path='/watchlist' element={<Watchlist />} />
    </Routes>
  )
}

export default App
