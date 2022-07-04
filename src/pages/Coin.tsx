import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import CoinDetail from '../components/CoinDetail'
import Footer from '../components/Footer'
import Header from '../components/Header'

type Params ={
  coinId: string
}

const Wrapper = styled.div`

`

const Coin = () => {
  const { coinId } = useParams<Params>()

  return (
    <Wrapper>
      <Header />
      <CoinDetail coinId={coinId || ''}/>
      <Footer />
    </Wrapper>
  )
}

export default Coin