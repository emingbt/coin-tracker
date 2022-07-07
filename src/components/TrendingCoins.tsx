import React, { useEffect, useState } from "react"
import styled from "styled-components"

type TrendingCoinsType = [{
  item: {
    id: string,
    coin_id: number,
    name: string,
    symbol: string,
    market_cap_rank: number,
    thumb: string,
    small: string,
    large: string,
    slug: string,
    price_btc: number,
    score: number
  }
}]

interface Text {
  symbol?: boolean
}

const Wrapper = styled.div`
  background-color: #ececec;
  width: 100%;
  height: 60vh;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledTitle = styled.p`
  margin: 16px;
`

const StyledLine = styled.div`
  height: 2px;
  width: 100%;
  background-color: #0284c7;
`

const StyledContainer = styled.div`
  width: 80%;
  font-size: 2rem;
  font-family: Roboto, sans-serif;
`

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  height: 80%;
`
const StyledCard = styled.div`
  height: 75%;
  min-width: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 0.33rem;
  padding: 0.5rem;
  border-radius: 1rem;
  font-family: Roboto, sans-serif;
  background-color: #f5f5f5;
  box-shadow: 0 1px 4px;
`

const StyledImage = styled.img`
  width: 80%;
`

const StyledText = styled.p<Text>`
  ${props => props.symbol && 'font-weight: 600;'}
`

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoinsType>()

  const API_URL = "https://api.coingecko.com/api/v3/search/trending"

  useEffect(() => {
    fetchTrendingCoins()
  }, [])

  async function fetchTrendingCoins() {
    try {
      const response = await fetch(API_URL)
      const fetchedObject = await response.json()
      setTrendingCoins(fetchedObject.coins)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <StyledContainer>
        <StyledTitle>Trending Coins</StyledTitle>
        <StyledLine />
      </StyledContainer>
      <StyledCardContainer>
        {trendingCoins?.map((e, i) => {
          return (
            <StyledCard key={i}>
              <StyledImage src={e.item.large} alt={e.item.name} />
              <StyledText symbol>#{e.item.score + 1}-{e.item.symbol}</StyledText>
              <StyledText>{e.item.name}</StyledText>
            </StyledCard>
          )
        })}
      </StyledCardContainer>
    </Wrapper>
  )
}

export default TrendingCoins