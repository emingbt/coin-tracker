import React from "react"
import styled from "styled-components"
import Banner from "../components/Banner"
import Footer from "../components/Footer"

import Header from "../components/Header"
import TrendingCoins from "../components/TrendingCoins"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Home = () => {
  return (
    <Wrapper>
      <Header />
      <Banner />
      <TrendingCoins />
      <Footer />
    </Wrapper>
  )
}

export default Home