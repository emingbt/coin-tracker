import React from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"

import Header from "../components/Header"
import CoinSearch from "../components/CoinSearch"
import Footer from "../components/Footer"

type Params = {
  query: string
}

const Wrapper = styled.div`
  
`

const Search = () => {
  const { query } = useParams<Params>()

  return (
    <Wrapper>
      <Header />
      <CoinSearch query={query || ''}/>
      <Footer />
    </Wrapper>
  )
}

export default Search