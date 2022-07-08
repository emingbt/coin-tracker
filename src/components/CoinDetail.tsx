import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Chart from 'react-apexcharts'
import useStore from '../store'
import Star from './svg/Star'
import { ApexOptions } from "apexcharts"
import dayjs from 'dayjs'

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

interface ChartDay {
  selected: boolean
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
  width: 80%;
  margin-top: 2rem;
`

const StyledDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  font-family: Roboto, sans-serif;
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

const StyledStarContainer = styled.div`
  margin-top: 4px;
  margin-left: 8px;
  cursor: pointer;
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

const StyledChartDayContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 1rem;
  border-radius: 1rem;
`

const StyledChartDay = styled.div<ChartDay>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 5rem;
  border: 2px solid #2085b8;
  border-radius: 4rem;
  background-color: ${props => props.selected ? '#0091da' : '#f5f5f5'} ;
  color: ${props => props.selected ? '#f5f5f5' : '#0091da'};
  user-select: none;
  cursor: pointer;
`

const StyledChartContainer = styled.div`
  width: 60%;
  height: 100%;
  display: block;
  overflow: hidden;
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

const StyledDescription = styled.p`
  margin: 0.5rem;
`


const CoinDetail = ({ coinId }: CoinDetailProps) => {
  const [coinDetails, setCoinDetails] = useState<CoinDetails>()
  const [chartDays, setChartDays] = useState(7)
  const [chartData, setChartData] = useState([])

  let priceChange = coinDetails?.market_data.price_change_percentage_24h || 0
  let priceChangeColor = priceChange > 0 ? "green" : priceChange == 0 ? 'gray' : 'red'

  const FETCH_COIN_API_URL = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
  const FETCH_CHART_DATA_API_URL = `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${chartDays}`

  useEffect(() => {
    fetchChartData()
    fetchCoin()
  }, [coinId])

  useEffect(() => {
    fetchChartData()
  }, [chartDays])

  async function fetchCoin() {
    try {
      const response = await fetch(FETCH_COIN_API_URL)
      const fetchedCoinDetails = await response.json()
      setCoinDetails(fetchedCoinDetails)
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

  async function fetchChartData() {
    try {
      const response = await fetch(FETCH_CHART_DATA_API_URL)
      const fetchedChartData = await response.json()
      const data = fetchedChartData.map((e: Array<number>) => {
        return {
          x: new Date(e[0]),
          y: e.slice(1)
        }
      })
      setChartData(data)
    } catch (err) {
      console.log(err)
    }
  }

  const series = [{
    name: 'Coin Values',
    data: chartData
  }]

  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      redrawOnWindowResize: true
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (val) {
          return dayjs(val).format('MMM DD HH:mm')
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }

  return (
    <Wrapper>
      <StyledContainer>
        <StyledDetailContainer>
          <StyledDetailName>
            <StyledImage src={coinDetails?.image.large} alt={coinDetails?.id} />
            <div>{coinDetails?.name} ({coinDetails?.symbol.toUpperCase()})</div>
            <StyledStarContainer onClick={() => addToFavorites(coinId)} >
              <Star selected={favoriteCoins.includes(coinId)} />
            </StyledStarContainer>
          </StyledDetailName>
          <StyledDetailPriceContainer>
            <StyledDetailPrice primary>${coinDetails?.market_data.current_price.usd}</StyledDetailPrice>
            <StyledDetailPrice priceChangeColor={priceChangeColor}>{priceChange.toFixed(2)}%</StyledDetailPrice>
          </StyledDetailPriceContainer>
          <StyledDetailElement>
            <div>Market Cap</div>
            <div>${coinDetails?.market_data.market_cap.usd}</div>
          </StyledDetailElement>
          <StyledDetailElement>
            <div>Market Cap Rank</div>
            <div>#{coinDetails?.market_cap_rank}</div>
          </StyledDetailElement>
          <StyledDetailElement>
            <div>24h lowest/highest</div>
            <div>${coinDetails?.market_data.low_24h.usd} / ${coinDetails?.market_data.high_24h.usd}</div>
          </StyledDetailElement>
          <StyledChartDayContainer>
            <StyledChartDay selected={chartDays == 1} onClick={() => setChartDays(1)} >24hr</StyledChartDay>
            <StyledChartDay selected={chartDays == 7} onClick={() => setChartDays(7)} >7d</StyledChartDay>
            <StyledChartDay selected={chartDays == 30} onClick={() => setChartDays(30)} >30d</StyledChartDay>
            <StyledChartDay selected={chartDays == 365} onClick={() => setChartDays(365)} >1yr</StyledChartDay>
          </StyledChartDayContainer>
        </StyledDetailContainer>
        <StyledChartContainer>
          <Chart series={series} options={options} type="candlestick" />
        </StyledChartContainer>
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