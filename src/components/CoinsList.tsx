import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Star from "./svg/Star"
import useStore from '../store'

interface CoinsListType {
  page: string
}

interface TableHead {
  primary?: boolean
}

interface PriceChangeProps {
  priceChangeColor: string
}

interface LinkProps {
  haveNextPage: boolean
}

type CoinsType = [
  {
    ath: number,
    ath_change_percentage: number,
    ath_date: string,
    atl: number,
    atl_change_percentage: number,
    atl_date: string,
    circulating_supply: number,
    current_price: number,
    fully_diluted_valuation: number,
    high_24h: number,
    id: string,
    image: string,
    last_updated: string,
    low_24h: number,
    market_cap: number,
    market_cap_change_24h: number,
    market_cap_change_percentage_24h: number,
    market_cap_rank: number,
    max_supply: number,
    name: string,
    price_change_24h: number,
    price_change_percentage_24h: number,
    roi: any,
    symbol: string,
    total_supply: number,
    total_volume: number
  }
]

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
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

const StyledTableHead = styled.th<TableHead>`
  text-align: start;
  font-size: 20px;
  margin-left: ${props => props.primary ? '1.5rem' : '0'};
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
  color: #3f3f3f;
`

const StyledText = styled.div`
  user-select: none;
`

const StyledPriceChange = styled.td<PriceChangeProps>`
  color: ${props => props.priceChangeColor};
`

const StyledPageLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  margin-top: 2rem;
`

const StyledPageLink = styled(Link) <LinkProps>`
  background-color: #f5f5f5;
  color: ${props => props.haveNextPage ? '#0284c7' : 'gray'};
  border: 2px solid ${props => props.haveNextPage ? '#0284c7' : 'gray'};
  border-radius: 4px;
  min-width: 2rem;
  padding: 0.5rem;
  text-decoration: none;
  text-align: center;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  :hover {
    background-color: #0284c7;
    color: #f5f5f5;
  }
  pointer-events: ${props => props.haveNextPage ? 'all' : 'none'};
  user-select: none;
`

const CoinsList = ({ page }: CoinsListType) => {
  const [coins, setCoins] = useState<CoinsType>()

  const API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${+page}&sparkline=false`

  useEffect(() => {
    fetchCoins()
  }, [page])


  async function fetchCoins() {
    try {
      const response = await fetch(API_URL)
      const fetchedCoins = await response.json()
      setCoins(fetchedCoins)
    } catch (err) {
      console.log(err)
    }
  }

  const favoriteCoins = useStore((state) => state.favoriteCoins)
  const addFavorite = useStore(state => state.addFavorite)
  const removeFavorite = useStore(state => state.removeFavorite)

  console.log(favoriteCoins)

  const addToFavorites = (e: string) => {
    if(favoriteCoins.includes(e)) {
      favoriteCoins.splice(favoriteCoins.indexOf(e), 1)
      removeFavorite(favoriteCoins)
      return
    }

    addFavorite(e)
  }

  return (
    <Wrapper>
      <StyledTable>
        <thead>
          <StyledTableRow>
            <StyledTableHead primary>#</StyledTableHead>
            <StyledTableHead>Coin</StyledTableHead>
            <StyledTableHead></StyledTableHead>
            <StyledTableHead>Price</StyledTableHead>
            <StyledTableHead>24h</StyledTableHead>
            <StyledTableHead>24h Volume</StyledTableHead>
          </StyledTableRow>
        </thead>
        <tbody>
          {coins?.map((e, i) => {
            let priceChangeColor = e.price_change_percentage_24h > 0 ? "green" : e.price_change_percentage_24h == null ? 'gray' : 'red'

            return (
              <StyledTableRow key={i}>
                <StyledTableData>
                  <StyledStarContainer onClick={() => addToFavorites(e.id)} style={{ marginTop: '2px', marginRight: '4px'}}>
                    <Star selected={favoriteCoins.includes(e.id)} />
                  </StyledStarContainer>
                  {(+page - 1) * 100 + i + 1}
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
      </StyledTable>
      <StyledPageLinkContainer>
        <StyledPageLink haveNextPage={+page > 1} to={`/allcoins/${+page - 1}`}>
          &lt; Previous Page
        </StyledPageLink>
        <StyledText> Page {+page} </StyledText>
        <StyledPageLink haveNextPage={+page < 134} to={`/allcoins/${+page + 1}`}>
          Next Page &gt;
        </StyledPageLink>
      </StyledPageLinkContainer>
    </Wrapper>
  )
}

export default CoinsList