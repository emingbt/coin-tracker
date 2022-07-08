import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Star from './svg/Star'
import useStore from '../store'

type SearhedCoins = [{
  id: string,
  name: string,
  symbol: string,
  market_cap_rank: number | null,
  thumb: string,
  large: string
}]

interface CoinList {
  query: string
}

interface TableHead {
  primary?: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
`

const StyledTitleContainer = styled.div`
  width: 75%;
`

const StyledTitle = styled.h1`
  font-family: Roboto, sans-serif;
  margin-left: 1rem;
`

const StyledLine = styled.div`
  height: 2px;
  width: 100%;
  background-color: #0284c7;
`

const StyledTable = styled.table`
  width: 75%;
`

const StyledTableRow = styled.tr`
  display: grid;
  grid-template-columns: 0.25fr 2fr 1fr 1fr;
  align-items: center;
  justify-content: left;
  border-bottom: 1px solid lightgray;
  height: 4rem;
`

const StyledTableHead = styled.th<TableHead>`
  text-align: start;
  font-size: 1.5rem;
  margin-left: ${props => props.primary ? '1rem' : '0'};
`

const StyledTableData = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.25rem;
`

const StyledStarContainer = styled.div`
  margin-top: 4px;
  cursor: pointer;
`

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: #1b1b1b;
`

const StyledImage = styled.img`
  height: 1.25rem;
   margin-right: 0.5rem;
`

const CoinSearch = ({ query }: CoinList) => {
  const [coins, setCoins] = useState<SearhedCoins>()

  const API_URL = `https://api.coingecko.com/api/v3/search?query=${query}`

  useEffect(() => {
    fetchCoins()
  }, [query])


  async function fetchCoins() {
    try {
      const response = await fetch(API_URL)
      const fetchedObject = await response.json()
      const fetchedCoins = fetchedObject.coins
      setCoins(fetchedCoins)
    } catch (err) {
      console.log(err)
    }
  }

  const favoriteCoins = useStore((state) => state.favoriteCoins)
  const addFavorite = useStore(state => state.addFavorite)
  const removeFavorite = useStore(state => state.removeFavorite)

  const addToFavorites = (e: string) => {
    if (favoriteCoins.includes(e)) {
      favoriteCoins.splice(favoriteCoins.indexOf(e), 1)
      removeFavorite(favoriteCoins)
      return
    }

    addFavorite(e)
  }

  return (
    <Wrapper>
      <StyledTitleContainer>
        <StyledTitle>Search results for "{query.toUpperCase()}"</StyledTitle>
        <StyledLine />
      </StyledTitleContainer>
      <StyledTable>
        <thead>
          <StyledTableRow>
            <StyledTableHead></StyledTableHead>
            <StyledTableHead>Coin</StyledTableHead>
            <StyledTableHead></StyledTableHead>
            <StyledTableHead>Market Cap Rank</StyledTableHead>
          </StyledTableRow>
        </thead>
        <tbody>
          {coins?.map((e, i) => {
            return (
              <StyledTableRow key={i}>
                <StyledTableData>
                  <StyledStarContainer onClick={() => addToFavorites(e.id)} >
                    <Star selected={favoriteCoins.includes(e.id)} />
                  </StyledStarContainer>
                </StyledTableData>
                <StyledTableData>
                  <StyledLink to={`/coin/${e.id}`}>
                    <StyledImage src={e.large} alt={e.id} />
                    {e.name}
                  </StyledLink>
                </StyledTableData>
                <StyledTableData>{e.symbol.toUpperCase()}</StyledTableData>
                <StyledTableData>#{e.market_cap_rank}</StyledTableData>
              </StyledTableRow>
            )
          })}
        </tbody>
      </StyledTable>
    </Wrapper>
  )
}

export default CoinSearch