import React, { useEffect, useState } from "react"
import styled from "styled-components"

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
        <p style={{ margin: 16 }}>Trending Coins</p>
        <StyledLine />
      </StyledContainer>
      <StyledCardContainer>
        {trendingCoins?.map((e, i) => {
          return (
            <StyledCard key={i}>
              <img style={{ width: "80%" }} src={e.item.large} alt={e.item.name} />
              <p style={{ fontWeight: '700' }}>#{e.item.score + 1}-{e.item.symbol}</p>
              <p>{e.item.name}</p>
            </StyledCard>
          )
        })}
      </StyledCardContainer>
    </Wrapper>
  )
}

export default TrendingCoins