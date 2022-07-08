import React from 'react'
import styled from 'styled-components'
import FavoriteCoinsList from '../components/FavoriteCoinsList'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Wrapper = styled.div`
  
`

const Watchlist = () => {
  return (
    <Wrapper>
      <Header />
      <FavoriteCoinsList />
      <Footer />
    </Wrapper>
  )
}

export default Watchlist