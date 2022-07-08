import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useStore from '../store'
import { Link } from 'react-router-dom'
import Star from "./svg/Star"

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

interface PriceChangeProps {
  priceChangeColor: string
}

interface LinkProps {
  haveNextPage: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  min-height: 55vh;
`

const StyledTable = styled.table`
  width: 80%;
  margin-left: 4rem;
  color: #3f3f3f;
`

const StyledTableRow = styled.tr`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  justify-content: left;
  border-bottom: 1px solid lightgray;
  height: 2rem;
  :hover {
    background-color: #ececec;
  }
`

const StyledTableHead = styled.th`
  text-align: start;
  font-size: 20px;
`

const StyledTableData = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const StyledStarContainer = styled.div`
  margin-top: 2px;
  margin-right: 4px;
  cursor: pointer;
`

const StyledImage = styled.img`
  height: 1.25rem;
   margin-right: 0.5rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #00a0f0;
`

const StyledPriceChange = styled.td<PriceChangeProps>`
  color: ${props => props.priceChangeColor};
`

const StyledNoFavoriteContainer = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`

const StyledText = styled.div`
  margin: 0;
`

const FavoriteCoinsList = () => {
  const [favoriteCoins, setFavoriteCoins] = useState<FavoriteCoins>()

  const favoriteCoinIds = useStore((state) => state.favoriteCoins)

  const FETCH_FAVORITE_COINS_API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favoriteCoinIds}&order=market_cap_desc&per_page=100&page=1&sparkline=true`

  useEffect(() => {
    fetchFavoriteCoins()
  }, [favoriteCoinIds])

  async function fetchFavoriteCoins() {
    try {
      const response = await fetch(FETCH_FAVORITE_COINS_API_URL)
      const fetchedCoinDetails = await response.json()

      setFavoriteCoins(fetchedCoinDetails)
    } catch (err) {
      console.log(err)
    }
  }

  const addFavorite = useStore(state => state.addFavorite)
  const removeFavorite = useStore(state => state.removeFavorite)

  const addToFavorites = (e: string) => {
    if (favoriteCoinIds.includes(e)) {
      favoriteCoinIds.splice(favoriteCoinIds.indexOf(e), 1)
      removeFavorite(favoriteCoinIds)
      return
    }

    addFavorite(e)
  }

  console.log("ALOO", favoriteCoinIds)

  return (
    <Wrapper>
      {favoriteCoinIds.length != 0 ?
        <StyledTable>
          <thead>
            <StyledTableRow>
              <StyledTableHead></StyledTableHead>
              <StyledTableHead>Coin</StyledTableHead>
              <StyledTableHead></StyledTableHead>
              <StyledTableHead>Price</StyledTableHead>
              <StyledTableHead>24h</StyledTableHead>
              <StyledTableHead>24h Volume</StyledTableHead>
            </StyledTableRow>
          </thead>
          <tbody>
            {favoriteCoins?.map((e, i) => {
              let priceChangeColor = e.price_change_percentage_24h > 0 ? "green" : e.price_change_percentage_24h == null ? 'gray' : 'red'

              return (
                <StyledTableRow key={i}>
                  <StyledTableData>
                    <StyledStarContainer onClick={() => addToFavorites(e.id)} style={{ marginTop: '2px', marginRight: '4px' }}>
                      <Star selected={favoriteCoinIds.includes(e.id)} />
                    </StyledStarContainer>
                  </StyledTableData>
                  <StyledTableData>
                    <StyledImage src={e.image} alt={e.id} />
                    <StyledLink to={`/coin/${e.id}`}>{e.name}</StyledLink>
                  </StyledTableData>
                  <StyledTableData>{e.symbol.toUpperCase()}</StyledTableData>
                  <StyledTableData>${e.current_price}</StyledTableData>
                  <StyledPriceChange priceChangeColor={priceChangeColor}>{Math.abs(e.price_change_percentage_24h)?.toFixed(2)}%</StyledPriceChange>
                  <StyledTableData>{e.total_volume}</StyledTableData>
                </StyledTableRow>
              )
            })}
          </tbody>
        </StyledTable> :
        <StyledNoFavoriteContainer>
          <StyledText>
            No favorite coin found
          </StyledText>
          <br />
          <StyledText>
            If you want to look for coins,
          </StyledText>
          <br />
          <StyledText>
            you can find them
            <StyledLink to='/allcoins/1'> here</StyledLink>
          </StyledText>
        </StyledNoFavoriteContainer>
      }
    </Wrapper>
  )
}

export default FavoriteCoinsList