import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts"

type CoinDetailProps = {
  coinId: string
}

type CoinDetails = {
  id: string,
  symbol: string,
  name: string,
  asset_platform_id: null,
  platforms: {},
  block_time_in_minutes: number,
  hashing_algorithm: string,
  categories: Array<string>,
  public_notice: null,
  additional_notices: Array<string>,
  description: {
    en: string
  },
  links: {},
  image: {
    thumb: string,
    small: string,
    large: string
  },
  country_origin: string,
  genesis_date: number,
  sentiment_votes_up_percentage: number,
  sentiment_votes_down_percentage: number,
  market_cap_rank: number,
  coingecko_rank: number,
  coingecko_score: number,
  developer_score: number,
  community_score: number,
  liquidity_score: number,
  public_interest_score: number,
  market_data: {
    current_price: {
      usd: number
    }
    high_24h: {
      usd: number
    },
    low_24h: {
      usd: number
    },
    price_change_percentage_24h: number,
    market_cap: {
      usd: number
    },
    sparkline_7d: {
      price: Array<number>
    }
  },
  public_interest_stats: {
    alexa_rank: number,
    bing_matches: null
  },
  status_updates: [],
  last_updated: string
}

interface DetailElement {
  primary?: boolean
}

interface DetailPrice {
  primary?: boolean
  priceChangeColor?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
`

const StyledDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  font-family: Roboto, sans-serif;
  margin: 2rem;
`

const StyledDetailName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  height: 4rem;
  padding: 0 1rem;
  font-size: 1.5rem;
  margin: 0.5rem;
`

const StyledImage = styled.img`
   height: 4rem;
   margin-right: 0.5rem;
`

const StyledDetailPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 1rem;
`

const StyledDetailPrice = styled.div<DetailPrice>`
  color: ${p => p.priceChangeColor || 'black'};
  font-family: Roboto, sans-serif;
  font-size: ${p => p.primary ? '2rem' : '1rem'};
  text-align: center;
  margin-left: 0.5rem;
`

const StyledDetailElement = styled.div<DetailElement>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.primary ? 'start' : 'space-between'};
  height: 2rem;
  border-bottom: 1px solid gray;
  padding: 0 1rem;
  font-size: ${props => props.primary ? '1.5rem' : '1rem'};
`

const StyledLine = styled.div`
  height: 2px;
  width: 100%;
  background-color: #2085b8;
`

const StyledDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`

const StyledDescriptionHeader = styled.div`
  font-size: 2rem;
  font-weight: 600;
  width: 100%;
  margin-left: 1rem;
`

const StyledDescription = styled.div`
  margin: 0.5rem;
`


const CoinDetail = ({ coinId }: CoinDetailProps) => {
  const [coinDetails, setCoinDetails] = useState<CoinDetails>()
  let priceChange = coinDetails?.market_data.price_change_percentage_24h || 0
  let priceChangeColor = priceChange > 0 ? "green" : priceChange == 0 ? 'gray' : 'red'
  let chartData = coinDetails?.market_data.sparkline_7d.price.map((e, i) => {
    return {
      date: `${i % 24}:00`,
      price: e.toFixed(2)
    }
  })

  const API_URL = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`

  useEffect(() => {
    fetchCoins()
  }, [coinId])


  async function fetchCoins() {
    try {
      const response = await fetch(API_URL)
      const fetchedCoinDetails = await response.json()
      setCoinDetails(fetchedCoinDetails)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <Wrapper>
      <StyledContainer>
        <StyledDetailContainer>
          <StyledDetailName>
            <StyledImage src={coinDetails?.image.large} alt={coinDetails?.id} />
            <div>{coinDetails?.name} ({coinDetails?.symbol.toUpperCase()})</div>
          </StyledDetailName>
          <StyledDetailPriceContainer>
            <StyledDetailPrice primary>${coinDetails?.market_data.current_price.usd}</StyledDetailPrice>
            <StyledDetailPrice priceChangeColor={priceChangeColor}>{priceChange.toFixed(2)}%</StyledDetailPrice>
          </StyledDetailPriceContainer>
          <StyledDetailElement>
            <div>Market Cap</div>
            <div>{coinDetails?.market_data.market_cap.usd}</div>
          </StyledDetailElement>
          <StyledDetailElement>
            <div>Market Cap Rank</div>
            <div>#{coinDetails?.market_cap_rank}</div>
          </StyledDetailElement>
          <StyledDetailElement>
            <div>24h low/hig</div>
            <div>{coinDetails?.market_data.low_24h.usd} / {coinDetails?.market_data.high_24h.usd}</div>
          </StyledDetailElement>
        </StyledDetailContainer>
        <StyledDetailContainer>
          <LineChart
            width={700}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="price" stroke="#3687d3" />
          </LineChart>
        </StyledDetailContainer>
      </StyledContainer>
      <StyledDescriptionContainer>
        <StyledDescriptionHeader>Description</StyledDescriptionHeader>
        <StyledLine />
        <StyledDescription>&emsp;{coinDetails?.description.en}</StyledDescription>
      </StyledDescriptionContainer>
    </Wrapper>
  )
}

export default CoinDetail