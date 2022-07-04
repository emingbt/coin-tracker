import React from 'react'
import AllCoins from './pages/AllCoins'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Search from './pages/Search'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/allcoins/:page' element={<AllCoins />} />
      <Route path='/search/:query' element={<Search />} />
    </Routes>
  )
}

export default App
