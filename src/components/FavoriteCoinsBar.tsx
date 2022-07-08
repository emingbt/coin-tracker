import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import useStore from '../store'

type FavoriteCoins = [
  {
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: number,
    market_cap: number,
    market_cap_rank: 1,
    fully_diluted_valuation: number,
    total_volume: number,
    high_24h: number,
    low_24h: number,
    price_change_24h: number,
    price_change_percentage_24h: number,
    market_cap_change_24h: number,
    market_cap_change_percentage_24h: number,
    circulating_supply: number,
    total_supply: number,
    max_supply: number,
    ath: number,
    ath_change_percentage: number,
    ath_date: string,
    atl: number,
    atl_change_percentage: number,
    atl_date: string,
    roi: null,
    last_updated: string,
    sparkline_in_7d: {
      price: Array<number>
    }
  }
]

interface ContainerProps {
  hasCoin: boolean
}

interface PriceChangeProps {
  priceChangeColor: string
}

interface TextProps {
  symbol?: boolean
}

const StyledFavoriteCoinsContainer = styled.div<ContainerProps>`
  width:100%;
  visibility: ${props => props.hasCoin ? 'visible' : 'hidden'};
  height: ${props => props.hasCoin ? '2rem' : '0'};
`

const StyledFavoriteCoinsBar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`

const StyledFavoriteCoin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 0.5rem;
  height: 100%;
`

const StyledImage = styled.img`
  height: 1.5rem;
  margin: 0 0.25rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;

`

const StyledText = styled.p<TextProps>`
  font-family: Roboto, sans-serif;
  font-weight: ${props => props.symbol ? '600' : '400'};
  color: #505050;
  margin: 0 0.25rem;
`

const StyledPriceChange = styled.p<PriceChangeProps>`
  color: ${props => props.priceChangeColor};
  margin-bottom: 1.15rem;
`

const StyledLine = styled.div`
  height: 3px;
  width: 100%;
  background-color: #00a0f0;
`

const FavoriteCoinsBar = () => {
  const [favoriteCoins, setFavoriteCoins] = useState<FavoriteCoins>()
  const favoriteCoinIds = useStore((state) => state.favoriteCoins).toString()

  const FETCH_FAVORITE_COINS_API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favoriteCoinIds}&order=market_cap_desc&per_page=100&page=1&sparkline=true`

  useEffect(() => {
    fetchFavoriteCoins()
  }, [favoriteCoinIds])

  async function fetchFavoriteCoins() {
    try {
      if (favoriteCoinIds != '') {
        const response = await fetch(FETCH_FAVORITE_COINS_API_URL)
        const fetchedCoinDetails = await response.json()

        setFavoriteCoins(fetchedCoinDetails)
        console.log('test1')
      }
      else {
        setFavoriteCoins(undefined)
        console.log('test2')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
      <StyledFavoriteCoinsContainer hasCoin={favoriteCoinIds != ''}>
      <StyledFavoriteCoinsBar>
        {favoriteCoins?.map((e) => {
          let priceChangeColor = e.price_change_percentage_24h > 0 ? "green" : e.price_change_percentage_24h == null ? 'gray' : 'red'

          return (
            <StyledFavoriteCoin>
              <StyledImage src={e.image} alt={e.id} />
              <StyledLink to={`/coin/${e.id}`}>
                <StyledText symbol>{e.symbol.toUpperCase()}</StyledText>
              </StyledLink>
              <StyledText>${e.current_price}</StyledText>
              <StyledPriceChange priceChangeColor={priceChangeColor}>%{e.price_change_percentage_24h.toFixed(2)}</StyledPriceChange>
            </StyledFavoriteCoin>
          )
        })}
      </StyledFavoriteCoinsBar>
      <StyledLine />
      </StyledFavoriteCoinsContainer>
  )
}

export default FavoriteCoinsBar