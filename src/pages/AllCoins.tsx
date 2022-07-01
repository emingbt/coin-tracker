import React from "react"
import styled from "styled-components"

import Header from "../components/Header"
import CoinsList from "../components/CoinsList"
import Footer from "../components/Footer"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AllCoins = () => {
  return (
    <Wrapper>
      <Header />
      <CoinsList />
      <Footer />
    </Wrapper>
  )
}

export default AllCoins