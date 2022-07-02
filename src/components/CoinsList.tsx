import React, { useEffect, useState } from "react"
import styled from "styled-components"

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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: left;
  border-bottom: 1px solid lightgray;
  height: 2rem;
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

type CoinListType = [
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

const CoinsList = () => {
  const [coins, setCoins] = useState<CoinListType>()

  const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"

  useEffect(() => {
    fetchCoins()
  }, [])


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
        <StyledTableRow>
          <StyledTableHead style={{ marginLeft: "1rem" }}>#</StyledTableHead>
          <StyledTableHead>Coin</StyledTableHead>
          <StyledTableHead></StyledTableHead>
          <StyledTableHead>Price</StyledTableHead>
          <StyledTableHead>24h</StyledTableHead>
          <StyledTableHead>24h Volume</StyledTableHead>
        </StyledTableRow>
        {coins?.map((e, i) => {
          return (
            <StyledTableRow key={i}>
              <td style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start'
              }}>
                {/* <Star /> */}
                {i + 1}
              </td>
              <td style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <img style={{ height: "1.25rem", marginRight: '0.5rem' }} src={e.image} />
                {e.name}
              </td>
              <td>{e.symbol.toUpperCase()}</td>
              <td>{e.current_price}</td>
              <td>{e.price_change_percentage_24h.toFixed(2)}%</td>
              <td>{e.total_volume}</td>
            </StyledTableRow>
          )
        })}
      </StyledTable>
    </Wrapper>
  )
}

export default CoinsList