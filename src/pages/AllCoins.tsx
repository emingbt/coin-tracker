import React from "react"
import styled from "styled-components"

import Header from "../components/Header"
import CoinsList from "../components/CoinsList"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

type Params = {
  page: string
}

const AllCoins = () => {
  let { page } = useParams<Params>()

  return (
    <Wrapper>
      <Header />
      <CoinsList page={page || "1"} />
      <Footer />
    </Wrapper>
  )
}

export default AllCoins