import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

interface CoinsListType {
  page: string
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
`

const StyledTableRow = styled.tr`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  justify-content: left;
  border-bottom: 1px solid lightgray;
  height: 2rem;
`

const StyledTableHead = styled.th`
  text-align: start;
  font-size: 20px;
`

const StyledPriceChange = styled.td<PriceChangeProps>`
  color: ${props => props.priceChangeColor};
  display: fle;
`

const StyledLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  margin-top: 2rem;
`

const StyledLink = styled(Link) <LinkProps>`
  background-color: #f5f5f5;
  color: ${p => p.haveNextPage ? '#0284c7' : 'gray'};
  border: 2px solid ${p => p.haveNextPage ? '#0284c7' : 'gray'};
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
  pointer-events: ${p => p.haveNextPage ? 'all' : 'none'};
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

  return (
    <Wrapper>
      <StyledTable>
        <thead>
          <StyledTableRow>
            <StyledTableHead style={{ marginLeft: "1rem" }}>#</StyledTableHead>
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
                <td style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'start'
                }}>
                  {(+page - 1) * 100 + i + 1}
                </td>
                <td style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <img style={{ height: "1.25rem", marginRight: '0.5rem' }} src={e.image} alt={e.id} />
                  {e.name}
                </td>
                <td>{e.symbol.toUpperCase()}</td>
                <td>{e.current_price}</td>
                <StyledPriceChange priceChangeColor={priceChangeColor}>{Math.abs(e.price_change_percentage_24h)?.toFixed(2)}%</StyledPriceChange>
                <td>{e.total_volume}</td>
              </StyledTableRow>
            )
          })}
        </tbody>
      </StyledTable>
      <StyledLinkContainer>
        <StyledLink haveNextPage={+page != 1} to={`/allcoins/${+page - 1}`}>
          &lt; Previous Page
        </StyledLink>
        <div> Page {+page} </div>
        <StyledLink haveNextPage={+page != 134} to={`/allcoins/${+page + 1}`}>
          Next Page &gt;
        </StyledLink>
      </StyledLinkContainer>
    </Wrapper>
  )
}

export default CoinsList