import React from 'react'
import AllCoins from './pages/AllCoins'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/allcoins/:page' element={<AllCoins />} />
    </Routes>
  )
}

export default App
